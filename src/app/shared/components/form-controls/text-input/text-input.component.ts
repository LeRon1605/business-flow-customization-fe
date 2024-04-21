import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Component({
    selector: 'app-text-input',
    styleUrl: './text-input.component.css',
    templateUrl: './text-input.component.html',
})
export class TextInputComponent implements ControlValueAccessor {
    private _value!: string;
    private _placeHolder?: string;
    disabled: boolean = false;

    @Input()
    title!: string;

    @Input()
    helpText?: string;

    @Input()
    type?: string;

    @Input()
    styleClass?: string;

    @Input()
    blockStyleClass?: string;

    @Input()
    loading?: boolean;

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

    onChange: any = () => {}
    onTouch: any = () => {}

    constructor(public ngControl: NgControl) {
        ngControl.valueAccessor = this;
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
}