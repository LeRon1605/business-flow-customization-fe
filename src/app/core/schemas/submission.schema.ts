import { BusinessFlowOutComeDto } from "./business-flow.schema";

export interface SubmissionModel {
    name: string;
    formVersionId: number;
    fields: SubmissionFieldModel[];
}

export interface SubmissionFieldModel {
    elementId: number;
    value: string;
}

export interface SubmissionAttachmentFieldValueDto {
    name: string;
    fileUrl: string;
}

export interface SubmissionFilterRequestDto {
    page: number;
    size: number;
    spaceId: number;
    formVersionId: number;
    search?: string;
    filters: RecordFilterField[]
}

export interface SubmissionDto {
    id: number;
    name: string;
    formVersionId: number;
    fields: SubmissionFieldModel[];
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export interface SubmissionExecutionBusinessFlowDto {
    id: number;
    status: SubmissionExecutionStatus
    completedBy: string
    completedAt: string
    outCome: BusinessFlowOutComeDto
    businessFlowBlock: SubmissionExecutionBusinessFlowBlock
    tasks: SubmissionExecutionTaskDto[]
    personInChargeIds: string[]
}

export interface BasicBusinessFlowBlockDto {
    id: string
    name: string
    type: number
}

export interface SubmissionExecutionBusinessFlowBlock extends BasicBusinessFlowBlockDto {
    formId?: number;
    outComes: SubmissionExecutionBusinessFlowOutComeDto[]
}

export interface SubmissionExecutionBusinessFlowOutComeDto {
    outCome: BusinessFlowOutComeDto;
    toBlock: BasicBusinessFlowBlockDto | null;
}

export interface SubmissionExecutionTaskDto {
    id: number
    status: SubmissionExecutionTaskStatus
    name: string
    index: number
}

export enum SubmissionExecutionStatus {
    InProgress,
    Completed
}

export enum SubmissionExecutionTaskStatus {
    Pending,
    Done
}

export interface RecordFilterField {
    type: RecordFilterFieldType;
    value: string;
}

export interface RecordElementFilterField {
    elementId: number;
    value: string;
}

export enum RecordFilterFieldType {
    RecordElement
}

export enum RecordDateFieldFilter {
    Today,
    ThisWeek,
    ThisMonth,
    ThisYear
}

export interface RecordDateElementFilterValue {
    from: string;
    to: string;
}