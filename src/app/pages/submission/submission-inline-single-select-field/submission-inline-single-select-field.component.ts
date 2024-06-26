import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormElementDto, FormElementSettingType, SubmissionFieldModel } from "../../../core/schemas";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { isArray, parseInt } from "lodash";

@Component({
    selector: 'app-submission-inline-single-select-field',
    styleUrl: 'submission-inline-single-select-field.component.scss',
    templateUrl: 'submission-inline-single-select-field.component.html'
})
export class SubmissionInlineSingleSelectFieldComponent implements BaseSubmissionFieldComponent {
    
    @Input()
    element!: FormElementDto;

    @Input()
    styleCssClass?: string;

    @Input()
    loading!: boolean;

    @Input()
    editable: boolean = true;

    @Input()
    get submissionValue() : string {
        return JSON.stringify(this.value);
    }

    set submissionValue(value: string | undefined) {
        if (value) {
            const optionIds = JSON.parse(value);
            if (isArray(optionIds)) {    
                this.value = optionIds[0];
            } else {
                this.value = parseInt(value);
            }
        }
    }

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined;
    }

    value?: number;
    
    @Output()
    elementEditted = new EventEmitter<SubmissionFieldModel>();
    
    onBlur() {
        this.elementEditted.emit({
            elementId: this.element.id,
            value: this.submissionValue
        });
    }
}