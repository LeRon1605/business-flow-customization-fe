export interface FormElementDto {
    id: number;
    name: string;
    options?: FormElementOptionDto[];
}

export interface FormElementOptionDto {
    id: number;
    name: string;
    color: string;
}