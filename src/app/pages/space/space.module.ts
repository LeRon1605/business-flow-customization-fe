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
import { ReactiveFormsModule } from "@angular/forms";
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

@NgModule({
    declarations: [
        SpaceInfoComponent,
        SpaceBuilderComponent,
        WorkSpaceComponent,
        SpaceComponent
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
        SkeletonModule
    ],
    exports: [
        SpaceInfoComponent,
        SpaceBuilderComponent
    ]
})
export class SpaceModule {
    
}