export enum UserRole {
    OWNER = "owner",
    ADMIN = "admin",
    USER = "user"
}

export const RoleNames: { [key in string]: UserRole } = {
    ['owner']:UserRole.OWNER,
    ['admin']: UserRole.ADMIN,
    ['user']: UserRole.USER
  };