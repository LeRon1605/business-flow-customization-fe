import { Component, Input } from "@angular/core";
import { MenuItem, PrimeIcons } from "primeng/api";
import { FormDto, SubmissionDto } from "../../../core/schemas";

@Component({
    selector: 'app-space-record-business-flow',
    styleUrl: 'space-record-business-flow.component.scss',
    templateUrl: 'space-record-business-flow.component.html'
})
export class SpaceRecordBusinessFlowComponent {

    @Input()
    form!: FormDto;

    @Input()
    submission!: SubmissionDto;

    items: MenuItem[] = [
        {
            label: 'Chọn kết quả đầu ra',
            items: [
                {
                    label: 'Đạt',
                },
                {
                    label: 'Không đạt'
                }
            ]
        }
    ];
    
}