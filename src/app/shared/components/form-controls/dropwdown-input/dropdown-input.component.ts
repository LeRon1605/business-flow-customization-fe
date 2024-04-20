import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

export interface DropDownItem {
    text: string;
    value: any
}

@Component({
    selector: 'app-dropdown-input',
    templateUrl: './dropdown-input.component.html'
})
export class DropDownInputComponent implements ControlValueAccessor { 

    private _selectedValue!: any;

    disabled: boolean = false;

    @Input()
    title?: string;

    @Input()
    placeHolder?: string;

    @Input()
    items!: DropDownItem[];

    @Input('selectedValue')
    get selectedValue(): any {
        return this._selectedValue;
    }
    set selectedValue(data: any) {
        this._selectedValue = data;
        this.onChange(data);
    }

    onChange: any = () => {}
    onTouch: any = () => {}

    constructor(public ngControl: NgControl) {
        ngControl.valueAccessor = this;
    }

    writeValue(obj: any): void {
        this._selectedValue = obj;
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