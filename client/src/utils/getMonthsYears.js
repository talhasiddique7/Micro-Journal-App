export const getMonthYearOptions = (entries) => {
  const months = new Set();
  const years = new Set();

  entries.forEach((entry) => {
    const date = new Date(entry.date);
    months.add(date.toLocaleString('default', { month: 'long' }));
    years.add(date.getFullYear());
  });

  return {
    months: Array.from(months),
    years: Array.from(years),
  };
};
