export const formatLargeMonetaryNumber: any = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(number);
};

export const formatLargeNonMonetaryNumber: any = (number: number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(number);
};

export const formatRatio = (ratio: number) => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};
