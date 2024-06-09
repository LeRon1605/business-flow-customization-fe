export interface UserBasicDto {
    id: string;
    userName: string;
    email: string;
    role: string;
}

export interface UserDto extends UserBasicDto {
    avatarUrl: string;
}

export interface UserInfo {
    id: string;
    fullName: string;
    roles: string[];
    avatarUrl: string;
    email: string;
    permissions: string[];
    tenantId: number;
    isTenantOwner: boolean;
    tenants: Tenant[];
    tenantUsers: BasicUserInfo[];
}

export interface Tenant {
    id: number;
    name: string;
    avatarUrl: string;
}

export interface UserUpdateDto {
    fullName: string;
    avatarUrl: string;
}

export interface BasicUserInfo {
    id: string;
    fullName: string;
    avatarUrl: string;
    email: string;
}
