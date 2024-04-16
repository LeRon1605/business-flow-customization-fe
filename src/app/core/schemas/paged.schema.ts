export interface PagedResult<T> {
    data: T[];
    total: number;
    totalPages: number;
}

export interface PagedRequest {
    search?: string;
    sorting?: string;
    page?: number;
    size?: number;
}