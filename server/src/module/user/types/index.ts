import { UserStatus } from "../../../constant/enum/common.enum";

export interface UserFilter {
  search?: string;
  status?: UserStatus;
  page: number;
  limit: number;
}
