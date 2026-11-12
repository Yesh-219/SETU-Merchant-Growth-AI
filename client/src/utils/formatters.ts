/**
 * Indian Rupee (INR) currency formatter
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format numbers with Indian lakh/crore commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format date string to readable format (e.g. 12 Nov 2026)
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};

/**
 * Format percentage
 */
export const formatPercent = (val: number): string => {
  return `${val >= 0 ? '+' : ''}${val.toFixed(1)}%`;
};

