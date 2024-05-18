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
}

export interface SubmissionDto {
    id: number;
    name: string;
    formVersionId: number;
    fields: SubmissionFieldModel[];
    createdBy: number;
    createdAt: string;
    updatedBy: number;
    updatedAt: string;
}