import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, fullAddress } from "@/utils/formatters";
import type { Lease, Property, Tenant } from "@/types/immo";

type PropertyCardProps = {
  property: Property;
  activeLease?: Lease;
  tenant?: Tenant;
};

export function PropertyCard({
  property,
  activeLease,
  tenant
}: PropertyCardProps) {
  return (
    <article className="property-card">
      <div>
        <p className="eyebrow">{property.type}</p>
        <h2>
          <Link href={`/biens/${property.id}`}>{property.name}</Link>
        </h2>
        <p className="muted">{fullAddress(property.address)}</p>
      </div>

      <div className="property-card-grid">
        <span>
          <small>Loyer actuel</small>
          <strong>
            {activeLease
              ? formatCurrency(activeLease.monthlyRent + activeLease.monthlyCharges)
              : "Non loué"}
          </strong>
        </span>
        <span>
          <small>Locataire</small>
          <strong>
            {tenant ? `${tenant.firstName} ${tenant.lastName}` : "Aucun"}
          </strong>
        </span>
        <span>
          <small>PEB/EPC</small>
          <strong>{property.epcLabel}</strong>
        </span>
      </div>

      <div className="property-card-footer">
        <StatusBadge tone={activeLease ? "success" : "warning"}>
          {activeLease ? "Bail actif" : "A compléter"}
        </StatusBadge>
        <Link className="text-link" href={`/biens/${property.id}`}>
          Voir le détail
        </Link>
      </div>
    </article>
  );
}
