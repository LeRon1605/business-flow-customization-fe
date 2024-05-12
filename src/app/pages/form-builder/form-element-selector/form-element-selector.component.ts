import { Component } from "@angular/core";
import { FormBuilderService } from "../form-builder.service";
import { FormElementType } from "../../../core/schemas";

@Component({
    selector: 'app-form-element-selector',
    templateUrl: 'form-element-selector.component.html'
})
export class FormElementSelectorComponent {

    constructor(
        public formBuilderService: FormBuilderService
    ) { }

    onElementDragStart(type: FormElementType) {
        console.log(type);
        this.formBuilderService.dragOnAdd(type);
    }
}