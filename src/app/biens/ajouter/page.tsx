import { PropertyForm } from "@/components/properties/property-form";

export default function AddPropertyPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Nouveau bien</p>
          <h2>Ajouter un bien en brouillon</h2>
          <p>
            Le formulaire prépare la future création d'un bien. Pour ce MVP,
            aucune donnée n'est encore enregistrée côté serveur.
          </p>
        </div>
      </section>

      <PropertyForm />

      <section className="ai-panel">
        <p className="eyebrow">Copilote</p>
        <h3>Analyse IA bientôt disponible</h3>
        <p>
          Plus tard, ImmoClair pourra suggérer les documents à demander, les
          champs à vérifier et les rappels à créer à partir du profil du bien.
        </p>
      </section>
    </div>
  );
}
