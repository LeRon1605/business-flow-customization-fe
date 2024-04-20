import { Component, EventEmitter, Input, OnInit, Output, Type } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { FileUploadEvent } from "primeng/fileupload";
import { HttpResponse } from "@angular/common/http";
import { ControlValueAccessor, NgControl } from "@angular/forms";

export type FileUploadType = 'image' | 'file';

export interface UploadResponseDto {
    url: string;
}

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html'
})
export class FileUploaderComponent implements ControlValueAccessor, OnInit {

    uploadUrl = environment.baseUrl + '/hub/files';

    private _value!: string;
    private _placeHolder?: string;
    disabled: boolean = false;
    loading = false;
    tempFileUrl!: string;

    @Input()
    label?: string;

    @Input()
    title?: string;

    @Input()
    type: FileUploadType = 'file';

    @Input('value')
    get value(): string {
        return this._value;
    }
    set value(data: string) {
        this._value = data;
        this.onChange(data);
    }

    @Input('placeHolder')
    get placeHolder(): string {
        return this._placeHolder ?? '';
    }
    set placeHolder(data: string) {
        this._placeHolder = data;
    }

    get defaultCssClass() {
        return this.type == 'image' 
            ? 'w-full h-full cursor-pointer absolute top-0 left-0 opacity-0' 
            : '';
    }

    onChange: any = () => {}
    onTouch: any = () => {}

    constructor(public ngControl: NgControl) {
        ngControl.valueAccessor = this;
    }

    ngOnInit(): void {
        this.tempFileUrl = this.value;
    }

    writeValue(obj: string): void {
        this._value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onUploadSuccess($event: FileUploadEvent) {
        const fileUrl = (<HttpResponse<UploadResponseDto>>$event.originalEvent).body?.url;
        if (fileUrl) {
            this.value = fileUrl;
            this.tempFileUrl = this.value;
        }

        this.loading = false;
        this.disabled = false;
    }

    onUploadError() {
        this.loading = false;
        this.disabled = false;
    }

    onUploadProgress() {
        this.loading = true;
        this.disabled = true;
        this.value = '';
    }
}