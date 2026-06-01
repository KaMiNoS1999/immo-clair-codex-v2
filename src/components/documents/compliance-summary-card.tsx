import type { ReactNode } from "react";

type ComplianceSummaryCardProps = {
  label: string;
  value: ReactNode;
  detail?: string;
  tone?: "neutral" | "good" | "warning" | "danger";
};

export function ComplianceSummaryCard({
  label,
  value,
  detail,
  tone = "neutral"
}: ComplianceSummaryCardProps) {
  return (
    <article className="compliance-summary-card" data-tone={tone}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <small>{detail}</small> : null}
    </article>
  );
}
