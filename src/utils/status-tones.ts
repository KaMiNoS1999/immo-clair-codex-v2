import type { BadgeTone } from "@/components/ui/status-badge";
import type {
  DocumentStatus,
  RentPaymentStatus,
  WorkOrderPriority,
  WorkOrderResponsibility
} from "@/types/immo";

export function documentStatusTone(status: DocumentStatus): BadgeTone {
  if (status === "présent") {
    return "success";
  }

  if (status === "manquant" || status === "expiré") {
    return "danger";
  }

  return "warning";
}

export function rentPaymentStatusTone(status: RentPaymentStatus): BadgeTone {
  if (status === "payé") {
    return "success";
  }

  if (status === "partiel") {
    return "warning";
  }

  return "danger";
}

export function workOrderPriorityTone(priority: WorkOrderPriority): BadgeTone {
  if (priority === "urgente" || priority === "haute") {
    return "danger";
  }

  if (priority === "moyenne") {
    return "warning";
  }

  return "neutral";
}

export function workOrderResponsibilityTone(
  responsibility: WorkOrderResponsibility
): BadgeTone {
  if (responsibility === "bailleur") {
    return "info";
  }

  if (responsibility === "locataire") {
    return "warning";
  }

  return "neutral";
}
