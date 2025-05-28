export function formatToMillionBRL(value: number) {
  if (value > 1000000) {
    const truncatedValue = Math.floor(value / 1000000);
    return `R$ ${truncatedValue.toLocaleString()} M`;
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatToBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatCurrency(value: string): string {
  if (!value) return "0,00";
  const onlyNums = value?.replace(/[^0-9]/g, "");
  if (onlyNums === "") return "";
  const floatValue = Number.parseFloat(onlyNums) / 100;
  return floatValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
