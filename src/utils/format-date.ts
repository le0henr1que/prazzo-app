export const formatDate = (date: Date, p0: string): string => {
  if (!date) return "Sem data";
  const day = date?.getDate()?.toString()?.padStart(2, "0");
  const month = (date?.getMonth() + 1)?.toString()?.padStart(2, "0");
  const year = date?.getFullYear();
  return `${day}/${month}/${year}`;
};
