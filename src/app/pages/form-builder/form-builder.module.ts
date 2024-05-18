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
import { FormBuilderDialogComponent } from "./form-builder-dialog/form-builder-dialog.component";
import { DropdownModule } from 'primeng/dropdown';
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [
        FormComponent,
        FormElementSelectorComponent,
        FormBuilderComponent,
        FormElementComponent,
        FormBuilderDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ServeSyncFormControlModule,
        InputTextModule,
        DragDropModule,
        InputSwitchModule,
        TooltipModule,
        DropdownModule,
        ServeSyncCommonModule,
        MultiSelectModule
    ],
    exports: [
        FormBuilderComponent,
        FormBuilderDialogComponent
    ]
})
export class FormBuilderModule {

}