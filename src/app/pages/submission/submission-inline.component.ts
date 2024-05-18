import { Component, Input } from "@angular/core";
import { FormDto, SubmissionDto } from "../../core/schemas";

@Component({
    selector: 'app-submission-inline',
    templateUrl: 'submission-inline.component.html'
})
export class SubmissionInlineComponent {

    @Input()
    form!: FormDto;

    @Input()
    submission?: SubmissionDto;

    getValue(id: number) {
        const field = this.submission?.fields.find(x => x.elementId == id);
        if (field)
            return field.value;

        return undefined;
    }

}