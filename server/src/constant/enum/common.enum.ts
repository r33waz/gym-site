export enum HTTP_CODE {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum GYM_ROLE {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER',
}

export enum SYSTEM_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
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

export enum GYM_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

// Payment Status
export enum PAYMENT_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Payment Method
export enum PAYMENT_METHOD {
  CASH = 'cCASHash',
  ONLINE = 'ONLINE',
  CARD = 'CARD',
}

// Payment Type
export enum PAYMENT_TYPE {
  MEMBERSHIP = 'MEMBERSHIP',
  SALE = 'SALE',
}

// Notification Type
export enum NOTIFICATION_TYPE {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

// notification
export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}
