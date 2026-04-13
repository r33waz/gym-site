# Gym Management System - Entity Descriptions and Relationships

All entities extend `BaseEntity` (provides `id`, `createdAt`, `updatedAt`). Relationships via TypeORM decorators (@ManyToOne, @OneToMany). Central: **User**, **Gym**.

## 1. User (`user.entity.ts`)
**Description**: User profile, auth, gyms, memberships, subscriptions.  
**Key Fields**: `username`, `first_name`, `last_name`.  
**Connections**:
| Entity | Type | Detail |
|--------|------|--------|
| Auth | 1:1 `@OneToOne` | `auth` |
| Gym | 1:N `@OneToMany` | `ownedGyms` (Gym.owner ←) |
| GymMember | 1:N `@OneToMany` | `gymMemberships` |
| UserMembership | 1:N `@OneToMany` | `subscriptions` |
| (Employee, Attendance, Payment, Sale, Leave) | N:1 foreign | via those entities |

## 2. Gym (`gym.entity.ts`)
**Description**: Gym business/location.  
**Key Fields**: `name`, `address`, `isActive`.  
**Connections**:
| Entity | Type | Detail |
|--------|------|--------|
| User | N:1 `@ManyToOne` | `owner` |
| GymMember | 1:N `@OneToMany` | `members` |
| MembershipPackage | 1:N `@OneToMany` | `packages` |
| Product | 1:N `@OneToMany` | `products` |
| (Attendance, Payment, Inventory, Employee, Sale, Leave, etc.) | N:1 foreign | via those |

## 3. Auth (`auth.entity.ts`)
**Description**: Credentials/login tracking.  
**Key Fields**: `email`, `password`, `login_attempts`.  
**Connections**: User 1:1 `@OneToOne` `user`.

## 4. GymMember (`gym-menber.entity.ts`)
**Description**: User-gym membership/role.  
**Key Fields**: `role`, `isActive`.  
**Connections**: User/Gym N:1.

## 5. UserMembership (`user-member-ship.entity.ts`)
**Description**: Package subscription.  
**Key Fields**: `startDate`, `endDate`.  
**Connections**: User/Gym/MembershipPackage N:1.

## 6. MembershipPackage (`membership-package.entity.ts`)
**Description**: Plans.  
**Key Fields**: `name`, `price`.  
**Connections**: Gym N:1; subscriptions 1:N UserMembership.

## 7. Attendance (`attendance.entity.ts`)
**Description**: Check-in/out.  
**Key Fields**: `checkIn`, `checkOut`.  
**Connections**: User/Gym/MembershipPackage N:1.

## 8. Payment (`payment.entity.ts`)
**Description**: Transactions.  
**Key Fields**: `amount`, `status` (enum).  
**Connections**: User/Gym N:1.

## 9. Product (`product.entity.ts`)
**Description**: Items.  
**Key Fields**: `name`, `price`.  
**Connections**: Gym N:1.

## 10. Sale (`sale.entity.ts`)
**Description**: Transaction.  
**Key Fields**: `totalAmount`.  
**Connections**: Gym/User N:1; items 1:N SaleItem.

## 11. SaleItem (`sale-item.entity.ts`)
**Description**: Line item.  
**Key Fields**: `quantity`, `price`.  
**Connections**: Sale/Product N:1.

## 12. Employee (`employees.entity.ts`)
**Description**: Staff.  
**Key Fields**: `position`, `salary`.  
**Connections**: User/Gym N:1.

## 13. Inventory (`inventory.entity.ts`)
**Description**: Stock.  
**Key Fields**: `quantity`.  
**Connections**: Product/Gym N:1.

## 14. Leave (`leave.entity.ts`)
**Description**: Requests.  
**Key Fields**: `reason`, `status`.  
**Connections**: User/Gym N:1.

## 15. PayRoll (`pay_roll.entity.ts`)
**Description**: Payroll base (empty).

## 16. Notification (`notification.entity.ts`)
**Description**: Notification base (empty).

**Notes**: Gym-scoped; User/Gym hubs.
