export const formatDate = (date: Date | /* string, p0: */ string): string => {
  if (!date) return "Sem data";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "Data inválida";
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
