/**
 * Converts a number to Nigerian Naira currency format.
 *
 * @param amount - The number to be converted.
 * @param includeCurrency - Whether to include the currency in the output.
 * @returns The converted amount in the desired format.
 */
export const convertNumberToNaira = (
  amount: number,
  includeCurrency = true
) => {
  if (includeCurrency) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  } else {
    return new Intl.NumberFormat('en-NG', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(amount);
  }
};



export function formatCurrency(amount: number, currency: 'NGN' | 'USD' = 'NGN'): string {
  const locale = currency === 'NGN' ? 'en-NG' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
