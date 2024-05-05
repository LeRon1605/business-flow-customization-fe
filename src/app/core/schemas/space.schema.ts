import { BusinessFlowDto } from "./business-flow.schema";

export interface SpaceDto {
    id: number;
    name: string;
    color: string;
}

export interface SpaceDetailDto extends SpaceDto {
    description: string;
}

export interface CreateSpaceDto {
    name: string;
    color: string;
    description: string;
    businessFlow: BusinessFlowDto;
}