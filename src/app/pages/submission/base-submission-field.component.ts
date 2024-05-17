import { isEmpty } from "lodash";
import { FormElementDto } from "../../core/schemas";

export interface BaseSubmissionFieldComponent {
    submissionValue: string;
    element: FormElementDto;
    isRequired: boolean;
    isEmpty: boolean;
}