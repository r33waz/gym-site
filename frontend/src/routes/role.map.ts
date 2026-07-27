import { adminRoutePaths } from "@/core/private/Admin/admin.path";
import { gymRoutePath } from "@/core/private/Gym/gym.path";
import { memberRoutePath } from "@/core/private/memberShip/memberShip.path";
import { staffRoutePath } from "@/core/private/Staff/staff.path";
import { ROLEENUM } from "@/interface/enum/role.enum";

export const roleHomeMap: Record<ROLEENUM, string> = {
  [ROLEENUM.SUPER_ADMIN]: adminRoutePaths.adminDashboard,
  [ROLEENUM.GYM_OWNER]: gymRoutePath.gymDashboard,
  [ROLEENUM.STAFF]: staffRoutePath.staffDashboard,
  [ROLEENUM.MEMBER]: memberRoutePath.memberDashboard,
};
