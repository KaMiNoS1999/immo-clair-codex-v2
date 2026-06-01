import type {
  Document,
  InvestmentSimulation,
  Lease,
  Property,
  Reminder,
  RentPayment,
  Tenant,
  WorkOrder
} from "@/types/immo";

export const currentMonth = "2026-05";

export const properties: Property[] = [
  {
    id: "appartement-ixelles",
    name: "Appartement Ixelles - Etangs",
    type: "Appartement",
    address: {
      street: "Rue de la Digue",
      number: "42 bte 3",
      postalCode: "1050",
      municipality: "Ixelles",
      region: "Bruxelles-Capitale",
      country: "Belgique"
    },
    cadastralIncome: 1048,
    epcLabel: "C",
    epcScore: 138,
    surfaceSqm: 72,
    bedrooms: 2,
    acquisitionPrice: 315000,
    monthlyCosts: 220,
    currentLeaseId: "bail-ixelles-2025",
    notes:
      "Bien loué à usage de résidence principale. Les prochaines étapes sont le suivi documentaire et la régularisation des petites réparations."
  }
];

export const tenants: Tenant[] = [
  {
    id: "tenant-marie-dubois",
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@example.com",
    phone: "+32 476 12 34 56"
  }
];

export const leases: Lease[] = [
  {
    id: "bail-ixelles-2025",
    propertyId: "appartement-ixelles",
    tenantId: "tenant-marie-dubois",
    startDate: "2025-09-01",
    endDate: "2028-08-31",
    monthlyRent: 980,
    monthlyCharges: 70,
    depositAmount: 1960,
    registered: false,
    status: "actif"
  }
];

export const rentPayments: RentPayment[] = [
  {
    id: "rent-2026-05",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    tenantId: "tenant-marie-dubois",
    month: "2026-05",
    dueDate: "2026-05-05",
    expectedAmount: 1050,
    receivedAmount: 600,
    status: "partiel",
    paidAt: "2026-05-08"
  },
  {
    id: "rent-2026-04",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    tenantId: "tenant-marie-dubois",
    month: "2026-04",
    dueDate: "2026-04-05",
    expectedAmount: 1050,
    receivedAmount: 1050,
    status: "payé",
    paidAt: "2026-04-03"
  },
  {
    id: "rent-2026-03",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    tenantId: "tenant-marie-dubois",
    month: "2026-03",
    dueDate: "2026-03-05",
    expectedAmount: 1050,
    receivedAmount: 1050,
    status: "payé",
    paidAt: "2026-03-05"
  },
  {
    id: "rent-2026-02",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    tenantId: "tenant-marie-dubois",
    month: "2026-02",
    dueDate: "2026-02-05",
    expectedAmount: 1050,
    receivedAmount: 0,
    status: "en retard"
  }
];

export const workOrders: WorkOrder[] = [
  {
    id: "work-chaudiere",
    propertyId: "appartement-ixelles",
    title: "Entretien chaudière à confirmer",
    problem:
      "Le locataire signale que l'attestation d'entretien n'a pas encore été transmise pour 2026.",
    priority: "haute",
    status: "ouvert",
    estimatedCost: 145,
    likelyResponsible: "bailleur",
    openedAt: "2026-05-21",
    documentIds: []
  },
  {
    id: "work-robinet",
    propertyId: "appartement-ixelles",
    title: "Robinet cuisine qui goutte",
    problem:
      "Petit écoulement régulier sous l'évier. Une photo doit être ajoutée plus tard.",
    priority: "moyenne",
    status: "planifié",
    estimatedCost: 95,
    actualCost: 0,
    likelyResponsible: "à vérifier",
    openedAt: "2026-05-18",
    documentIds: []
  }
];

