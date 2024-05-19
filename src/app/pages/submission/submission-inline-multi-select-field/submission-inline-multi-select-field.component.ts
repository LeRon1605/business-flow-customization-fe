import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormElementDto, FormElementSettingType, SubmissionFieldModel } from "../../../core/schemas";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";

@Component({
    selector: 'app-submission-inline-multi-select-field',
    styleUrl: 'submission-inline-multi-select-field.component.scss',
    templateUrl: 'submission-inline-multi-select-field.component.html'
})
export class SubmissionInlineMultiSelectFieldComponent implements BaseSubmissionFieldComponent {

    @Input()
    element!: FormElementDto;

    @Input()
    styleCssClass?: string;

    @Input()
    loading!: boolean;

    @Input()
    get submissionValue() : string {
        return JSON.stringify(this.value);
    }

    set submissionValue(value: string | undefined) {
        if (value)
            this.value = JSON.parse(value);
    }

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined || this.value.length == 0;
    }

    value?: number[];
    
    @Output()
    elementEditted = new EventEmitter<SubmissionFieldModel>();
    
    onBlur() {
        this.elementEditted.emit({
            elementId: this.element.id,
            value: this.submissionValue
        });
    }
}