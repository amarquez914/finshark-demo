export const formatISODate: any = (date: Date) => {
  return date.toISOString().split('T')[0];
};
