import { CreateFormElementDto } from "./form-element.schema";

export interface CreateFormRequestDto {
    name: string;
    coverImageUrl: string;
    elements: CreateFormElementDto[];
}