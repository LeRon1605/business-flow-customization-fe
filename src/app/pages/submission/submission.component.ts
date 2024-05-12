import { Component, QueryList, ViewChildren } from "@angular/core";
import { FormElementDto } from "../../core/schemas/form-element.schema";
import { BaseSubmissionFieldComponent } from "./base-submission-field.component";

@Component({
    selector: 'app-submission',
    templateUrl: 'submission.component.html'
})
export class SubmissionComponent {

    @ViewChildren('field')
    fields!: QueryList<BaseSubmissionFieldComponent>;

    elements : FormElementDto[] = [
        // {
        //     id: 1,
        //     name: 'Field văn bản'
        // },
        // {
        //     id: 2,
        //     name: 'Field số'
        // },
        // {
        //     id: 3,
        //     name: 'Field tệp'
        // },
        // {
        //     id: 4,
        //     name: 'Field lựa chọn 1',
        //     options: [
        //         {
        //             id: 1,
        //             name: 'LC 1',
        //             color: 'red'
        //         }
        //     ]
        // },
        // {
        //     id: 5,
        //     name: 'Field lựa chọn nhiều',
        //     options: [
        //         {
        //             id: 1,
        //             name: 'LC 1'
        //         },
        //         {
        //             id: 2,
        //             name: 'LC 2'
        //         },
        //         {
        //             id: 3,
        //             name: 'LC 3'
        //         }
        //     ]
        // }
    ]

    onSubmit() {
        for (const field of this.fields) {
            console.log(field.submissionValue);
        }
    }
}