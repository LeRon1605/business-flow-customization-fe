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

export interface UpdateSpaceBasicInfoDto {
    id: number;
    name: string;
    color: string;
    description: string;
}

export interface SpaceRoleDto 
{
    id: number;
    name: string;
}

export interface MemberInSpaceDto {
    id: string;
    role: SpaceRoleDto;
}

export interface MemberDto {
    id: string;
    fullName: string;
    email: string;
    role: string;
}

export enum SpaceRole
{
    Manager = 1,
    Editor = 2,
    Viewer = 3
}