import { reminders, rentPayments, workOrders } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/utils/formatters";

export default function AssistantPage() {
  const openWorkOrders = workOrders.filter(
    (workOrder) => workOrder.status !== "terminé"
  );
  const latePayments = rentPayments.filter(
    (payment) =>
      payment.status === "en retard" ||
      payment.status === "partiel" ||
      payment.status === "non payé"
  );
  const activeReminders = reminders.filter(
    (reminder) => reminder.status === "à faire"
  );

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Assistant</p>
          <h2>Analyse IA bient&ocirc;t disponible</h2>
          <p>
            Cette page stabilise l&apos;emplacement du futur copilote. Les
            synth&egrave;ses et brouillons resteront toujours &agrave; valider
            par le propri&eacute;taire.
          </p>
        </div>
      </section>

      <section className="three-column">
        <article className="ai-panel">
          <p className="eyebrow">Loyers</p>
          <h3>{latePayments.length} point(s) &agrave; v&eacute;rifier</h3>
          <p>
            Reste &agrave; suivre :{" "}
            {formatCurrency(
              latePayments.reduce(
                (total, payment) =>
                  total + Math.max(payment.expectedAmount - payment.receivedAmount, 0),
                0
              )
            )}
            .
          </p>
        </article>

        <article className="ai-panel">
          <p className="eyebrow">Travaux</p>
          <h3>{openWorkOrders.length} intervention(s) ouverte(s)</h3>
          <p>
            Les photos, devis et responsabilit&eacute;s probables seront
            analysables plus tard.
          </p>
        </article>

        <article className="ai-panel">
          <p className="eyebrow">Rappels</p>
          <h3>{activeReminders.length} rappel(s) actif(s)</h3>
          <p>Prochaine date : {formatDate(activeReminders[0]?.dueDate)}.</p>
        </article>
      </section>
    </div>
  );
}
