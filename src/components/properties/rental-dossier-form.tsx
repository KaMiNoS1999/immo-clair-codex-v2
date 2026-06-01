"use client";

import { useMemo, useState, type FormEvent } from "react";

import { StatusBadge } from "@/components/ui/status-badge";
import {
  getMissingRentalDossierDocuments,
  getRentalDossierMonthlyTotal,
  getReviewRentalDossierDocuments,
  saveLocalRentalDossier
} from "@/lib/local-rental-dossiers";
import type {
  GuaranteeStatus,
  LocalDocumentAnswer,
  LocalDocumentReviewAnswer,
  LocalRentalDossier,
  RentalDossierPropertyType,
  RentalDossierRegion,
  UrgentWorkPriority
} from "@/types/immo";
import { formatCurrency, formatDate } from "@/utils/formatters";

type FormErrors = Partial<
  Record<
    "propertyName" | "propertyAddress" | "tenantLastName" | "monthlyRent" | "leaseStartDate",
    string
  >
>;

const documentAnswerOptions: Array<{ label: string; value: LocalDocumentAnswer }> = [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
];

const reviewAnswerOptions: Array<{
  label: string;
  value: LocalDocumentReviewAnswer;
}> = [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" },
  { label: "À vérifier", value: "a verifier" }
];

function getTextValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumberValue(formData: FormData, key: string) {
  const value = getTextValue(formData, key).replace(",", ".");
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function getDueDay(formData: FormData) {
  const dueDay = Math.round(getNumberValue(formData, "dueDay"));

  if (dueDay < 1) {
    return 1;
  }

  if (dueDay > 31) {
    return 31;
  }

  return dueDay;
}

function createDossierId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}`;
}

export function RentalDossierForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [savedDossier, setSavedDossier] = useState<LocalRentalDossier | null>(
    null
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [noUrgentWorks, setNoUrgentWorks] = useState(true);

  const missingDocuments = useMemo(
    () =>
      savedDossier ? getMissingRentalDossierDocuments(savedDossier) : [],
    [savedDossier]
  );
  const reviewDocuments = useMemo(
    () => (savedDossier ? getReviewRentalDossierDocuments(savedDossier) : []),
    [savedDossier]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const propertyName = getTextValue(formData, "propertyName");
    const propertyAddress = getTextValue(formData, "propertyAddress");
    const tenantLastName = getTextValue(formData, "tenantLastName");
    const monthlyRent = getNumberValue(formData, "monthlyRent");
    const leaseStartDate = getTextValue(formData, "leaseStartDate");

    const nextErrors: FormErrors = {};

    if (!propertyName) {
      nextErrors.propertyName = "Nom du bien requis.";
    }

    if (!propertyAddress) {
      nextErrors.propertyAddress = "Adresse requise.";
    }

    if (!tenantLastName) {
      nextErrors.tenantLastName = "Nom du locataire requis.";
    }

    if (monthlyRent <= 0) {
      nextErrors.monthlyRent = "Loyer mensuel requis.";
    }

    if (!leaseStartDate) {
      nextErrors.leaseStartDate = "Date de début du bail requise.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback(null);
      return;
    }

    const urgentWorkDescription = getTextValue(formData, "urgentWorkDescription");
    const dossier: LocalRentalDossier = {
      id: createDossierId(),
      createdAt: new Date().toISOString(),
      property: {
        name: propertyName,
        address: propertyAddress,
        municipality: getTextValue(formData, "municipality"),
        region: getTextValue(formData, "region") as RentalDossierRegion,
        type: getTextValue(formData, "propertyType") as RentalDossierPropertyType
      },
      tenant: {
        firstName: getTextValue(formData, "tenantFirstName"),
        lastName: tenantLastName,
        email: getTextValue(formData, "tenantEmail"),
        phone: getTextValue(formData, "tenantPhone") || undefined
      },
      rent: {
        monthlyRent,
        monthlyCharges: getNumberValue(formData, "monthlyCharges"),
        dueDay: getDueDay(formData),
        leaseStartDate,
        guaranteeAmount: getNumberValue(formData, "guaranteeAmount"),
        guaranteeStatus: getTextValue(formData, "guaranteeStatus") as GuaranteeStatus
      },
      documents: {
        signedLease: getTextValue(formData, "signedLease") as LocalDocumentAnswer,
        entryConditionReport: getTextValue(
          formData,
          "entryConditionReport"
        ) as LocalDocumentAnswer,
        epcAvailable: getTextValue(formData, "epcAvailable") as LocalDocumentAnswer,
        leaseRegistered: getTextValue(
          formData,
          "leaseRegistered"
        ) as LocalDocumentReviewAnswer,
        ownerFireInsurance: getTextValue(
          formData,
          "ownerFireInsurance"
        ) as LocalDocumentReviewAnswer
      },
      urgentWorks: {
        none: noUrgentWorks,
        description: noUrgentWorks ? undefined : urgentWorkDescription,
        priority: noUrgentWorks
          ? "faible"
          : (getTextValue(formData, "urgentWorkPriority") as UrgentWorkPriority)
      }
    };

    saveLocalRentalDossier(dossier);
    setErrors({});
    setSavedDossier(dossier);
    setFeedback("Dossier enregistré sur cet appareil.");
  }

  return (
    <div className="guided-dossier">
      <form className="form-panel guided-form" noValidate onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-section-heading">
            <p className="eyebrow">Bien</p>
            <h3>Adresse et type de logement</h3>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Nom du bien *</span>
              <input
                aria-invalid={Boolean(errors.propertyName)}
                name="propertyName"
                placeholder="Appartement Ixelles"
              />
              {errors.propertyName ? (
                <small className="field-error">{errors.propertyName}</small>
              ) : null}
            </label>

            <label className="field">
              <span>Type</span>
              <select defaultValue="appartement" name="propertyType">
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="kot">Kot</option>
                <option value="autre">Autre</option>
              </select>
            </label>

            <label className="field field-wide">
              <span>Adresse *</span>
              <input
                aria-invalid={Boolean(errors.propertyAddress)}
                name="propertyAddress"
                placeholder="Rue, numéro, boîte"
              />
              {errors.propertyAddress ? (
                <small className="field-error">{errors.propertyAddress}</small>
              ) : null}
            </label>

            <label className="field">
              <span>Commune</span>
              <input name="municipality" placeholder="Ixelles" />
            </label>

            <label className="field">
              <span>Région</span>
              <select defaultValue="Bruxelles" name="region">
                <option value="Bruxelles">Bruxelles</option>
                <option value="Wallonie">Wallonie</option>
                <option value="Flandre">Flandre</option>
              </select>
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <p className="eyebrow">Locataire</p>
            <h3>Contact principal</h3>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Prénom</span>
              <input name="tenantFirstName" placeholder="Sarah" />
            </label>

            <label className="field">
              <span>Nom *</span>
              <input
                aria-invalid={Boolean(errors.tenantLastName)}
                name="tenantLastName"
                placeholder="Dupont"
              />
              {errors.tenantLastName ? (
                <small className="field-error">{errors.tenantLastName}</small>
              ) : null}
            </label>

            <label className="field">
              <span>Email</span>
              <input name="tenantEmail" placeholder="sarah@email.be" type="email" />
            </label>

            <label className="field">
              <span>Téléphone optionnel</span>
              <input name="tenantPhone" placeholder="+32..." type="tel" />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <p className="eyebrow">Loyer</p>
            <h3>Bail et garantie</h3>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Loyer mensuel *</span>
              <input
                aria-invalid={Boolean(errors.monthlyRent)}
                inputMode="decimal"
                min="0"
                name="monthlyRent"
                placeholder="950"
                type="number"
              />
              {errors.monthlyRent ? (
                <small className="field-error">{errors.monthlyRent}</small>
              ) : null}
            </label>

            <label className="field">
              <span>Charges mensuelles</span>
              <input
                inputMode="decimal"
                min="0"
                name="monthlyCharges"
                placeholder="80"
                type="number"
              />
            </label>

            <label className="field">
              <span>Jour d'échéance</span>
              <input
                defaultValue="1"
                inputMode="numeric"
                max="31"
                min="1"
                name="dueDay"
                type="number"
              />
            </label>

            <label className="field">
              <span>Date de début du bail *</span>
              <input
                aria-invalid={Boolean(errors.leaseStartDate)}
                name="leaseStartDate"
                type="date"
              />
              {errors.leaseStartDate ? (
                <small className="field-error">{errors.leaseStartDate}</small>
              ) : null}
            </label>

            <label className="field">
              <span>Garantie prévue</span>
              <input
                inputMode="decimal"
                min="0"
                name="guaranteeAmount"
                placeholder="1900"
                type="number"
              />
            </label>

            <label className="field">
              <span>Garantie reçue</span>
              <select defaultValue="non" name="guaranteeStatus">
                <option value="oui">Oui</option>
                <option value="non">Non</option>
                <option value="partielle">Partielle</option>
              </select>
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <p className="eyebrow">Documents</p>
            <h3>Checklist de départ</h3>
          </div>

          <div className="choice-grid">
            <label className="field">
              <span>Bail signé</span>
              <select defaultValue="non" name="signedLease">
                {documentAnswerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>État des lieux fait</span>
              <select defaultValue="non" name="entryConditionReport">
                {documentAnswerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>PEB/EPC présent</span>
              <select defaultValue="non" name="epcAvailable">
                {documentAnswerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Bail enregistré</span>
              <select defaultValue="a verifier" name="leaseRegistered">
                {reviewAnswerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Assurance incendie propriétaire</span>
              <select defaultValue="a verifier" name="ownerFireInsurance">
                {reviewAnswerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <p className="eyebrow">Travaux</p>
            <h3>Point urgent éventuel</h3>
          </div>

          <label className="checkbox-field">
            <input
              checked={noUrgentWorks}
              name="noUrgentWorks"
              onChange={(event) => setNoUrgentWorks(event.target.checked)}
              type="checkbox"
            />
            <span>Aucun travaux urgent</span>
          </label>

          <div className="form-grid">
            <label className="field field-wide">
              <span>Description courte</span>
              <textarea
                disabled={noUrgentWorks}
                name="urgentWorkDescription"
                placeholder="Exemple : fuite sous l'évier"
                rows={3}
              />
            </label>

            <label className="field">
              <span>Priorité</span>
              <select
                defaultValue="moyenne"
                disabled={noUrgentWorks}
                name="urgentWorkPriority"
              >
                <option value="faible">Faible</option>
                <option value="moyenne">Moyenne</option>
                <option value="urgente">Urgente</option>
              </select>
            </label>
          </div>
        </section>

        <div className="form-actions">
          {feedback ? <p className="form-feedback">{feedback}</p> : null}
          <button className="button button-primary" type="submit">
            Enregistrer le dossier
          </button>
        </div>
      </form>

      {savedDossier ? (
        <section className="summary-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Résumé</p>
              <h3>Dossier enregistré sur cet appareil</h3>
            </div>
            <StatusBadge tone="success">Sauvegarde locale</StatusBadge>
          </div>

          <div className="summary-grid">
            <article>
              <small>Bien</small>
              <strong>{savedDossier.property.name}</strong>
              <span>
                {savedDossier.property.address}
                {savedDossier.property.municipality
                  ? `, ${savedDossier.property.municipality}`
                  : ""}
              </span>
            </article>
            <article>
              <small>Locataire</small>
              <strong>
                {savedDossier.tenant.firstName
                  ? `${savedDossier.tenant.firstName} ${savedDossier.tenant.lastName}`
                  : savedDossier.tenant.lastName}
              </strong>
              <span>{savedDossier.tenant.email || "Email non renseigné"}</span>
            </article>
            <article>
              <small>Loyer total</small>
              <strong>
                {formatCurrency(getRentalDossierMonthlyTotal(savedDossier))}
              </strong>
              <span>Échéance le {savedDossier.rent.dueDay} du mois</span>
            </article>
            <article>
              <small>Garantie</small>
              <strong>{formatCurrency(savedDossier.rent.guaranteeAmount)}</strong>
              <span>Statut : {savedDossier.rent.guaranteeStatus}</span>
            </article>
          </div>

          <div className="summary-list">
            <p>
              <strong>Début du bail :</strong>{" "}
              {formatDate(savedDossier.rent.leaseStartDate)}
            </p>
            <p>
              <strong>Documents manquants :</strong>{" "}
              {missingDocuments.length > 0
                ? missingDocuments.join(", ")
                : "Aucun document manquant indiqué"}
            </p>
            <p>
              <strong>Points à vérifier :</strong>{" "}
              {reviewDocuments.length > 0
                ? reviewDocuments.join(", ")
                : "Aucun point à vérifier indiqué"}
            </p>
            <p>
              <strong>Travaux urgents :</strong>{" "}
              {savedDossier.urgentWorks.none
                ? "Aucun travaux urgent renseigné"
                : `${savedDossier.urgentWorks.description || "Description non renseignée"} - priorité ${savedDossier.urgentWorks.priority}`}
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
