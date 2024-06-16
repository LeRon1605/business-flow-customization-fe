import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas";
import { isEmpty } from "lodash";

@Component({
    selector: 'app-submission-date-field',
    templateUrl: 'submission-date-field.component.html'
})
export class SubmissionDateFieldComponent implements BaseSubmissionFieldComponent {
    
    @Input()
    element!: FormElementDto;

    @Input()
    styleCssClass?: string;

    @Input()
    editable: boolean = true;

    @Input()
    get submissionValue() : string {
        return JSON.stringify(this.value);
    }

    set submissionValue(value: string | undefined) {
        if (value != undefined && value != null && value != 'null') {
            this.value = new Date(JSON.parse(value));
        } else {
            this.value = undefined;
        }

        console.log(this.value);
    }

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined;
    }

    value?: Date;
    loading = false;
    
}