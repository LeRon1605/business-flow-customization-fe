import { NgModule } from "@angular/core";
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BusinessFlowComponent } from "./business-flow.component";
import { NgxGraphModule } from '@kr0san89/ngx-graph';
import { SidebarModule } from 'primeng/sidebar';
import { BusinessFlowBuilderComponent } from "./business-flow-builder/business-flow-builder.component";
import { BusinessFlowBlockSelectorComponent } from "./business-flow-block-selector/business-flow-block-selector.component";
import { CardModule } from 'primeng/card';
import { BusinessFlowBlockDetailComponent } from "./business-flow-block-detail/business-flow-block-detail.component";
import { TooltipModule } from 'primeng/tooltip';
import { BusinessFlowOutComeDetailComponent } from "./business-flow-outcome-detail/business-flow-outcome-detail.component";
import { DialogModule } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { BusinessFlowBranchDetailComponent } from "./business-flow-branch-detail/business-flow-branch-detail.component";
import { TabViewModule } from 'primeng/tabview';
import { FormBuilderModule } from "../form-builder/form-builder.module";
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [
        BusinessFlowComponent,
        BusinessFlowBuilderComponent,
        BusinessFlowBlockSelectorComponent,
        BusinessFlowBlockDetailComponent,
        BusinessFlowOutComeDetailComponent,
        BusinessFlowBranchDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        ServeSyncCommonModule,
        NgxGraphModule,
        SidebarModule,
        CardModule,
        TooltipModule,
        DialogModule,
        ColorPickerModule,
        InputTextModule,
        TabViewModule,
        FormBuilderModule,
        DragDropModule,
        DropdownModule,
        MultiSelectModule,
        FormsModule
    ],
    exports: [
        BusinessFlowComponent
    ]
})
export class BusinessFlowModule { }