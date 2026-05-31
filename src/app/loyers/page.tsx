import { StatusBadge } from "@/components/ui/status-badge";
import {
  getProperty,
  getTenant,
  rentPayments
} from "@/data/mock-data";
import { formatCurrency, formatDate, formatMonth } from "@/utils/formatters";
import { rentPaymentStatusTone } from "@/utils/status-tones";

export default function RentsPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Loyers</p>
          <h2>Suivi des paiements</h2>
          <p>
            Une vue claire des montants attendus, reçus et restants à traiter.
            Le bouton de paiement est visuel pour ce prototype.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Historique récent</h3>
          <span className="muted">Données mockées, sans connexion bancaire</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mois</th>
                <th>Locataire</th>
                <th>Bien</th>
                <th>Attendu</th>
                <th>Reçu</th>
                <th>Statut</th>
                <th>Date de paiement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rentPayments.map((payment) => {
                const tenant = getTenant(payment.tenantId);
                const property = getProperty(payment.propertyId);
                const isPaid = payment.status === "payé";

                return (
                  <tr key={payment.id}>
                    <td>{formatMonth(payment.month)}</td>
                    <td>
                      {tenant ? `${tenant.firstName} ${tenant.lastName}` : "Inconnu"}
                    </td>
                    <td>{property?.name ?? "Bien inconnu"}</td>
                    <td>{formatCurrency(payment.expectedAmount)}</td>
                    <td>{formatCurrency(payment.receivedAmount)}</td>
                    <td>
                      <StatusBadge tone={rentPaymentStatusTone(payment.status)}>
                        {payment.status}
                      </StatusBadge>
                    </td>
                    <td>{formatDate(payment.paidAt)}</td>
                    <td>
                      <button
                        className="button button-secondary button-small"
                        disabled={isPaid}
                        type="button"
                      >
                        {isPaid ? "Payé" : "Marquer comme payé"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ai-panel">
        <p className="eyebrow">Copilote</p>
        <h3>Analyse IA bientôt disponible</h3>
        <p>
          L'objectif futur : détecter les retards, préparer un brouillon de
          relance et expliquer les écarts sans envoyer de message automatiquement.
        </p>
      </section>
    </div>
  );
}
