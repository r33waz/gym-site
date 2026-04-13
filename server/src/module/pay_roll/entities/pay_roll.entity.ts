import { Entity } from "typeorm";
import { BaseEntity } from "../../../shared/baseEntity";

@Entity()
/**
 * Represents payroll records for gym employees.
 * Base structure for salary, deductions, and payment details (fields to be extended).
 *
 * Key Fields: (extend BaseEntity)
 *
 * Row Connections:
 * (Pending implementation; likely Employee/User/Gym)
 */
export class PayRoll extends BaseEntity {} // Base payroll entity - extend with salary, bonus, deductions for employees
