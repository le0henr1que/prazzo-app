export enum NotificationTimeEnum {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  HALF_MONTHLY = "HALF_MONTHLY",
  THIRTY_MONTHLY = "THIRTY_MONTHLY",
  FORTY_FIVE_DAYS = "FORTY_FIVE_DAYS",
}

export const labelNotificationTimeEnum = {
  [NotificationTimeEnum.DAILY]: "Diariamente",
  [NotificationTimeEnum.WEEKLY]: "A cada 7 dias",
  [NotificationTimeEnum.MONTHLY]: "A cada 30 dias",
  [NotificationTimeEnum.HALF_MONTHLY]: "A cada 15 dias",
  [NotificationTimeEnum.FORTY_FIVE_DAYS]: "A cada 45 dias",
  [NotificationTimeEnum.THIRTY_MONTHLY]: "A cada 90 dias",
};
