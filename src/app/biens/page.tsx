import { PropertyCard } from "@/components/properties/property-card";
import { ButtonLink } from "@/components/ui/button-link";
import { getActiveLease, getTenant, properties } from "@/data/mock-data";

export default function PropertiesPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Biens</p>
          <h2>Votre portefeuille immobilier</h2>
          <p>
            Une base simple pour centraliser adresses, loyers, baux, documents
            et alertes avant d'ajouter des modules plus avancés.
          </p>
        </div>
        <ButtonLink href="/biens/ajouter">Ajouter un bien</ButtonLink>
      </section>

      <section className="property-list">
        {properties.map((property) => {
          const activeLease = getActiveLease(property.id);
          const tenant = getTenant(activeLease?.tenantId);

          return (
            <PropertyCard
              activeLease={activeLease}
              key={property.id}
              property={property}
              tenant={tenant}
            />
          );
        })}
      </section>
    </div>
  );
}
