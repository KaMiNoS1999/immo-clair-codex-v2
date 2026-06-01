import Link from "next/link";

import { MetricCard } from "@/components/dashboard/metric-card";
import { ButtonLink } from "@/components/ui/button-link";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  currentMonth,
  documents,
  getActiveLease,
  getDashboardMetrics,
  getTenant,
  properties,
  reminders,
  rentPayments,
  workOrders
} from "@/data/mock-data";
import { formatCurrency, formatDate, formatMonth } from "@/utils/formatters";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const property = properties[0];
  const activeLease = getActiveLease(property.id);
  const tenant = getTenant(activeLease?.tenantId);
  const currentPayment = rentPayments.find(
    (payment) => payment.month === currentMonth
  );
  const urgentReminders = reminders.filter(
    (reminder) =>
      reminder.status === "à faire" &&
      (reminder.priority === "haute" || reminder.priority === "urgente")
  );
  const latePaymentDetail =
    metrics.latePaymentCount > 1
      ? `${metrics.latePaymentCount} paiements à traiter`
      : `${metrics.latePaymentCount} paiement à traiter`;

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Vue d'ensemble</p>
          <h2>Votre portefeuille locatif, sans feuille Excel</h2>
          <p>
            Une lecture rapide des loyers, documents, travaux et rappels pour
            piloter un appartement loué en Belgique.
          </p>
        </div>
        <ButtonLink href="/biens/ajouter">Ajouter un bien</ButtonLink>
      </section>

      <section className="metric-grid" aria-label="Indicateurs du mois">
        <MetricCard
          detail="Appartement actuellement suivi"
          label="Biens"
          value={String(metrics.propertyCount)}
        />
        <MetricCard
          detail={formatMonth(currentMonth)}
          label="Loyers attendus"
          value={formatCurrency(metrics.expectedRent)}
        />
        <MetricCard
          detail="Paiements encaissés ce mois-ci"
          label="Loyers reçus"
          tone="good"
          value={formatCurrency(metrics.receivedRent)}
        />
        <MetricCard
          detail={latePaymentDetail}
          label="Loyers en retard"
          tone="danger"
          value={formatCurrency(metrics.lateRent)}
        />
        <MetricCard
          detail="Interventions non clôturées"
          label="Travaux ouverts"
          tone="warning"
          value={String(metrics.openWorkCount)}
        />
        <MetricCard
          detail="Manquants ou expirés"
          label="Documents manquants"
          tone="warning"
          value={String(metrics.missingDocumentCount)}
        />
        <MetricCard
          detail="Priorité haute ou urgente"
          label="Rappels importants"
          tone="danger"
          value={String(metrics.importantReminderCount)}
        />
        <MetricCard
          detail="Simulation simple, hors fiscalité détaillée"
          label="Rentabilité mensuelle"
          tone="good"
          value={formatCurrency(metrics.estimatedMonthlyProfit)}
        />
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Bien principal</p>
              <h3>{property.name}</h3>
            </div>
            <Link className="text-link" href={`/biens/${property.id}`}>
              Voir le détail
            </Link>
          </div>

          <dl className="info-grid">
            <div>
              <dt>Locataire</dt>
              <dd>{tenant ? `${tenant.firstName} ${tenant.lastName}` : "Aucun"}</dd>
            </div>
            <div>
              <dt>Bail</dt>
              <dd>{activeLease ? "Actif" : "A compléter"}</dd>
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
              <dt>PEB/EPC</dt>
              <dd>
                {property.epcLabel}
                {property.epcScore ? ` - ${property.epcScore} kWh/m²/an` : ""}
              </dd>
            </div>
          </dl>

          <div className="inline-alert">
            <strong>Point d'attention</strong>
            <span>
              Le bail est actif, mais la preuve d'enregistrement est encore
              manquante dans les documents.
            </span>
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Loyer du mois</p>
              <h3>{formatMonth(currentMonth)}</h3>
            </div>
            <StatusBadge tone={currentPayment?.status === "payé" ? "success" : "warning"}>
              {currentPayment?.status ?? "à vérifier"}
            </StatusBadge>
          </div>

          <dl className="info-grid">
            <div>
              <dt>Attendu</dt>
              <dd>{formatCurrency(currentPayment?.expectedAmount ?? 0)}</dd>
            </div>
            <div>
              <dt>Reçu</dt>
              <dd>{formatCurrency(currentPayment?.receivedAmount ?? 0)}</dd>
            </div>
            <div>
              <dt>Échéance</dt>
              <dd>{formatDate(currentPayment?.dueDate)}</dd>
            </div>
            <div>
              <dt>Reste</dt>
              <dd>
                {formatCurrency(
                  Math.max(
                    (currentPayment?.expectedAmount ?? 0) -
                      (currentPayment?.receivedAmount ?? 0),
                    0
                  )
                )}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="three-column">
        <article className="panel">
          <div className="section-heading">
            <h3>Rappels importants</h3>
            <Link className="text-link" href="/documents">
              Documents
            </Link>
          </div>
          <ul className="clean-list">
            {urgentReminders.map((reminder) => (
              <li key={reminder.id}>
                <strong>{reminder.title}</strong>
                <span>{formatDate(reminder.dueDate)}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading">
            <h3>Travaux ouverts</h3>
            <Link className="text-link" href="/travaux">
              Suivre
            </Link>
          </div>
          <ul className="clean-list">
            {workOrders
              .filter((workOrder) => workOrder.status !== "terminé")
              .map((workOrder) => (
                <li key={workOrder.id}>
                  <strong>{workOrder.title}</strong>
                  <span>{formatCurrency(workOrder.estimatedCost)} estimés</span>
                </li>
              ))}
          </ul>
        </article>

        <article className="ai-panel">
          <p className="eyebrow">Copilote</p>
          <h3>Synthèse assistée en préparation</h3>
          <p>
            Cet espace servira à générer des synthèses, brouillons de messages,
            alertes de documents et simulations. Rien ne sera envoyé sans
            validation.
          </p>
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Documents à compléter</h3>
          <Link className="text-link" href="/documents">
            Voir tout
          </Link>
        </div>
        <div className="document-strip">
          {documents
            .filter((document) => document.status !== "présent")
            .map((document) => (
              <div key={document.id}>
                <StatusBadge
                  tone={document.status === "manquant" ? "danger" : "warning"}
                >
                  {document.status}
                </StatusBadge>
                <strong>{document.title}</strong>
                <span>{document.dueDate ? formatDate(document.dueDate) : "A planifier"}</span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
