"use client";

import { useMemo, useSyncExternalStore } from "react";

import { StatusBadge } from "@/components/ui/status-badge";
import {
  getMissingRentalDossierDocuments,
  getRentalDossierMonthlyTotal,
  LOCAL_RENTAL_DOSSIERS_EVENT,
  LOCAL_RENTAL_DOSSIERS_KEY
} from "@/lib/local-rental-dossiers";
import type { LocalRentalDossier } from "@/types/immo";
import { formatCurrency, formatDate } from "@/utils/formatters";

function subscribeToLocalDossiers(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LOCAL_RENTAL_DOSSIERS_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LOCAL_RENTAL_DOSSIERS_EVENT, onStoreChange);
  };
}

function getLocalDossierSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  try {
    return window.localStorage.getItem(LOCAL_RENTAL_DOSSIERS_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerDossierSnapshot() {
  return "[]";
}

function parseDossierSnapshot(snapshot: string) {
  try {
    const parsedValue = JSON.parse(snapshot);

    return Array.isArray(parsedValue)
      ? (parsedValue as LocalRentalDossier[])
      : [];
  } catch {
    return [];
  }
}

function getTenantName(dossier: LocalRentalDossier) {
  return dossier.tenant.firstName
    ? `${dossier.tenant.firstName} ${dossier.tenant.lastName}`
    : dossier.tenant.lastName;
}

export function LocalPropertyList() {
  const dossierSnapshot = useSyncExternalStore(
    subscribeToLocalDossiers,
    getLocalDossierSnapshot,
    getServerDossierSnapshot
  );
  const dossiers = useMemo(
    () => parseDossierSnapshot(dossierSnapshot),
    [dossierSnapshot]
  );

  return (
    <section className="local-property-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Sur cet appareil</p>
          <h3>Dossiers locatifs enregistrés</h3>
        </div>
        <StatusBadge tone={dossiers.length > 0 ? "success" : "neutral"}>
          {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""}
        </StatusBadge>
      </div>

      {dossiers.length === 0 ? (
        <p className="muted">
          Les dossiers sauvegardés localement apparaîtront ici après
          l'enregistrement.
        </p>
      ) : (
        <div className="local-property-list">
          {dossiers.map((dossier) => {
            const missingDocuments =
              getMissingRentalDossierDocuments(dossier).length;

            return (
              <article className="local-property-card" key={dossier.id}>
                <div>
                  <p className="eyebrow">{dossier.property.type}</p>
                  <h3>{dossier.property.name}</h3>
                  <p className="muted">
                    {dossier.property.address}
                    {dossier.property.municipality
                      ? `, ${dossier.property.municipality}`
                      : ""}
                    {" - "}
                    {dossier.property.region}
                  </p>
                </div>

                <div className="property-card-grid">
                  <span>
                    <small>Loyer total</small>
                    <strong>
                      {formatCurrency(getRentalDossierMonthlyTotal(dossier))}
                    </strong>
                  </span>
                  <span>
                    <small>Locataire</small>
                    <strong>{getTenantName(dossier)}</strong>
                  </span>
                  <span>
                    <small>Début bail</small>
                    <strong>{formatDate(dossier.rent.leaseStartDate)}</strong>
                  </span>
                </div>

                <div className="local-property-footer">
                  <StatusBadge tone={missingDocuments > 0 ? "warning" : "success"}>
                    {missingDocuments > 0
                      ? `${missingDocuments} document${missingDocuments > 1 ? "s" : ""} à compléter`
                      : "Dossier complet indiqué"}
                  </StatusBadge>
                  <span className="muted">Données locales uniquement</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
