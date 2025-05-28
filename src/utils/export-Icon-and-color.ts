import { colors } from "../styles/colors";

export function exportIconAndColor(daysExpired: number) {
  if (daysExpired < 0) {
    return {
      title: `VENCIDO HÁ ${Math.abs(daysExpired)} DIAS`,
      icon: "trash",
      color: colors.danger["500"],
    };
  }

  if (daysExpired === 0) {
    return {
      title: "AGUARDANDO DATA",
      icon: "alert-circle",
      color: colors.neutral["800"],
    };
  }

  if (daysExpired > 0 && daysExpired <= 13) {
    return {
      title: `VENCE EM ${daysExpired} DIAS`,
      icon: "alert-circle",
      color: colors.warning["500"],
    };
  }

  if (daysExpired > 13) {
    return {
      title: `VENCE EM ${daysExpired} DIAS`,
      icon: "checkmark-circle",
      color: colors.success["500"],
    };
  }
}
