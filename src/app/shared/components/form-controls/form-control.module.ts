import { NgModule } from "@angular/core";
import { TextInputComponent } from "./text-input/text-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DropDownInputComponent } from "./dropwdown-input/dropdown-input.component";
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [
        TextInputComponent,
        DropDownInputComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CommonModule,
        ButtonModule,
        SkeletonModule,
        DropdownModule
    ],
    exports: [
        TextInputComponent,
        DropDownInputComponent
    ]
})
export class ServeSyncFormControlModule { }