import { Component, HostListener } from "@angular/core";
import { FormBuilderService } from "../form-builder.service";
import { CreateFormElementDto } from "../../../core/schemas";

@Component({
    selector: 'app-form',
    styleUrl: 'form.component.scss',
    templateUrl: 'form.component.html'
})
export class FormComponent {
    
    name: string = 'Tên biểu mẫu';
    selectedElement?: CreateFormElementDto;

    constructor(
        public formBuilderService: FormBuilderService
    ) { }   

    onDropOnElement($event: DragEvent, index: number) {
        if (this.formBuilderService.draggedElementType != undefined) {
            this.formBuilderService.insert(this.formBuilderService.draggedElementType, index + 1);
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
        }
    }

    onElementDragStart(element: CreateFormElementDto) {
        this.formBuilderService.dragOnSwap(element);
    }

    @HostListener('document:mouseup', ['$event'])
    onWindowMouseDown(event: MouseEvent) {
        if (!(event.target instanceof HTMLElement) || !event.target.closest('.form-element')) {
            this.selectedElement = undefined;
        }
    }
}