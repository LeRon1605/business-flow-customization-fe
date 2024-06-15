import { NgModule } from "@angular/core";
import { SubmissionModule } from "../submission/submission.module";
import { PublicFormComponent } from "./public-form.component";
import { PublicFormRoutingModule } from "./public-form.routing";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        PublicFormComponent,
    ],
    imports: [
        CommonModule,
        PublicFormRoutingModule,
        SubmissionModule
    ]
})
export class PublicFormModule { }