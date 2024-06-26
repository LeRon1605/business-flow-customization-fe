import { Component, Input } from "@angular/core";
import { FormElementDto, FormElementOptionDto, FormElementSettingType } from "../../../core/schemas";
import { FormBuilderService } from "../form-builder.service";
import { InputSwitchChangeEvent } from "primeng/inputswitch";

@Component({
    selector: 'app-form-element',
    styleUrl: 'form-element.component.scss',
    templateUrl: 'form-element.component.html'
})
export class FormElementComponent {

    @Input()
    element!: FormElementDto;

    @Input()
    editMode: boolean = true;

    @Input()
    editable!: boolean;

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

    get isValid() {
        return this.formBuilderService.isValid(this.element);
    }

    get errorMessages() {
        return this.formBuilderService.validate(this.element);
    }

    constructor(
        private formBuilderService: FormBuilderService
    ) { }

    onRemove() {
        this.formBuilderService.remove(this.element);
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