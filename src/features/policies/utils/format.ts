const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("en-AU", {
  currency: "AUD",
  maximumFractionDigits: 0,
  style: "currency",
});

export function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}
