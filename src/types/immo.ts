export type BelgianRegion = "Bruxelles-Capitale" | "Wallonie" | "Flandre";

export type PropertyType =
  | "Appartement"
  | "Maison"
  | "Studio"
  | "Immeuble de rapport"
  | "Garage"
  | "Commerce";

export type EpcLabel = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "Inconnu";

export type LeaseStatus = "brouillon" | "actif" | "terminé" | "à renouveler";

export type RentPaymentStatus = "payé" | "partiel" | "en retard" | "non payé";

export type WorkOrderPriority = "basse" | "moyenne" | "haute" | "urgente";

export type WorkOrderStatus =
  | "ouvert"
  | "planifié"
  | "en cours"
  | "en attente"
  | "terminé";

export type WorkOrderResponsibility = "bailleur" | "locataire" | "à vérifier";

export type DocumentType =
  | "bail"
  | "état des lieux"
  | "PEB/EPC"
  | "preuve d'enregistrement"
  | "assurance"
  | "facture"
  | "devis"
  | "document fiscal";

export type DocumentStatus = "présent" | "manquant" | "expiré" | "à vérifier";

export type DocumentSection =
  | "critical"
  | "review"
  | "taxes"
  | "maintenance"
  | "archives";

export type DocumentRiskLevel = "faible" | "moyen" | "élevé";

export type ReminderPriority = "basse" | "moyenne" | "haute" | "urgente";

export type ReminderStatus = "à faire" | "fait" | "ignoré";

export type Address = {
  street: string;
  number: string;
  postalCode: string;
  municipality: string;
  region: BelgianRegion;
  country: "Belgique";
};

export type Property = {
  id: string;
  name: string;
  type: PropertyType;
  address: Address;
  cadastralIncome: number;
  epcLabel: EpcLabel;
  epcScore?: number;
  surfaceSqm: number;
  bedrooms: number;
  acquisitionPrice: number;
  monthlyCosts: number;
  currentLeaseId?: string;
  notes?: string;
};

export type Tenant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Lease = {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate?: string;
  monthlyRent: number;
  monthlyCharges: number;
  depositAmount: number;
  registered: boolean;
  status: LeaseStatus;
};

export type RentPayment = {
  id: string;
  propertyId: string;
  leaseId: string;
  tenantId: string;
  month: string;
  dueDate: string;
  expectedAmount: number;
  receivedAmount: number;
  status: RentPaymentStatus;
  paidAt?: string;
};

export type WorkOrder = {
  id: string;
  propertyId: string;
  title: string;
  problem: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  estimatedCost: number;
  actualCost?: number;
  likelyResponsible: WorkOrderResponsibility;
  openedAt: string;
  documentIds: string[];
};

export type Document = {
  id: string;
  propertyId: string;
  leaseId?: string;
  type: DocumentType;
  title: string;
  status: DocumentStatus;
  section: DocumentSection;
  practicalUse: string;
  riskLevel: DocumentRiskLevel;
  recommendedAction: string;
  critical?: boolean;
  uploadedAt?: string;
  dueDate?: string;
  fileName?: string;
};

export type Reminder = {
  id: string;
  propertyId: string;
  leaseId?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: ReminderPriority;
  status: ReminderStatus;
};

export type InvestmentSimulation = {
  id: string;
  propertyId: string;
  monthlyRent: number;
  monthlyCharges: number;
  monthlyMortgage: number;
  insuranceMonthlyEstimate: number;
  propertyTaxMonthlyEstimate: number;
  worksReserveMonthly: number;
  estimatedMonthlyProfit: number;
  estimatedGrossYieldPercent: number;
  assumptions: string[];
};

export type RentalDossierRegion = "Bruxelles" | "Wallonie" | "Flandre";

export type RentalDossierPropertyType =
  | "appartement"
  | "maison"
  | "kot"
  | "autre";

export type GuaranteeStatus = "oui" | "non" | "partielle";

export type LocalDocumentAnswer = "oui" | "non";

export type LocalDocumentReviewAnswer = "oui" | "non" | "a verifier";

export type UrgentWorkPriority = "faible" | "moyenne" | "urgente";

export type LocalRentalDossier = {
  id: string;
  createdAt: string;
  property: {
    name: string;
    address: string;
    municipality: string;
    region: RentalDossierRegion;
    type: RentalDossierPropertyType;
  };
  tenant: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  rent: {
    monthlyRent: number;
    monthlyCharges: number;
    dueDay: number;
    leaseStartDate: string;
    guaranteeAmount: number;
    guaranteeStatus: GuaranteeStatus;
  };
  documents: {
    signedLease: LocalDocumentAnswer;
    entryConditionReport: LocalDocumentAnswer;
    epcAvailable: LocalDocumentAnswer;
    leaseRegistered: LocalDocumentReviewAnswer;
    ownerFireInsurance: LocalDocumentReviewAnswer;
  };
  urgentWorks: {
    none: boolean;
    description?: string;
    priority: UrgentWorkPriority;
  };
};
