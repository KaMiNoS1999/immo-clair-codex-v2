import { StatusBadge } from "@/components/ui/status-badge";
import { getProperty, workOrders } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/utils/formatters";
import {
  workOrderPriorityTone,
  workOrderResponsibilityTone
} from "@/utils/status-tones";

export default function WorksPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Travaux</p>
          <h2>Suivi des interventions</h2>
          <p>
            Priorités, coûts et responsabilité probable sont suivis sans tirer
            de conclusion légale automatique.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Demandes ouvertes</h3>
          <span className="muted">Photos et documents seront ajoutés plus tard</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Problème</th>
                <th>Bien concerné</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Coût estimé</th>
                <th>Coût réel</th>
                <th>Responsable probable</th>
                <th>Ouvert le</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder) => {
                const property = getProperty(workOrder.propertyId);

                return (
                  <tr key={workOrder.id}>
                    <td>
                      <strong>{workOrder.title}</strong>
                      <span className="table-note">{workOrder.problem}</span>
                    </td>
                    <td>{property?.name ?? "Bien inconnu"}</td>
                    <td>
                      <StatusBadge tone={workOrderPriorityTone(workOrder.priority)}>
                        {workOrder.priority}
                      </StatusBadge>
                    </td>
                    <td>{workOrder.status}</td>
                    <td>{formatCurrency(workOrder.estimatedCost)}</td>
                    <td>
                      {workOrder.actualCost !== undefined
                        ? formatCurrency(workOrder.actualCost)
                        : "A confirmer"}
                    </td>
                    <td>
                      <StatusBadge
                        tone={workOrderResponsibilityTone(workOrder.likelyResponsible)}
                      >
                        {workOrder.likelyResponsible}
                      </StatusBadge>
                    </td>
                    <td>{formatDate(workOrder.openedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ai-panel">
        <p className="eyebrow">Copilote</p>
        <h3>Synthèse assistée en préparation</h3>
        <p>
          Plus tard, ImmoClair pourra résumer les échanges, classer les photos,
          comparer devis et proposer une responsabilité probable à faire valider.
        </p>
      </section>
    </div>
  );
}
