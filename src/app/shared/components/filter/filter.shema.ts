export interface FilterField {
    id: string;
    name: string;
    type: string;
    data: FilterData[];
    selectedValue?: FilterData;
}

export interface FilterData {
    text: any;
    value: any;
}

export interface ActiveFilter {
    field: FilterField;
    selectedValue: FilterData;
}