export const documents: Document[] = [
  {
    id: "doc-bail",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    type: "bail",
    title: "Bail de résidence principale",
    status: "présent",
    section: "critical",
    practicalUse:
      "Structure la relation locative, le loyer, les charges, la garantie et les dates clés.",
    riskLevel: "faible",
    recommendedAction:
      "Conserver la version signée et vérifier que les annexes utiles sont classées.",
    critical: true,
    uploadedAt: "2025-08-24",
    fileName: "bail-ixelles-2025.pdf"
  },
  {
    id: "doc-etat-lieux",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    type: "état des lieux",
    title: "Etat des lieux d'entrée",
    status: "présent",
    section: "critical",
    practicalUse:
      "Sert de référence pour comparer l'état du logement au début et à la fin du bail.",
    riskLevel: "faible",
    recommendedAction:
      "Garder le document signé avec ses photos ou annexes éventuelles.",
    critical: true,
    uploadedAt: "2025-09-01",
    fileName: "etat-des-lieux-entree.pdf"
  },
  {
    id: "doc-epc",
    propertyId: "appartement-ixelles",
    type: "PEB/EPC",
    title: "Certificat PEB",
    status: "présent",
    section: "critical",
    practicalUse:
      "Documente la performance énergétique et peut influencer certaines informations locatives selon la région.",
    riskLevel: "faible",
    recommendedAction:
      "Vérifier la durée de validité et conserver le certificat lié au bien.",
    critical: true,
    dueDate: "2034-11-16",
    uploadedAt: "2024-11-16",
    fileName: "peb-ixelles.pdf"
  },
  {
    id: "doc-registration",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    type: "preuve d'enregistrement",
    title: "Preuve d'enregistrement du bail",
    status: "manquant",
    section: "critical",
    practicalUse:
      "Permet de suivre une obligation administrative importante liée au bail.",
    riskLevel: "élevé",
    recommendedAction:
      "Récupérer la preuve ou vérifier la situation via une source officielle.",
    critical: true,
    dueDate: "2026-06-15"
  },
  {
    id: "doc-insurance",
    propertyId: "appartement-ixelles",
    type: "assurance",
    title: "Assurance incendie propriétaire",
    status: "à vérifier",
    section: "review",
    practicalUse:
      "Aide à suivre la couverture du propriétaire et les garanties liées au bien.",
    riskLevel: "moyen",
    recommendedAction:
      "Vérifier la police, la période couverte et les clauses utiles pour le bailleur.",
    dueDate: "2026-06-30"
  },
  {
    id: "doc-recourse",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    type: "assurance",
    title: "Abandon de recours ou assurance locataire",
    status: "à vérifier",
    section: "review",
    practicalUse:
      "Point d'attention utile pour comprendre qui est couvert et dans quelles limites.",
    riskLevel: "moyen",
    recommendedAction:
      "Vérifier le bail et les attestations disponibles, selon la région et le type de bail.",
    dueDate: "2026-07-10"
  },
  {
    id: "doc-tax",
    propertyId: "appartement-ixelles",
    type: "document fiscal",
    title: "Précompte immobilier 2026",
    status: "manquant",
    section: "taxes",
    practicalUse:
      "Taxe propriétaire à suivre annuellement pour garder une vision claire des charges.",
    riskLevel: "moyen",
    recommendedAction:
      "Ajouter l'avis dès réception et reporter son impact dans le suivi financier.",
    dueDate: "2026-09-30"
  },
  {
    id: "doc-annual-tax",
    propertyId: "appartement-ixelles",
    type: "document fiscal",
    title: "Documents fiscaux annuels",
    status: "à vérifier",
    section: "taxes",
    practicalUse:
      "Rassemble les éléments utiles pour préparer le dossier fiscal annuel du propriétaire.",
    riskLevel: "moyen",
    recommendedAction:
      "Préparer un dossier par année et valider les règles applicables avec une source officielle.",
    dueDate: "2027-04-30"
  },
  {
    id: "doc-invoice-boiler",
    propertyId: "appartement-ixelles",
    type: "facture",
    title: "Facture entretien chaudière 2025",
    status: "présent",
    section: "maintenance",
    practicalUse:
      "Conserve la preuve d'un entretien et aide à suivre l'historique technique du logement.",
    riskLevel: "faible",
    recommendedAction:
      "Classer avec les interventions liées et préparer le prochain justificatif.",
    uploadedAt: "2025-04-14",
    fileName: "facture-chaudiere-2025.pdf"
  },
  {
    id: "doc-boiler-2026",
    propertyId: "appartement-ixelles",
    type: "facture",
    title: "Attestation entretien chaudière 2026",
    status: "à vérifier",
    section: "maintenance",
    practicalUse:
      "Aide à suivre les obligations ou usages d'entretien applicables au logement.",
    riskLevel: "moyen",
    recommendedAction:
      "Demander l'attestation au prestataire et vérifier ce qui s'applique au bien.",
    dueDate: "2026-06-05"
  },
  {
    id: "doc-quote-plumber",
    propertyId: "appartement-ixelles",
    type: "devis",
    title: "Devis plomberie cuisine",
    status: "manquant",
    section: "maintenance",
    practicalUse:
      "Documente le coût prévu et garde une trace avant décision sur les travaux.",
    riskLevel: "moyen",
    recommendedAction:
      "Demander le devis final ou classer la facture si l'intervention est réalisée.",
    dueDate: "2026-06-20"
  },
  {
    id: "doc-tax-archive-2025",
    propertyId: "appartement-ixelles",
    type: "document fiscal",
    title: "Dossier fiscal propriétaire 2025",
    status: "présent",
    section: "archives",
    practicalUse:
      "Garde une trace annuelle des documents utiles au suivi financier et fiscal.",
    riskLevel: "faible",
    recommendedAction:
      "Conserver l'archive et compléter le dossier 2026 au fil de l'année.",
    uploadedAt: "2026-01-12",
    fileName: "dossier-fiscal-2025.zip"
  }
];

