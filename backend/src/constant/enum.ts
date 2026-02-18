export enum HTTP_CODE {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum USER_ROLE {
  SUPER_ADMIN = "super_admin",
  GYM_ADMIN = "gym_admin",
  GYM_STAFF = "gym_staff",
  MANAGER = "manager",
  TRAINER = "trainer",
  USER = "user",
}

// Leave Types
export enum LEAVE_TYPE {
  SICK = "sick",
  VACATION = "vacation",
  OTHER = "other",
}

// Leave Status
export enum LEAVE_STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Payment Status
export enum PAYMENT_STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Payment Method
export enum PAYMENT_METHOD {
  CASH = "cash",
  ONLINE = "online",
}

// Payment Type
export enum PAYMENT_TYPE {
  SUBSCRIPTION = "subscription",
  ONE_TIME = "one_time",
}

// Notification Type
export enum NOTIFICATION_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

// notification
export enum NotificationStatus {
  UNREAD = "UNREAD",
  READ = "READ",
}
