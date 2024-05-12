import { Component, Input, ViewChild } from "@angular/core";
import { FormBuilderService } from "./form-builder.service";
import { CreateFormRequestDto, FormDto } from "../../core/schemas";
import { FormComponent } from "./form/form.component";
import { FormApiService } from "../../core/apis/form.api";

@Component({
    selector: 'app-form-builder',
    providers: [
        FormBuilderService
    ],
    templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent {

    private _loadedSpaceId?: number;
    private _loadedVersionId?: number;

    form?: FormDto;

    @ViewChild('formComponent')
    formComponent!: FormComponent;

    @Input()
    createMode!: boolean;

    private _spaceId?: number;
    @Input()
    get spaceId() {
        return this._spaceId;
    }
    set spaceId(value: number | undefined) {
        this._spaceId = value;
        this.load();
    }

    private _versionId?: number;
    @Input()
    get versionId() {
        return this._versionId;
    }
    set versionId(value: number | undefined) {
        this._versionId = value;
        this.load();
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
        private formApiService: FormApiService
    ) { }

    load() {
        if (this.versionId == this._loadedVersionId && this._loadedSpaceId == this.spaceId) 
            return;

        if (this.versionId == undefined && !this.createMode && this.spaceId) {
            this._loadedSpaceId = this.spaceId;
            this._loadedVersionId = this.versionId;
            this.formApiService.getLatestSpaceVersion(this.spaceId)
                .subscribe(x => {
                    this.form = x;
                    this.formBuilderService.load(x.elements);
                });
        }
    }
}