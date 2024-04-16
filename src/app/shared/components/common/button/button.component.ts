import { Component, EventEmitter, Input, Output } from "@angular/core";

export type ButtonSeverity = 'success' | 'danger' | 'primary';

const cssByType : { [key in ButtonSeverity]: string; } = {
    'primary': 'bg-blue-700 hover:bg-blue-800',
    'success': '',
    'danger': 'bg-red-500 hover:bg-red-600'
}

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
})
export class ButtonComponent { 
    @Input()
    text!: string;

    @Input()
    disabled: boolean = false;

    @Input()
    loading: boolean = false;

    @Input()
    badge?: string;

    @Input()
    icon?: string;

    @Input()
    severity?: ButtonSeverity = 'primary';

    @Input()
    type!: string;

    @Input()
    styleClass?: string;

    get severityClass() : string {
        return this.severity 
        ? cssByType[this.severity]
        : '';
    }

    @Output()
    onClick = new EventEmitter<MouseEvent>();
}