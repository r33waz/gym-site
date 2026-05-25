export enum HTTP_CODE {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum GYM_ROLE {
  OWNER = 'owner',
  ADMIN = 'admin',
  MANAGER = 'manager',
  TRAINER = 'trainer',
  MEMBER = 'member',
}

export enum SYSTEM_ROLE {
  SUPER_ADMIN = 'super_admin',
  USER = 'user',
}

// Leave Types
export enum LEAVE_TYPE {
  SICK = 'sick',
  VACATION = 'vacation',
  OTHER = 'other',
}

// Leave Status
export enum LEAVE_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Payment Status
export enum PAYMENT_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Payment Method
export enum PAYMENT_METHOD {
  CASH = 'cash',
  ONLINE = 'online',
  CARD = 'card',
}

// Payment Type
export enum PAYMENT_TYPE {
  MEMBERSHIP = 'membership',
  SALE = 'sale',
}

// Notification Type
export enum NOTIFICATION_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

// notification
export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}
