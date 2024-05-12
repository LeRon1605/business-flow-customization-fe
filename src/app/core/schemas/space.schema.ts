import { BusinessFlowDto } from "./business-flow.schema";
import { CreateFormRequestDto } from "./form.schema";

export interface SpaceDto {
    id: number;
    name: string;
    color: string;
}

export interface SpaceDetailDto extends SpaceDto {
    description: string;
    latestPublishedBusinessFlowId: number;
}

export interface CreateSpaceDto {
    name: string;
    color: string;
    description: string;
    businessFlow: BusinessFlowDto;
    form: CreateFormRequestDto;
}