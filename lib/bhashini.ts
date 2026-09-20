// Server-only module. Talks to the government Bhashini/ULCA APIs.
// NEVER import this file from a 'use client' component — it uses your
// secret API key and must only ever run on the server (API routes).
//
// How Bhashini auth works (two-step):
//   1. POST getModelsPipeline with your userID + ulcaApiKey -> tells you
//      *which* underlying model (serviceId) handles each task for the
//      language pair you asked for, plus a short-lived inferenceApiKey.
//   2. POST that inferenceApiKey to the actual inference endpoint to run
//      ASR / translation / TTS.
//
// Docs are thin and the response shape has shifted between Bhashini
// versions before, so the first time you call this, console.log the raw
// `data` inside getPipelineConfig and compare it against what's below —
// don't just trust this blindly.

const PIPELINE_CONFIG_ENDPOINT =
  "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline"
const INFERENCE_ENDPOINT =
  "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"

// Public MeitY pipeline id used by most Bhashini demos (ASR+NMT+TTS bundle).
// If your Bhashini dashboard gave you a different pipeline id, put it in
// BHASHINI_PIPELINE_ID and it'll be used instead.
const DEFAULT_PIPELINE_ID = "64392f96daac500b55c543cd"

type PipelineConfig = {
  asrServiceId: string
  nmtServiceId: string
  ttsServiceId: string
  inferenceApiKey: { name: string; value: string }
}

// In-memory cache so we don't re-fetch pipeline config on every request.
// This resets on every server restart/redeploy — fine for a hackathon demo.
let cachedConfig: { key: string; config: PipelineConfig } | null = null

async function getPipelineConfig(
  sourceLanguage: string,
  targetLanguage: string
): Promise<PipelineConfig> {
  const userId = process.env.BHASHINI_USER_ID
  const apiKey = process.env.BHASHINI_API_KEY
  const pipelineId = process.env.BHASHINI_PIPELINE_ID || DEFAULT_PIPELINE_ID

  if (!userId || !apiKey) {
    throw new Error(
      "Missing BHASHINI_USER_ID or BHASHINI_API_KEY environment variables. " +
        "Set them in .env.local (dev) and in your Vercel project settings (prod)."
    )
  }

  const cacheKey = `${sourceLanguage}-${targetLanguage}`
  if (cachedConfig?.key === cacheKey) return cachedConfig.config

  const res = await fetch(PIPELINE_CONFIG_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      userID: userId,
      ulcaApiKey: apiKey,
    },
    body: JSON.stringify({
      pipelineTasks: [
        { taskType: "asr", config: { language: { sourceLanguage } } },
        {
          taskType: "translation",
          config: { language: { sourceLanguage, targetLanguage } },
        },
        { taskType: "tts", config: { language: { sourceLanguage: targetLanguage } } },
      ],
      pipelineRequestConfig: { pipelineId },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Bhashini pipeline config failed (${res.status}): ${body}`)
  }

  const data = await res.json()

  const findServiceId = (taskType: string) => {
    const stage = data.pipelineResponseConfig?.find(
      (s: any) => s.taskType === taskType
    )
    const serviceId = stage?.config?.[0]?.serviceId
    if (!serviceId) {
      throw new Error(
        `Bhashini has no "${taskType}" model for ${sourceLanguage} -> ${targetLanguage}. ` +
          `This usually means the target language isn't supported for that task on your ` +
          `pipeline/key. Raw stage config: ${JSON.stringify(stage)}`
      )
    }
    return serviceId
  }

  const config: PipelineConfig = {
    asrServiceId: findServiceId("asr"),
    nmtServiceId: findServiceId("translation"),
    ttsServiceId: findServiceId("tts"),
    inferenceApiKey: data.pipelineInferenceAPIEndPoint?.inferenceApiKey,
  }

  if (!config.inferenceApiKey?.value) {
    throw new Error(
      `Bhashini pipeline config did not return an inferenceApiKey. Raw response: ${JSON.stringify(
        data
      )}`
    )
  }

  cachedConfig = { key: cacheKey, config }
  return config
}

export async function voiceToVoice({
  audioBase64,
  sourceLanguage = "hi",
  targetLanguage = "sat",
  sampleRate = 16000,
}: {
  audioBase64: string
  sourceLanguage?: string
  targetLanguage?: string
  sampleRate?: number
}) {
  const config = await getPipelineConfig(sourceLanguage, targetLanguage)

  const res = await fetch(INFERENCE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [config.inferenceApiKey.name]: config.inferenceApiKey.value,
    },
    body: JSON.stringify({
      pipelineTasks: [
        {
          taskType: "asr",
          config: {
            language: { sourceLanguage },
            serviceId: config.asrServiceId,
            audioFormat: "wav",
            samplingRate: sampleRate,
          },
        },
        {
          taskType: "translation",
          config: {
            language: { sourceLanguage, targetLanguage },
            serviceId: config.nmtServiceId,
          },
        },
        {
          taskType: "tts",
          config: {
            language: { sourceLanguage: targetLanguage },
            serviceId: config.ttsServiceId,
            gender: "female",
            samplingRate: 22050,
          },
        },
      ],
      inputData: { audio: [{ audioContent: audioBase64 }] },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Bhashini inference failed (${res.status}): ${body}`)
  }

  const data = await res.json()
  const stages: any[] = data.pipelineResponse ?? []

  const transcript = stages.find((s) => s.taskType === "asr")?.output?.[0]?.source ?? ""
  const translation =
    stages.find((s) => s.taskType === "translation")?.output?.[0]?.target ?? ""
  const ttsAudioBase64 =
    stages.find((s) => s.taskType === "tts")?.audio?.[0]?.audioContent ?? ""

  if (!transcript && !translation && !ttsAudioBase64) {
    throw new Error(
      `Bhashini returned an empty pipeline response — check the raw shape: ${JSON.stringify(
        data
      )}`
    )
  }

  return { transcript, translation, ttsAudioBase64 }
}
