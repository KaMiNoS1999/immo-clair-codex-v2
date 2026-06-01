import { RentalDossierForm } from "@/components/properties/rental-dossier-form";

export default function AddPropertyPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Dossier locatif</p>
          <h2>Ajouter un dossier locatif</h2>
          <p>
            Encodez le bien, le locataire, le loyer et les premiers documents
            utiles. Les données sont enregistrées uniquement sur cet appareil.
          </p>
        </div>
      </section>

      <RentalDossierForm />
    </div>
  );
}
