import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormElementDto, FormElementOptionDto, FormElementSettingType, FormElementType } from "../../../core/schemas";
import { FormBuilderService } from "../form-builder.service";
import { ToastService } from "../../../core/services";

@Component({
    selector: 'app-form-builder-dialog',
    providers: [
        FormBuilderService
    ],
    templateUrl: 'form-builder-dialog.component.html'
})
export class FormBuilderDialogComponent {

    @Input()
    element: FormElementDto = {
        id: 0,
        name: '',
        description: '',
        type: FormElementType.Text,
        index: 0,
        settings: [],
        options: []
    };

    @Output()
    saveElement: EventEmitter<FormElementDto> = new EventEmitter<FormElementDto>();

    @Output()
    deleteElement: EventEmitter<boolean> = new EventEmitter<boolean>();

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) === true);
    }

    set isRequired(value: boolean) {
        let setting = this.element.settings.find(x => x.type == FormElementSettingType.Required);
        if (!setting) {
            setting = {
                id: 0,
                type: FormElementSettingType.Required,
                value: JSON.stringify(value)
            };

            this.element.settings.push(setting);
        }

        setting.value = JSON.stringify(value);
    }

    types = [
        { name: 'Văn bản', type: FormElementType.Text },
        { name: 'Số', type: FormElementType.Number },
        { name: 'Ngày', type: FormElementType.Date },
        { name: 'Một lựa chọn', type: FormElementType.SingleOption },
        { name: 'Nhiều lựa chọn', type: FormElementType.MultiOption },
        { name: 'Tệp đính kèm', type: FormElementType.Attachment },
    ];

    constructor(
        private formBuilderService: FormBuilderService,
        private toastService: ToastService
    ) { }

    onSaveElement() {
        const errorMessages = this.formBuilderService.validate(this.element);
        if (errorMessages.length > 0) {
            this.toastService.error(errorMessages[0]);
            return;
        }
        
        this.saveElement.emit(this.element);
    }

    onDeleteElement() {
        this.deleteElement.emit(true);
    }

    onAddOption() {
        this.element.options.push({
            id: 0,
            name: ''
        })
    }

    onRemoveOption(option: FormElementOptionDto) {
        this.element.options.splice(this.element.options.indexOf(option), 1);
    }
}