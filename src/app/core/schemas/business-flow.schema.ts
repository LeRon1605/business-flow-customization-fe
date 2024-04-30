export interface BusinessFlowBlockDto {
    id: number;
    name: string;
    type: number;
}

export interface BusinessFlowBranchDto {
    id: number;
    fromBlockId: number;
    toBlockId: number;
    outCome: BusinessFlowOutComeDto;
}

export interface BusinessFlowOutComeDto {
    id: string;
    name: string;
    color: string;
}

export interface ValidateBusinessFlowDto {
    blocks: ValidateBusinessFlowBlockDto[];
    branches: ValidateBusinessFlowBranchDto[];
}

export interface ValidateBusinessFlowBlockDto {
    id: string;
    name: string;
    type: number;
    outComes: ValidateBusinessFlowOutComeDto[]
}

export interface ValidateBusinessFlowOutComeDto {
    id: string;
    name: string;
    color: string;
}

export interface ValidateBusinessFlowBranchDto {
    fromBlockId: string;
    toBlockId: string;
    outComeId: string;
}

export interface ValidateBusinessFlowResponseDto {
    id: string;
    errorMessages: string[];
}