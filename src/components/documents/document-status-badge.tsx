import { StatusBadge } from "@/components/ui/status-badge";
import type { DocumentStatus } from "@/types/immo";
import { documentStatusTone } from "@/utils/status-tones";

type DocumentStatusBadgeProps = {
  status: DocumentStatus;
};

const statusLabels: Record<DocumentStatus, string> = {
  présent: "Présent",
  manquant: "Manquant",
  expiré: "Expiré",
  "à vérifier": "À vérifier"
};

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  return (
    <StatusBadge tone={documentStatusTone(status)}>{statusLabels[status]}</StatusBadge>
  );
}
