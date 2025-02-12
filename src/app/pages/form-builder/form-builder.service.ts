import { Injectable } from "@angular/core";
import { FormElementDto, FormElementType } from "../../core/schemas";
import { FormApiService } from "../../core/apis/form.api";

@Injectable()
export class FormBuilderService {

    draggedElementType?: FormElementType;
    draggedElement?: FormElementDto;
    elements: FormElementDto[] = [];

    get valid() {
        return this.elements.every(x => this.isValid(x)) && this.elements.length > 0;
    }

    get data() {
        this.elements.forEach((item, index) => item.index = index);
        return this.elements;
    }

    constructor(
        private formApiService: FormApiService
    ) { }

    load(elements: FormElementDto[]) {
        this.elements = elements;
    }

    dragOnAdd(type: FormElementType) {
        this.draggedElementType = type;
    }

    dragOnSwap(draggedElement: FormElementDto) {
        this.draggedElement = draggedElement;
    }
    
    insert(type: FormElementType, index: number) {
        const element = this.getElement(type, index);
        this.elements.splice(index, 0, element);
    }

    swap(element: FormElementDto, index: number) {
        this.elements.splice(this.elements.indexOf(element), 1);
        this.elements.splice(index, 0, element);
    }

    pushElement(type: FormElementType) {
        const element = this.getElement(type, this.elements.length > 0 ? this.elements.at(-1)!.index + 1 : 1);
        this.elements.push(element);
    }

    remove(element: FormElementDto) {
        this.elements.splice(this.elements.indexOf(element), 1);
    }

    getElement(type: FormElementType, index: number) {
        return {
            id: 0,
            name: this.getName(type),
            index: index,
            type: type,
            description: 'Mô tả trường thông tin',
            settings: [],
            options: []
        };
    }

    getName(type: FormElementType) {
        switch (type) {
            case FormElementType.Text:
                return 'Trường thông tin văn bản';

            case FormElementType.Number:
                return 'Trường thông tin số';

            case FormElementType.Attachment:
                return 'Trường thông tin tài liệu';

            case FormElementType.Date:
                return 'Trường thông tin ngày';

            case FormElementType.MultiOption:
                return 'Trường thông tin nhiều lựa chọn';

            case FormElementType.SingleOption:
                return 'Trường thông tin một lựa chọn';
        }

        return '';
    }

    isValid(element: FormElementDto) {
        return this.validate(element).length == 0;
    }

    validate(element: FormElementDto) {
        const errorMessages = [];
        if (element.name == '') {
            errorMessages.push('Tên trường thông tin không được để trống');
        }

        if (element.type == FormElementType.MultiOption || element.type == FormElementType.SingleOption) {
            if (element.options?.length <= 0) {
                errorMessages.push('Trường thông tin lựa chọn yêu cầu ít nhất một lựa chọn');
            } else {
                const isHasEmptyOption = element.options.some(x => x.name == '');
                if (isHasEmptyOption) {
                    errorMessages.push('Lựa chọn không được để trống');
                }

                const isHasDuplicate = element.options.some((item, index) => item.name != '' && element.options.findIndex(i => i.name == item.name) != index);
                if (isHasDuplicate) {
                    errorMessages.push('Lựa chọn không được trùng nhau');
                }
            }
        }

        return errorMessages;
    }
}