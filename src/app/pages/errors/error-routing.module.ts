import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./error.component";
import { NotFoundErrorComponent } from "./404-error/404-error.component";

const routes : Routes = [
    {
        path: '',
        component: ErrorComponent,
        children: [
            {
                path: 'not-found',
                component: NotFoundErrorComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }