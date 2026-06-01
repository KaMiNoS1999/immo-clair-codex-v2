import { ComplianceSummaryCard } from "@/components/documents/compliance-summary-card";
import { DocumentStatusBadge } from "@/components/documents/document-status-badge";
import { RiskBadge } from "@/components/documents/risk-badge";
import {
  documents,
  documentSections,
  getDocumentComplianceSummary,
  getDocumentsBySection,
  getProperty
} from "@/data/mock-data";
import { formatDate } from "@/utils/formatters";

export default function DocumentsPage() {
  const summary = getDocumentComplianceSummary();
  const nextDueDocument = summary.nextDueDocument;

  return (
    <div className="page-stack">
      <section className="page-hero documents-hero">
        <div>
          <p className="eyebrow">Documents</p>
          <h2>Coffre-fort documentaire bailleur belge</h2>
          <p>
            Suivez les pièces importantes d'un appartement loué, repérez les
            manques et préparez un dossier clair sans transformer ImmoClair en
            conseil juridique.
          </p>
        </div>
        <div className="document-actions">
          <button className="button button-secondary" disabled>
            Ajout manuel à connecter
          </button>
          <button className="button button-primary" disabled>
            Préparer le dossier
          </button>
        </div>
      </section>

      <section className="document-compliance">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Conformité bailleur belge</p>
            <h3>Vue de contrôle documentaire</h3>
          </div>
          <span className="document-context">
            Démonstration prudente, à valider avec une source officielle ou un
            professionnel.
          </span>
        </div>

        <div className="compliance-grid">
          <ComplianceSummaryCard
            detail={`${documents.length} pièces suivies`}
            label="Documents présents"
            tone="good"
            value={summary.presentCount}
          />
          <ComplianceSummaryCard
            detail="Manquants ou expirés"
            label="Documents manquants"
            tone={summary.missingCount > 0 ? "danger" : "good"}
            value={summary.missingCount}
          />
          <ComplianceSummaryCard
            detail="Risque élevé non clôturé"
            label="Points critiques"
            tone={summary.criticalPointCount > 0 ? "danger" : "good"}
            value={summary.criticalPointCount}
          />
          <ComplianceSummaryCard
            detail={nextDueDocument?.title ?? "Aucun point ouvert"}
            label="Prochaine échéance"
            tone={nextDueDocument ? "warning" : "good"}
            value={nextDueDocument ? formatDate(nextDueDocument.dueDate) : "OK"}
          />
          <ComplianceSummaryCard
            detail="Score indicatif de démonstration"
            label="Complétude documentaire"
            tone={summary.completenessScore >= 80 ? "good" : "warning"}
            value={`${summary.completenessScore}%`}
          />
        </div>
      </section>

      <div className="document-sections">
        {documentSections.map((section) => {
          const sectionDocuments = getDocumentsBySection(section.id);
          const documentCountLabel =
            sectionDocuments.length > 1
              ? `${sectionDocuments.length} documents suivis`
              : `${sectionDocuments.length} document suivi`;

          return (
            <section className="document-section" key={section.id}>
              <div className="document-section-header">
                <div>
                  <p className="eyebrow">{section.title}</p>
                  <h3>{documentCountLabel}</h3>
                </div>
                <p>{section.description}</p>
              </div>

              <div className="document-checklist-grid">
                {sectionDocuments.map((document) => {
                  const property = getProperty(document.propertyId);

                  return (
                    <article className="document-card" key={document.id}>
                      <div className="document-card-top">
                        <div>
                          <p className="eyebrow">{document.type}</p>
                          <h4>{document.title}</h4>
                        </div>
                        <div className="document-badge-stack">
                          <DocumentStatusBadge status={document.status} />
                          <RiskBadge level={document.riskLevel} />
                        </div>
                      </div>

                      <dl className="document-detail-grid">
                        <div>
                          <dt>Bien concerné</dt>
                          <dd>{property?.name ?? "Bien inconnu"}</dd>
                        </div>
                        <div>
                          <dt>Échéance</dt>
                          <dd>{formatDate(document.dueDate)}</dd>
                        </div>
                        <div>
                          <dt>Fichier classé</dt>
                          <dd>{document.fileName ?? "À connecter"}</dd>
                        </div>
                      </dl>

                      <div className="document-utility">
                        <span>Utilité pratique</span>
                        <p>{document.practicalUse}</p>
                      </div>

                      <div className="document-recommendation">
                        <span>Action recommandée</span>
                        <p>{document.recommendedAction}</p>
                      </div>

                      <button className="button button-secondary button-small" disabled>
                        Ajout manuel à connecter
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="document-explainer">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Repères pratiques</p>
            <h3>Pourquoi ces documents comptent</h3>
          </div>
        </div>

        <div className="document-explainer-grid">
          <article>
            <strong>Bail et état des lieux</strong>
            <p>
              Ils structurent la relation locative et donnent un cadre clair au
              loyer, aux charges, à la garantie et à l'état du logement.
            </p>
          </article>
          <article>
            <strong>Preuve d'enregistrement</strong>
            <p>
              Elle aide à suivre une obligation administrative importante, à
              vérifier selon le bail et la situation du propriétaire.
            </p>
          </article>
          <article>
            <strong>PEB/EPC</strong>
            <p>
              Il peut avoir un impact sur les informations locatives et
              l'indexation selon la région et le type de bail.
            </p>
          </article>
          <article>
            <strong>Précompte immobilier</strong>
            <p>
              C'est une taxe propriétaire à suivre annuellement pour garder une
              vision réaliste du coût du bien.
            </p>
          </article>
          <article>
            <strong>Factures et devis travaux</strong>
            <p>
              Ils servent de preuve, d'historique et de base de comparaison pour
              les décisions d'entretien.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
