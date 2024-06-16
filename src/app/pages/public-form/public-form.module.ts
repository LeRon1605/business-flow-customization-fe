import { NgModule } from "@angular/core";
import { SubmissionModule } from "../submission/submission.module";
import { PublicFormComponent } from "./public-form.component";
import { PublicFormRoutingModule } from "./public-form.routing";
import { CommonModule } from "@angular/common";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { PublicFormTrackingComponent } from "./public-form-tracking/public-form-tracking.component";

@NgModule({
    declarations: [
        PublicFormComponent,
        PublicFormTrackingComponent
    ],
    imports: [
        CommonModule,
        PublicFormRoutingModule,
        SubmissionModule,
        ProgressSpinnerModule,
        ServeSyncCommonModule
    ]
})
export class PublicFormModule { }