export const calculateDaysExpired = (expiryDate: string): number => {
  if (!expiryDate) return 0;

  const expiry = new Date(expiryDate);
  const today = new Date();

  // Zerando as horas para comparar apenas as datas
  expiry.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays; // Retorna negativo se já venceu, positivo se ainda vai vencer
};
