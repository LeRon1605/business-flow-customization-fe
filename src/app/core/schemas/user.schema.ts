export interface UserDto {
    id: string;
    username: string;
    email: string;
    avatar: string;
    gender: string;
    allowNotification: number;
    createdAt: Date;
    updatedAt: Date;
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