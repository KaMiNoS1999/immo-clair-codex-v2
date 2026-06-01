import type { LocalRentalDossier } from "@/types/immo";

export const LOCAL_RENTAL_DOSSIERS_KEY = "immoclair.localRentalDossiers.v1";
export const LOCAL_RENTAL_DOSSIERS_EVENT =
  "immoclair:local-rental-dossiers-updated";

const documentLabels: Record<keyof LocalRentalDossier["documents"], string> = {
  signedLease: "Bail signé",
  entryConditionReport: "État des lieux d'entrée",
  epcAvailable: "PEB/EPC",
  leaseRegistered: "Preuve d'enregistrement",
  ownerFireInsurance: "Assurance incendie propriétaire"
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function readLocalRentalDossiers(): LocalRentalDossier[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(LOCAL_RENTAL_DOSSIERS_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    return Array.isArray(parsedValue)
      ? (parsedValue as LocalRentalDossier[])
      : [];
  } catch {
    return [];
  }
}

export function saveLocalRentalDossier(dossier: LocalRentalDossier) {
  if (!canUseLocalStorage()) {
    return;
  }

  const dossiers = readLocalRentalDossiers();
  window.localStorage.setItem(
    LOCAL_RENTAL_DOSSIERS_KEY,
    JSON.stringify([dossier, ...dossiers])
  );
  window.dispatchEvent(new Event(LOCAL_RENTAL_DOSSIERS_EVENT));
}

export function getRentalDossierMonthlyTotal(dossier: LocalRentalDossier) {
  return dossier.rent.monthlyRent + dossier.rent.monthlyCharges;
}

export function getMissingRentalDossierDocuments(
  dossier: LocalRentalDossier
): string[] {
  return Object.entries(dossier.documents).reduce<string[]>(
    (missingDocuments, [documentKey, documentStatus]) => {
      if (documentStatus === "non") {
        missingDocuments.push(
          documentLabels[documentKey as keyof LocalRentalDossier["documents"]]
        );
      }

      return missingDocuments;
    },
    []
  );
}

export function getReviewRentalDossierDocuments(
  dossier: LocalRentalDossier
): string[] {
  return Object.entries(dossier.documents).reduce<string[]>(
    (reviewDocuments, [documentKey, documentStatus]) => {
      if (documentStatus === "a verifier") {
        reviewDocuments.push(
          documentLabels[documentKey as keyof LocalRentalDossier["documents"]]
        );
      }

      return reviewDocuments;
    },
    []
  );
}
