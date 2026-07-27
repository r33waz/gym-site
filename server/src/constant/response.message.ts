export const successMessage = {
  auth: {
    login: 'Login successful',
    logout: 'Logout successful',
    register: 'Registration successful',
  },

  user: {
    userCreate: 'User created successfully',
    userUpdate: 'User updated successfully',
    userDelete: 'User deleted successfully',
  },

  gym: {
    gymCreate: 'Gym created successfully',
    gymUpdate: 'Gym updated successfully',
    gymDelete: 'Gym deleted successfully',
    gymVerified: 'Gym verified successfully',
  },

  employee: {
    employeeCreate: 'Employee added successfully',
    employeeUpdate: 'Employee updated successfully',
    employeeDelete: 'Employee removed successfully',
  },

  membership: {
    membershipCreate: 'Membership created successfully',
    membershipUpdate: 'Membership updated successfully',
    membershipDelete: 'Membership removed successfully',
  },

  attendance: {
    attendanceMarked: 'Attendance marked successfully',
  },

  payment: {
    paymentSuccess: 'Payment processed successfully',
  },

  leave: {
    leaveRequested: 'Leave request submitted successfully',
    leaveApproved: 'Leave approved successfully',
    leaveRejected: 'Leave rejected successfully',
  },

  payroll: {
    payrollProcessed: 'Payroll processed successfully',
  },

  notification: {
    notificationSent: 'Notification sent successfully',
  },
};

export const errorMessage = {
  auth: {
    invalidCredentials: 'Invalid credentials',
    authFailed: 'Authentication failed',
    tokenExpired: 'Session expired, please login again',
  },

  user: {
    emailExist: 'Email already exists',
    usernameExist: 'Username already exists',
    userNotFound: 'User not found',
  },

  gym: {
    gymNotFound: 'Gym not found',
    gymAlreadyExist: 'Gym already exists',
    gymNotAuthorized: 'You are not authorized for this gym',
    gymNotActive: 'Gym is not active yet',
  },

  employee: {
    employeeNotFound: 'Employee not found',
    employeeAlreadyExists: 'Employee already exists',
    employeeNotAuthorized: 'Not authorized to manage employee',
  },

  membership: {
    membershipNotFound: 'Membership not found',
    alreadyMember: 'User is already a member',
    membershipDenied: 'Membership request denied',
  },

  attendance: {
    attendanceAlreadyMarked: 'Attendance already marked',
    attendanceNotFound: 'Attendance not found',
  },

  payment: {
    paymentFailed: 'Payment processing failed',
    paymentNotFound: 'Payment not found',
  },

  leave: {
    leaveDenied: 'Leave request denied',
    leaveNotFound: 'Leave request not found',
  },

  payroll: {
    payrollError: 'Error processing payroll',
  },

  notification: {
    notificationFailed: 'Failed to send notification',
  },

  validation: {
    validationError: 'Validation failed',
  },

  serverError: 'Internal server error',
  unauthorized: 'You are not authorized to perform this action',
};
