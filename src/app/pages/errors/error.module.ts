import { NgModule } from "@angular/core";
import { ErrorComponent } from "./error.component";
import { NotFoundErrorComponent } from "./404-error/404-error.component";
import { ErrorRoutingModule } from "./error-routing.module";
import { CommonModule } from "@angular/common";
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";

@NgModule({
    declarations: [
        ErrorComponent,
        NotFoundErrorComponent
    ],
    imports: [
        CommonModule,
        ServeSyncCommonModule,
        ErrorRoutingModule
    ]
})
export class ErrorModule { }