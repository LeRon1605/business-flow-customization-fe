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

export interface CreateFormElementDto {
    name: string;
    description: string;
    type: FormElementType;
    index: number;
    settings: FormElementSettingDto[];
    options: FormElementOptionRequestDto[];
}

export interface FormElementSettingDto {
    type: FormElementSettingType;
    value: string;
} 

export interface FormElementOptionRequestDto {
    index: number;
    name: string;
}

export enum FormElementType {
    Text = 0,
    Number,
    Date,
    SingleOption,
    MultiOption,
    Attachment
}

export enum FormElementSettingType
{
    Required = 0
}