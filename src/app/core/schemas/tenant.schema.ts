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