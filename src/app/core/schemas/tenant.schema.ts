import { RoleDto } from "./role.schema";

export interface TenantDetailDto {
    id: number;
    name: string;
    avatarUrl: string;
    numberOfStaff: number;
    createdAt: string;
}

export interface UpdateTenantDto {
    name: string;
    avatarUrl: string;
}

export interface TenantInvitationDto {
    id: number;
    email: string;
    status: TenantInvitationStatus;
    role: RoleDto;
    createdAt: string;
}

export interface TenantInvitationCreateDto {
    email: string;
    roleId: string;
}

export enum TenantInvitationStatus {
    Pending,
    Accepted,
    Rejected
};

export const TenantInvitationStatusStr : { [ key: number ] : string  } = {
    0: 'Đang chờ',
    1: 'Đã chấp nhận',
    2: 'Đã từ chối'
};