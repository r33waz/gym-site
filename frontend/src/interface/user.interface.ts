export const USER_ROLE = {
  SUPERADMIN: "super_admin",
  GYMADMIN: "gym_admin",
  GYNSTAFF: "gym_staff",
  USER: "user",
};

export type USER_ROLE = (typeof USER_ROLE)[keyof typeof USER_ROLE];
