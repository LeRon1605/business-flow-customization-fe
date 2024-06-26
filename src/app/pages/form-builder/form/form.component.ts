import { Component, HostListener, Input } from "@angular/core";
import { FormBuilderService } from "../form-builder.service";
import { FormElementDto } from "../../../core/schemas";

@Component({
    selector: 'app-form',
    styleUrl: 'form.component.scss',
    templateUrl: 'form.component.html'
})
export class FormComponent {
    
    private _name!: string;
    @Input()
    get name() : string {
        return this._name;
    }
    set name(value: string | undefined) {
        if (value != undefined) {
            this._name = value;
        } else {
            this._name = 'Tên biểu mẫu';
        }
    }

    @Input()
    editable!: boolean;

    selectedElement?: FormElementDto;

    constructor(
        public formBuilderService: FormBuilderService
    ) { }   

    onDropOnElement($event: DragEvent, index: number) {
        if (this.formBuilderService.draggedElementType != undefined) {
            this.formBuilderService.insert(this.formBuilderService.draggedElementType, index);
            this.formBuilderService.draggedElementType = undefined;
        } else if (this.formBuilderService.draggedElement != undefined) {
            this.formBuilderService.swap(this.formBuilderService.draggedElement, index);
            this.formBuilderService.draggedElement = undefined;
        }
    }

    onDrop($event: DragEvent) {
        if (this.formBuilderService.draggedElementType != undefined) {
            this.formBuilderService.pushElement(this.formBuilderService.draggedElementType);
            this.formBuilderService.draggedElementType = undefined;
        } else if (this.formBuilderService.draggedElement != undefined) {
            this.formBuilderService.swap(this.formBuilderService.draggedElement, this.formBuilderService.elements.length - 1);
            this.formBuilderService.draggedElement = undefined;
        }
    }

    onElementDragStart(element: FormElementDto) {
        this.formBuilderService.dragOnSwap(element);
    }

    @HostListener('document:mousedown', ['$event'])
    onWindowMouseDown(event: MouseEvent) {
        if (!(event.target instanceof HTMLElement) || !event.target.closest('.form-element')) {
            this.selectedElement = undefined;
        }
    }
}