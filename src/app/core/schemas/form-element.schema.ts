export interface FormElementDto {
    id: number
    name: string
    description?: string
    type: number
    index: number
    settings: FormElementSettingDto[]
    options: FormElementOptionDto[]
}

export interface FormElementSettingDto {
    id: number
    type: FormElementSettingType
    value: string
}

export interface FormElementOptionDto {
    id: number
    name: string
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