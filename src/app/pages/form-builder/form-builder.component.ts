import { Component, ViewChild } from "@angular/core";
import { FormBuilderService } from "./form-builder.service";
import { CreateFormRequestDto } from "../../core/schemas";
import { FormComponent } from "./form/form.component";

@Component({
    selector: 'app-form-builder',
    providers: [
        FormBuilderService
    ],
    templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent {

    @ViewChild('form')
    form!: FormComponent;

    get isValid() {
        return this.formBuilderService.valid;
    }

    get data() : CreateFormRequestDto {
        return {
            name: this.form.name,
            coverImageUrl: '../../../../assets/images/form-background.jpg',
            elements: this.formBuilderService.data
        }
    }

    constructor(
        private formBuilderService: FormBuilderService
    ) { }
}