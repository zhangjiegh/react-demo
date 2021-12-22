export type Access = "super_admin"|"admin"

export type User = {
    name:Access,
    user_id:string,
    access:Access[],
    token:string,
    avatar:string
}
export type UserGroup = {
    [key:string]:User
}