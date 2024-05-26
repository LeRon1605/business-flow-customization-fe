import { FormElementDto } from "./form-element.schema";

export interface CreateFormRequestDto {
    name: string;
    coverImageUrl: string;
    elements: FormElementDto[];
}

export interface FormDto {
    id: number
    spaceId: number
    versionId: number
    name: string
    coverImageUrl: string
    versions: FormVersionDto[]
    elements: FormElementDto[]
    latestVersionId: number
}

export interface FormVersionDto {
    id: number
    createdAt: string
}