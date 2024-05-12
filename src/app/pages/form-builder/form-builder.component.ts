import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormBuilderService } from "./form-builder.service";
import { CreateFormRequestDto, FormDto } from "../../core/schemas";
import { FormComponent } from "./form/form.component";
import { FormService } from "../../core/services/form.service";
import { ToastService } from "../../core/services";

@Component({
    selector: 'app-form-builder',
    providers: [
        FormBuilderService
    ],
    templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent {

    form?: FormDto;

    @ViewChild('formComponent')
    formComponent!: FormComponent;

    @Input()
    createMode!: boolean;

    @Input()
    spaceId?: number;

    @Output()
    onFormUpdated: EventEmitter<number> = new EventEmitter<number>();

    private _versionId?: number;
    @Input()
    get versionId() {
        return this._versionId;
    }
    set versionId(value: number | undefined) {
        this._versionId = value;
        if (value == undefined || !this.spaceId || this.createMode) {
            return;
        }

        this.formService.getByVersion(this.spaceId, this._versionId!)
            .subscribe(x => {
                this.form = x;
                this.formBuilderService.load(x.elements);
            });
    }

    get isValid() {
        return this.formBuilderService.valid;
    }

    get data() : CreateFormRequestDto {
        return {
            name: this.formComponent.name,
            coverImageUrl: '../../../../assets/images/form-background.jpg',
            elements: this.formBuilderService.data
        }
    }

    constructor(
        private formBuilderService: FormBuilderService,
        private formService: FormService,
        private toastService: ToastService
    ) { }

    save() {
        if (!this.isValid) {
            this.toastService.error('Thông tin không hợp lệ')
            return;
        }

        if (this.spaceId && !this.createMode)
            this.formService.saveForm(this.spaceId, this.data)
                .subscribe(x => {
                    this.toastService.success('Cập nhật biểu mẫu thành công');
                    this.onFormUpdated.emit(x.id);
                });
    }
}