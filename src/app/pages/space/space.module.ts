import { NgModule } from "@angular/core";
import { SpaceInfoComponent } from "./space-info/space-info.component";
import { SpaceBuilderComponent } from "./space-builder/space-builder.component";
import { SpaceComponent } from "./space.component";
import { SpaceRoutingModule } from "./space.routing";
import { TabViewModule } from "primeng/tabview";
import { InputTextModule } from "primeng/inputtext";
import { ColorPickerModule } from "primeng/colorpicker";
import { DialogModule } from "primeng/dialog";
import { TooltipModule } from "primeng/tooltip";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { SidebarModule } from "primeng/sidebar";
import { BusinessFlowModule } from "../business-flow/business-flow.module";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { WorkSpaceComponent } from "./workspace/workspace.component";
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { SpaceHeaderComponent } from "./space-header/space-header.component";
import { SpaceBusinessFlowComponent } from "./space-business-flow/space-business-flow.component";
import { DropdownModule } from 'primeng/dropdown';
import { SubmissionModule } from "../submission/submission.module";
import { FormBuilderModule } from "../form-builder/form-builder.module";
import { SpaceFormComponent } from "./space-form/space-form.component";
import { SpaceDataComponent } from "./space-data/space-data.component";
import { DataTableModule } from "../../shared/components/datatable/datatable.component";
import { SpaceRecordDetailComponent } from "./space-record/space-record-detail.component";
import { SpaceRecordBusinessFlowComponent } from "./space-record-business-flow/space-record-business-flow.component";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { SpaceRecordCommentComponent } from "./space-record-comment/space-record-comment.component";
import { ApplicationPipeModule } from "../../core/pipes/application-pipe.module";
import { SpaceMemberComponent } from "./space-member/space-member.component";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
    declarations: [
        SpaceInfoComponent,
        SpaceBuilderComponent,
        WorkSpaceComponent,
        SpaceComponent,
        SpaceHeaderComponent,
        SpaceBusinessFlowComponent,
        SpaceFormComponent,
        SpaceDataComponent,
        SpaceRecordDetailComponent,
        SpaceRecordBusinessFlowComponent,
        SpaceRecordCommentComponent,
        SpaceMemberComponent,
    ],
    imports: [
        SpaceRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        ServeSyncCommonModule,
        SidebarModule,
        TooltipModule,
        DialogModule,
        ColorPickerModule,
        InputTextModule,
        TabViewModule,
        BusinessFlowModule,
        InputTextareaModule,
        AvatarModule,
        MenuModule,
        AvatarGroupModule,
        SkeletonModule,
        DropdownModule,
        FormsModule,
        SubmissionModule,
        FormBuilderModule,
        DataTableModule,
        OverlayPanelModule,
        InputSwitchModule,
        EditorModule,
        ApplicationPipeModule,
        InputGroupModule,
        InputGroupAddonModule
    ],
    exports: [
        SpaceInfoComponent,
        SpaceBuilderComponent
    ]
})
export class SpaceModule {
    
}