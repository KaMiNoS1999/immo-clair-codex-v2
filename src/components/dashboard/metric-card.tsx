type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "good" | "warning" | "danger";
};

export function MetricCard({
  label,
  value,
  detail,
  tone = "default"
}: MetricCardProps) {
  return (
    <article className="metric-card" data-tone={tone}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}
