import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormDto, SubmissionDto, SubmissionFieldModel } from "../../core/schemas";

@Component({
    selector: 'app-submission-inline',
    templateUrl: 'submission-inline.component.html'
})
export class SubmissionInlineComponent {

    @Output()
    elementEditted = new EventEmitter<SubmissionFieldModel>();

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

    onElementEditted(value: SubmissionFieldModel) {
        this.elementEditted.emit(value);
    }
}