export const documentSections: Array<{
  id: Document["section"];
  title: string;
  description: string;
}> = [
  {
    id: "critical",
    title: "Obligatoire / critique",
    description:
      "Les pièces structurantes du bail et les points administratifs à surveiller en priorité."
  },
  {
    id: "review",
    title: "À vérifier",
    description:
      "Les éléments à confirmer selon la région, le type de bail et les documents disponibles."
  },
  {
    id: "taxes",
    title: "Fiscalité & taxes",
    description:
      "Les documents propriétaires à suivre annuellement pour garder une vision claire."
  },
  {
    id: "maintenance",
    title: "Travaux & entretien",
    description:
      "Les factures, devis et preuves utiles pour l'historique technique du logement."
  },
  {
    id: "archives",
    title: "Archives présentes",
    description:
      "Les documents déjà classés qui serviront de référence pour les périodes suivantes."
  }
];

export function getDocumentsBySection(section: Document["section"]): Document[] {
  return documents.filter((document) => document.section === section);
}

export function getDocumentComplianceSummary() {
  const presentCount = documents.filter(
    (document) => document.status === "présent"
  ).length;
  const missingCount = documents.filter(
    (document) =>
      document.status === "manquant" || document.status === "expiré"
  ).length;
  const criticalPointCount = documents.filter(
    (document) => document.riskLevel === "élevé" && document.status !== "présent"
  ).length;
  const nextDueDocument = documents
    .filter((document) => document.dueDate && document.status !== "présent")
    .sort((first, second) =>
      String(first.dueDate).localeCompare(String(second.dueDate))
    )[0];
  const completenessScore = Math.round((presentCount / documents.length) * 100);

  return {
    presentCount,
    missingCount,
    criticalPointCount,
    nextDueDocument,
    completenessScore
  };
}

export const reminders: Reminder[] = [
  {
    id: "reminder-registration",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    title: "Vérifier l'enregistrement du bail",
    description:
      "Préparer la preuve ou ajouter le document une fois disponible. ImmoClair ne valide pas la conformité juridique.",
    dueDate: "2026-06-15",
    priority: "haute",
    status: "à faire"
  },
  {
    id: "reminder-boiler",
    propertyId: "appartement-ixelles",
    title: "Planifier entretien chaudière",
    description:
      "Demander l'attestation au chauffagiste puis classer la facture dans les documents.",
    dueDate: "2026-06-05",
    priority: "urgente",
    status: "à faire"
  },
  {
    id: "reminder-indexation",
    propertyId: "appartement-ixelles",
    leaseId: "bail-ixelles-2025",
    title: "Simulation d'indexation annuelle",
    description:
      "Espace réservé pour une future simulation belge. Toute communication restera un brouillon à valider.",
    dueDate: "2026-09-01",
    priority: "moyenne",
    status: "à faire"
  }
];

