export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDate(value?: string): string {
  if (!value) {
    return "Non renseigné";
  }

  return new Intl.DateTimeFormat("fr-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function formatMonth(value: string): string {
  return new Intl.DateTimeFormat("fr-BE", {
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}-01T00:00:00`));
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}

export function fullAddress(address: {
  street: string;
  number: string;
  postalCode: string;
  municipality: string;
  country: string;
}): string {
  return `${address.street} ${address.number}, ${address.postalCode} ${address.municipality}, ${address.country}`;
}
