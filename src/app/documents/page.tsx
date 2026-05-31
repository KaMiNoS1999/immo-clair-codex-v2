import { StatusBadge } from "@/components/ui/status-badge";
import { documents, getProperty } from "@/data/mock-data";
import { formatDate } from "@/utils/formatters";
import { documentStatusTone } from "@/utils/status-tones";

export default function DocumentsPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Documents</p>
          <h2>Classement immobilier</h2>
          <p>
            Bail, état des lieux, PEB/EPC, preuve d'enregistrement, assurance,
            factures, devis et documents fiscaux sont visibles au même endroit.
          </p>
        </div>
      </section>

      <section className="document-grid">
        {documents.map((document) => {
          const property = getProperty(document.propertyId);

          return (
            <article className="document-card" key={document.id}>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{document.type}</p>
                  <h3>{document.title}</h3>
                </div>
                <StatusBadge tone={documentStatusTone(document.status)}>
                  {document.status}
                </StatusBadge>
              </div>
              <dl className="mini-definition">
                <div>
                  <dt>Bien</dt>
                  <dd>{property?.name ?? "Bien inconnu"}</dd>
                </div>
                <div>
                  <dt>Ajouté le</dt>
                  <dd>{formatDate(document.uploadedAt)}</dd>
                </div>
                <div>
                  <dt>Échéance</dt>
                  <dd>{formatDate(document.dueDate)}</dd>
                </div>
                <div>
                  <dt>Fichier</dt>
                  <dd>{document.fileName ?? "A ajouter"}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </section>

      <section className="ai-panel">
        <p className="eyebrow">Copilote</p>
        <h3>Analyse IA bientôt disponible</h3>
        <p>
          L'espace IA pourra plus tard repérer les pièces manquantes, extraire
          des dates clés et générer une checklist à valider par le propriétaire.
        </p>
      </section>
    </div>
  );
}
