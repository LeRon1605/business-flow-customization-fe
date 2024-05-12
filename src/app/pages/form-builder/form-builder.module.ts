import { NgModule } from "@angular/core";
import { FormBuilderComponent } from "./form-builder.component";
import { FormElementSelectorComponent } from "./form-element-selector/form-element-selector.component";
import { FormComponent } from "./form/form.component";
import { CommonModule } from "@angular/common";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { FormElementComponent } from "./form-element/form-element.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [
        FormComponent,
        FormElementSelectorComponent,
        FormBuilderComponent,
        FormElementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ServeSyncFormControlModule,
        InputTextModule,
        DragDropModule,
        InputSwitchModule,
        TooltipModule
    ],
    exports: [
        FormBuilderComponent
    ]
})
export class FormBuilderModule {

}