/**
 * ============================================================================
 * ALL ENUMS — FIELD SERVICE SAAS
 * ============================================================================
 * Single source of truth for every enum in the system.
 *
 * Naming convention:
 *   • TypeScript keys  : SCREAMING_SNAKE_CASE
 *   • String values    : SCREAMING_SNAKE_CASE
 *
 * Every enum here maps 1:1 to a PostgreSQL enum type.
 * The `enumName` + `schema` used in TypeORM entities MUST match exactly.
 * ============================================================================
 */

// ============================================================================
// AUTH SCHEMA
// ============================================================================

/**
 * Lifecycle of a user account (login identity).
 * PostgreSQL: auth.user_status
 */
export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

// ============================================================================
// APP SCHEMA — COMPANY & PEOPLE
// ============================================================================

/**
 * Lifecycle of a service company on the SaaS platform.
 * PostgreSQL: app.company_status
 */
export enum CompanyStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
}

/**
 * Lifecycle of an employee profile inside a company.
 * PostgreSQL: app.employee_status
 */
export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}

// ============================================================================
// APP SCHEMA — BOOKINGS & JOBS
// ============================================================================

/**
 * Customer-side appointment (pre-work) state.
 * PostgreSQL: app.booking_status
 */
export enum BookingStatus {
  REQUESTED = 'REQUESTED',
  QUOTED = 'QUOTED',
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

/**
 * Work-order (job) operational state.
 * PostgreSQL: app.job_status
 */
export enum JobStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  EN_ROUTE = 'EN_ROUTE',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

/**
 * Urgency level for bookings/jobs.
 * PostgreSQL: app.priority_level
 */
export enum PriorityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

/**
 * How often a booking repeats.
 * PostgreSQL: app.recurrence_type
 */
export enum RecurrenceType {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  CUSTOM = 'CUSTOM',
}

// ============================================================================
// APP SCHEMA — ATTENDANCE
// ============================================================================

/**
 * Daily attendance classification for an employee.
 * PostgreSQL: app.attendance_status
 */
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  HALF_DAY = 'HALF_DAY',
  LEAVE = 'LEAVE',
  HOLIDAY = 'HOLIDAY',
}

// ============================================================================
// APP SCHEMA — MONEY
// ============================================================================

/**
 * Invoice lifecycle.
 * PostgreSQL: app.invoice_status
 */
export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

/**
 * Payment transaction state.
 * PostgreSQL: app.payment_status
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

/**
 * Method used for a payment.
 * PostgreSQL: app.payment_method
 */
export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  ONLINE = 'ONLINE',
  WALLET = 'WALLET',
}

// ============================================================================
// APP SCHEMA — NOTIFICATIONS
// ============================================================================

/**
 * Notification category. Drives template and routing.
 * PostgreSQL: app.notification_type
 */
export enum NotificationType {
  BOOKING = 'BOOKING',
  JOB = 'JOB',
  PAYMENT = 'PAYMENT',
  SYSTEM = 'SYSTEM',
  REVIEW = 'REVIEW',
  REMINDER = 'REMINDER',
  MESSAGE = 'MESSAGE',
}

/**
 * Delivery channel for a notification.
 * PostgreSQL: app.notification_channel
 */
export enum NotificationChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  WHATSAPP = 'WHATSAPP',
}

// ============================================================================
// APP SCHEMA — REVIEWS
// ============================================================================

/**
 * Moderation state of a customer review.
 * PostgreSQL: app.review_status
 */
export enum ReviewStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
  FLAGGED = 'FLAGGED',
}

// ============================================================================
// APP SCHEMA — SAAS PLATFORM
// ============================================================================

/**
 * SaaS subscription lifecycle.
 * PostgreSQL: app.subscription_status
 */
export enum SubscriptionStatus {
  TRIALING = 'TRIALING',
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum PermissionAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

// ============================================================================
// ENUM HELPERS
// ============================================================================

export function enumValues<T extends Record<string, string>>(enumObj: T): string[] {
  return Object.values(enumObj);
}

export function isEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] {
  return typeof value === 'string' && Object.values(enumObj).includes(value);
}
