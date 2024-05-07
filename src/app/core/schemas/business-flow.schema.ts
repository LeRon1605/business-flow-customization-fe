export interface BusinessFlowDto {
    blocks: BusinessFlowBlockDto[];
    branches: BusinessFlowBranchDto[];
}

export interface BusinessFlowBlockDto {
    id: string;
    name: string;
    type: number;
    outComes?: BusinessFlowOutComeDto[]
}

export interface BusinessFlowOutComeDto {
    id: string;
    name: string;
    color: string;
}

export interface BusinessFlowBranchDto {
    fromBlockId: string;
    toBlockId: string;
    outComeId?: string;
    outCome?: BusinessFlowOutComeDto;
}

export interface ValidateBusinessFlowResponseDto {
    id: string;
    errorMessages: string[];
}

export interface BusinessFlowVersionDto {
    id: string;
    createdAt: string;
}

export interface BusinessFlowVersionDetailDto extends BusinessFlowVersionDto {
    blocks: BusinessFlowBlockDto[];
    branches: BusinessFlowBranchDto[];
}