export const investmentSimulations: InvestmentSimulation[] = [
  {
    id: "simulation-ixelles-simple",
    propertyId: "appartement-ixelles",
    monthlyRent: 980,
    monthlyCharges: 70,
    monthlyMortgage: 710,
    insuranceMonthlyEstimate: 34,
    propertyTaxMonthlyEstimate: 92,
    worksReserveMonthly: 80,
    estimatedMonthlyProfit: 154,
    estimatedGrossYieldPercent: 3.73,
    assumptions: [
      "Simulation indicative hors fiscalité détaillée.",
      "Charges locatives supposées équilibrées.",
      "Réserve travaux estimée, à ajuster avec les factures réelles."
    ]
  }
];

export function getActiveLease(propertyId: string): Lease | undefined {
  return leases.find(
    (lease) => lease.propertyId === propertyId && lease.status === "actif"
  );
}

export function getTenant(tenantId?: string): Tenant | undefined {
  if (!tenantId) {
    return undefined;
  }

  return tenants.find((tenant) => tenant.id === tenantId);
}

export function getProperty(propertyId: string): Property | undefined {
  return properties.find((property) => property.id === propertyId);
}

export function getPropertyBundle(propertyId: string) {
  const property = getProperty(propertyId);

  if (!property) {
    return undefined;
  }

  const activeLease = getActiveLease(property.id);
  const tenant = getTenant(activeLease?.tenantId);

  return {
    property,
    activeLease,
    tenant,
    documents: documents.filter((document) => document.propertyId === property.id),
    rentPayments: rentPayments.filter((payment) => payment.propertyId === property.id),
    reminders: reminders.filter((reminder) => reminder.propertyId === property.id),
    simulation: investmentSimulations.find(
      (simulation) => simulation.propertyId === property.id
    ),
    workOrders: workOrders.filter((workOrder) => workOrder.propertyId === property.id)
  };
}

export function getDashboardMetrics() {
  const paymentsForCurrentMonth = rentPayments.filter(
    (payment) => payment.month === currentMonth
  );
  const expectedRent = paymentsForCurrentMonth.reduce(
    (total, payment) => total + payment.expectedAmount,
    0
  );
  const receivedRent = paymentsForCurrentMonth.reduce(
    (total, payment) => total + payment.receivedAmount,
    0
  );
  const latePayments = rentPayments.filter(
    (payment) =>
      payment.status === "en retard" ||
      payment.status === "partiel" ||
      payment.status === "non payé"
  );
  const lateRent = latePayments.reduce(
    (total, payment) =>
      total + Math.max(payment.expectedAmount - payment.receivedAmount, 0),
    0
  );
  const openWorks = workOrders.filter((workOrder) => workOrder.status !== "terminé");
  const missingDocuments = documents.filter(
    (document) => document.status === "manquant" || document.status === "expiré"
  );
  const importantReminders = reminders.filter(
    (reminder) =>
      reminder.status === "à faire" &&
      (reminder.priority === "haute" || reminder.priority === "urgente")
  );
  const estimatedMonthlyProfit = investmentSimulations.reduce(
    (total, simulation) => total + simulation.estimatedMonthlyProfit,
    0
  );

  return {
    propertyCount: properties.length,
    expectedRent,
    receivedRent,
    lateRent,
    latePaymentCount: latePayments.length,
    openWorkCount: openWorks.length,
    missingDocumentCount: missingDocuments.length,
    importantReminderCount: importantReminders.length,
    estimatedMonthlyProfit
  };
}
