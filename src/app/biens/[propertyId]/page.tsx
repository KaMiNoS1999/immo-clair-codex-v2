import { notFound } from "next/navigation";

import { StatusBadge } from "@/components/ui/status-badge";
import {
  getPropertyBundle,
  properties
} from "@/data/mock-data";
import {
  formatCurrency,
  formatDate,
  formatMonth,
  formatPercent,
  fullAddress
} from "@/utils/formatters";
import {
  documentStatusTone,
  rentPaymentStatusTone,
  workOrderPriorityTone
} from "@/utils/status-tones";

type PropertyDetailPageProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({
    propertyId: property.id
  }));
}

export default async function PropertyDetailPage({
  params
}: PropertyDetailPageProps) {
  const { propertyId } = await params;
  const bundle = getPropertyBundle(propertyId);

  if (!bundle) {
    notFound();
  }

  const {
    property,
    activeLease,
    tenant,
    documents,
    rentPayments,
    reminders,
    simulation,
    workOrders
  } = bundle;
  const missingDocuments = documents.filter((document) => document.status !== "présent");
  const activeAlerts = reminders.filter((reminder) => reminder.status === "à faire");

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">{property.type}</p>
          <h2>{property.name}</h2>
          <p>{fullAddress(property.address)}</p>
        </div>
        <StatusBadge tone={activeLease ? "success" : "warning"}>
          {activeLease ? "Loué" : "A compléter"}
        </StatusBadge>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Fiche du bien</h3>
          <span className="muted">Données administratives principales</span>
        </div>
        <dl className="info-grid detail-grid">
          <div>
            <dt>Adresse</dt>
            <dd>{fullAddress(property.address)}</dd>
          </div>
          <div>
            <dt>Type de bien</dt>
            <dd>{property.type}</dd>
          </div>
          <div>
            <dt>Région</dt>
            <dd>{property.address.region}</dd>
          </div>
          <div>
            <dt>Commune</dt>
            <dd>{property.address.municipality}</dd>
          </div>
          <div>
            <dt>Revenu cadastral</dt>
            <dd>{formatCurrency(property.cadastralIncome)}</dd>
          </div>
          <div>
            <dt>PEB/EPC</dt>
            <dd>
              {property.epcLabel}
              {property.epcScore ? ` - ${property.epcScore} kWh/m²/an` : ""}
            </dd>
          </div>
          <div>
            <dt>Loyer actuel</dt>
            <dd>
              {activeLease
                ? formatCurrency(activeLease.monthlyRent + activeLease.monthlyCharges)
                : "Non renseigné"}
            </dd>
          </div>
          <div>
            <dt>Locataire actuel</dt>
            <dd>{tenant ? `${tenant.firstName} ${tenant.lastName}` : "Aucun"}</dd>
          </div>
          <div>
            <dt>Bail actif</dt>
            <dd>
              {activeLease
                ? `${formatDate(activeLease.startDate)} - ${formatDate(activeLease.endDate)}`
                : "Aucun bail actif"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <h3>Documents liés</h3>
            <StatusBadge tone={missingDocuments.length > 0 ? "warning" : "success"}>
              {missingDocuments.length} à traiter
            </StatusBadge>
          </div>
          <ul className="clean-list">
            {documents.map((document) => (
              <li key={document.id}>
                <strong>{document.title}</strong>
                <span>{document.type}</span>
                <StatusBadge
                  tone={documentStatusTone(document.status)}
                >
                  {document.status}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading">
            <h3>Travaux liés</h3>
            <StatusBadge tone="info">{workOrders.length} suivi(s)</StatusBadge>
          </div>
          <ul className="clean-list">
            {workOrders.map((workOrder) => (
              <li key={workOrder.id}>
                <strong>{workOrder.title}</strong>
                <span>{formatCurrency(workOrder.estimatedCost)} estimés</span>
                <StatusBadge tone={workOrderPriorityTone(workOrder.priority)}>
                  {workOrder.status}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <h3>Paiements récents</h3>
            <span className="muted">Derniers mois suivis</span>
          </div>
          <ul className="clean-list">
            {rentPayments.slice(0, 4).map((payment) => (
              <li key={payment.id}>
                <strong>{formatMonth(payment.month)}</strong>
                <span>
                  {formatCurrency(payment.receivedAmount)} /{" "}
                  {formatCurrency(payment.expectedAmount)}
                </span>
                <StatusBadge tone={rentPaymentStatusTone(payment.status)}>
                  {payment.status}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading">
            <h3>Alertes</h3>
            <StatusBadge tone={activeAlerts.length > 0 ? "danger" : "success"}>
              {activeAlerts.length} active(s)
            </StatusBadge>
          </div>
          <ul className="clean-list">
            {activeAlerts.map((reminder) => (
              <li key={reminder.id}>
                <strong>{reminder.title}</strong>
                <span>{formatDate(reminder.dueDate)}</span>
                <StatusBadge
                  tone={reminder.priority === "urgente" ? "danger" : "warning"}
                >
                  {reminder.priority}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="ai-panel">
        <p className="eyebrow">Simulation</p>
        <h3>Rentabilité mensuelle estimée</h3>
        <p>
          {simulation
            ? `${formatCurrency(
                simulation.estimatedMonthlyProfit
              )} estimés par mois, rendement brut indicatif ${formatPercent(
                simulation.estimatedGrossYieldPercent
              )}.`
            : "Aucune simulation disponible."}
        </p>
        <p>
          Analyse IA bientôt disponible pour expliquer les écarts, repérer les
          documents manquants et préparer des brouillons d'action.
        </p>
      </section>
    </div>
  );
}
