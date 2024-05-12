import { Component, Input } from "@angular/core";
import { CreateFormElementDto, FormElementOptionRequestDto, FormElementSettingType } from "../../../core/schemas";
import { FormBuilderService } from "../form-builder.service";
import { InputSwitchChangeEvent } from "primeng/inputswitch";

@Component({
    selector: 'app-form-element',
    styleUrl: 'form-element.component.scss',
    templateUrl: 'form-element.component.html'
})
export class FormElementComponent {

    @Input()
    element!: CreateFormElementDto;

    @Input()
    editMode: boolean = true;

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) === true);
    }

    set isRequired(value: boolean) {
        let setting = this.element.settings.find(x => x.type == FormElementSettingType.Required);
        if (!setting) {
            setting = {
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

    onToggleRequired(value: InputSwitchChangeEvent) {
        console.log(value);
    }

    onRemove() {
        this.formBuilderService.remove(this.element);
    }

    onAddOption() {
        this.element.options.push({
            name: '',
            index: this.element.options.length + 1
        })
    }

    onRemoveOption(option: FormElementOptionRequestDto) {
        this.element.options.splice(this.element.options.indexOf(option), 1);
    }
}