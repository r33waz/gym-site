import { Entity } from "typeorm";
import { BaseEntity } from "../../../shared/baseEntity";

@Entity()
/**
 * Represents a notification message in the gym system.
 * Base structure for user notifications (fields to be extended as needed).
 *
 * Key Fields: (extend BaseEntity)
 *
 * Row Connections:
 * (Pending implementation; likely User/Gym)
 */
export class Notification extends BaseEntity {} // Base notification entity - extend with message, type, recipient fields
