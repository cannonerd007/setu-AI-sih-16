export function LessonCard({
  tag,
  title,
  subtitle,
}: {
  tag: string
  title: string
  subtitle: string
}) {
  return (
    <section className="su-card su-card--lowest su-lesson-info">
      <div>
        <span className="su-tag">{tag}</span>
        <h2 className="su-type-headline-md" style={{ marginTop: 8 }}>
          {title}
        </h2>
        <p className="su-type-body-sm" style={{ color: "var(--su-outline)", marginTop: 4 }}>
          {subtitle}
        </p>
      </div>
    </section>
  )
}
