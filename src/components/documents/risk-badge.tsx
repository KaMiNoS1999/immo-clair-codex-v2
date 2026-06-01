import { StatusBadge, type BadgeTone } from "@/components/ui/status-badge";
import type { DocumentRiskLevel } from "@/types/immo";

type RiskBadgeProps = {
  level: DocumentRiskLevel;
};

const riskTone: Record<DocumentRiskLevel, BadgeTone> = {
  faible: "success",
  moyen: "warning",
  élevé: "danger"
};

const riskLabels: Record<DocumentRiskLevel, string> = {
  faible: "Risque faible",
  moyen: "Risque moyen",
  élevé: "Risque élevé"
};

export function RiskBadge({ level }: RiskBadgeProps) {
  return <StatusBadge tone={riskTone[level]}>{riskLabels[level]}</StatusBadge>;
}
