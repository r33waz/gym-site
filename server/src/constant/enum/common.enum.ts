/**
 * ============================================================================
 * ALL ENUMS — Field Service SaaS
 * ============================================================================
 * Single source of truth for every enum in the system.
 *
 * Naming convention:
 *   • TypeScript keys  : SCREAMING_SNAKE_CASE
 *   • String values    : lowercase_snake_case (matches PostgreSQL enums)
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
  PENDING = 'pending', // awaiting email/phone verification
  ACTIVE = 'active', // fully usable
  INACTIVE = 'inactive', // dormant or self-deactivated
  SUSPENDED = 'suspended', // blocked by admin
}

// ============================================================================
// APP SCHEMA — Company & People
// ============================================================================

/**
 * Lifecycle of a service company on the SaaS platform.
 * PostgreSQL: app.company_status
 */
export enum CompanyStatus {
  TRIAL = 'trial', // free trial
  ACTIVE = 'active', // paying customer
  SUSPENDED = 'suspended', // blocked, usually non-payment
  CANCELLED = 'cancelled', // no longer using the platform
}

/**
 * Lifecycle of an employee profile inside a company.
 * PostgreSQL: app.employee_status
 */
export enum EmployeeStatus {
  ACTIVE = 'active', // working, can receive jobs
  ON_LEAVE = 'on_leave', // temporary leave, no jobs
  INACTIVE = 'inactive', // not working but not terminated
  TERMINATED = 'terminated', // employment ended
}

// ============================================================================
// APP SCHEMA — Bookings & Jobs
// ============================================================================

/**
 * Customer-side appointment (pre-work) state.
 * PostgreSQL: app.booking_status
 */
export enum BookingStatus {
  REQUESTED = 'requested', // asked for service
  QUOTED = 'quoted', // waiting for quote acceptance
  SCHEDULED = 'scheduled', // confirmed date/time
  COMPLETED = 'completed', // work done
  CANCELLED = 'cancelled', // cancelled by either party
  NO_SHOW = 'no_show', // customer absent on arrival
}

/**
 * Work-order (job) operational state.
 * PostgreSQL: app.job_status
 */
export enum JobStatus {
  PENDING = 'pending', // created, not assigned
  ASSIGNED = 'assigned', // assigned to someone
  EN_ROUTE = 'en_route', // on the way
  IN_PROGRESS = 'in_progress', // on site
  PAUSED = 'paused', // temporarily stopped
  COMPLETED = 'completed', // done
  CANCELLED = 'cancelled', // cancelled
}

/**
 * Urgency level for bookings/jobs.
 * PostgreSQL: app.priority_level
 */
export enum PriorityLevel {
  LOW = 'low', // flexible timing
  MEDIUM = 'medium', // default
  HIGH = 'high', // today
  URGENT = 'urgent', // immediate
}

/**
 * How often a booking repeats.
 * PostgreSQL: app.recurrence_type
 */
export enum RecurrenceType {
  NONE = 'none', // one-off
  DAILY = 'daily', // every day
  WEEKLY = 'weekly', // once a week
  BIWEEKLY = 'biweekly', // every two weeks
  MONTHLY = 'monthly', // once a month
  CUSTOM = 'custom', // custom RRULE
}

// ============================================================================
// APP SCHEMA — Attendance
// ============================================================================

/**
 * Daily attendance classification for an employee.
 * PostgreSQL: app.attendance_status
 */
export enum AttendanceStatus {
  PRESENT = 'present', // worked full day
  ABSENT = 'absent', // did not show up
  LATE = 'late', // showed up after start
  HALF_DAY = 'half_day', // worked less than minimum
  LEAVE = 'leave', // approved leave
  HOLIDAY = 'holiday', // company holiday
}

// ============================================================================
// APP SCHEMA — Money
// ============================================================================

/**
 * Invoice lifecycle.
 * PostgreSQL: app.invoice_status
 */
export enum InvoiceStatus {
  DRAFT = 'draft', // not yet sent
  SENT = 'sent', // delivered, unpaid
  VIEWED = 'viewed', // customer opened it
  PARTIALLY_PAID = 'partially_paid', // some payment received
  PAID = 'paid', // fully settled
  OVERDUE = 'overdue', // past due
  CANCELLED = 'cancelled', // voided
}

/**
 * Payment transaction state.
 * PostgreSQL: app.payment_status
 */
export enum PaymentStatus {
  PENDING = 'pending', // awaiting confirmation
  SUCCEEDED = 'succeeded', // money received
  FAILED = 'failed', // declined / error
  REFUNDED = 'refunded', // money returned
}

/**
 * Method used for a payment.
 * PostgreSQL: app.payment_method
 */
export enum PaymentMethod {
  CASH = 'cash', // physical cash
  CARD = 'card', // credit/debit card
  BANK_TRANSFER = 'bank_transfer', // direct bank transfer
  ONLINE = 'online', // payment gateway
  WALLET = 'wallet', // digital wallet
}

// ============================================================================
// APP SCHEMA — Notifications
// ============================================================================

/**
 * Notification category. Drives template and routing.
 * PostgreSQL: app.notification_type
 */
export enum NotificationType {
  BOOKING = 'booking', // booking-related
  JOB = 'job', // job status changes
  PAYMENT = 'payment', // invoices and payments
  SYSTEM = 'system', // platform messages
  REVIEW = 'review', // review requests and replies
  REMINDER = 'reminder', // time-based reminders
  MESSAGE = 'message', // direct user-to-user
}

/**
 * Delivery channel for a notification.
 * PostgreSQL: app.notification_channel
 */
export enum NotificationChannel {
  IN_APP = 'in_app', // bell icon in the app
  EMAIL = 'email', // email
  SMS = 'sms', // text message
  PUSH = 'push', // mobile push
  WHATSAPP = 'whatsapp', // WhatsApp
}

// ============================================================================
// APP SCHEMA — Reviews
// ============================================================================

/**
 * Moderation state of a customer review.
 * PostgreSQL: app.review_status
 */
export enum ReviewStatus {
  PENDING = 'pending', // awaiting moderation
  PUBLISHED = 'published', // visible
  HIDDEN = 'hidden', // hidden by admin
  FLAGGED = 'flagged', // reported, under review
}

// ============================================================================
// APP SCHEMA — SaaS Platform
// ============================================================================

/**
 * SaaS subscription lifecycle.
 * PostgreSQL: app.subscription_status
 */
export enum SubscriptionStatus {
  TRIALING = 'trialing', // free trial
  ACTIVE = 'active', // paid, current
  PAST_DUE = 'past_due', // payment failed, grace period
  CANCELLED = 'cancelled', // cancelled, still has access
  EXPIRED = 'expired', // access ended
}


export function enumValues<T extends Record<string, string>>(enumObj: T): string[] {
  return Object.values(enumObj);
}


export function isEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] {
  return typeof value === 'string' && Object.values(enumObj).includes(value);
}
