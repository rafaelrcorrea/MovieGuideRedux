export const ConvertToDate = value => {
  try {
    const date = new Date(value);
  return date.getFullYear() || '';
  } catch {
    return '';
  }
};