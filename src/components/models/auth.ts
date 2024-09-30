export type RoleEnum = "ROLE_ADMIN" | "ROLE_CLIENT";

export type CredentialsDTO = {
    username : string;
    password:string;
};

export type AcessTokenPayloadDTO = {
    exp:number,
    user_name:string,
    authorities: RoleEnum[];
};