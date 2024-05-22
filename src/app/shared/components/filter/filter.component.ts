import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ServeSyncCommonModule } from "../common/common.module";
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from "@angular/forms";
import { DropDownItem } from "../form-controls/dropwdown-input/dropdown-input.component";
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { ScrollPanelModule } from 'primeng/scrollpanel';

export type FilterFieldType = 'text' | 'single-select' | 'multi-select';

export interface FilterField {
    id: string;
    name: string;
    type: FilterFieldType;
    placeHolder?: string;
    data: DropDownItem[];
    selectedValue?: any;
    metadata?: any;
    selectedValueChanged?: (value: any) => void;
}

export interface SelectedFilterField {
    id: string;
    name: string;
    type: FilterFieldType;
    metadata?: any;
    value: any;
}

@Component({
    selector: 'app-filter',
    styleUrl: 'filter.component.scss',
    templateUrl: 'filter.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit, OnChanges {

    @Output()
    filterChange = new EventEmitter<SelectedFilterField[]>();

    @Input()
    fields: FilterField[] = [];

    activeFields: FilterField[] = [];

    onApplyFilter() {
        const selectedFilters = this.activeFields.filter(x => x.selectedValue != undefined).map(x => {
            return {
                id: x.id,
                type: x.type,
                name: x.name,
                value: x.selectedValue,
                metadata: x.metadata
            };
        });

        this.filterChange.emit(selectedFilters);
    }

    onResetFilter() {
        this.fields = [...this.fields, ...this.activeFields];
        this.fields.forEach(x => x.selectedValue = undefined);
        this.activeFields = [];
        this.onApplyFilter();
    }

    onActiveField(field: FilterField, overLayPanel: OverlayPanel) {
        field.selectedValue = undefined;
        this.activeFields.push(field);
        this.fields.splice(this.fields.indexOf(field), 1);
        overLayPanel.hide();
    }

    onInActiveField(field: FilterField) {
        this.fields.push(field);
        this.activeFields.splice(this.activeFields.indexOf(field), 1);
    }

    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.activeFields = [];
    }

    onFilterFieldChanged(field: FilterField, event: DropdownChangeEvent) {
        if (field.selectedValueChanged)
            field.selectedValueChanged(event.value);
    }
}

@NgModule({
    declarations: [
        FilterComponent,
    ],
    imports: [
        CommonModule,
        OverlayPanelModule,
        DropdownModule,
        ServeSyncCommonModule,
        BadgeModule,
        FormsModule,
        InputTextModule,
        MultiSelectModule,
        TooltipModule,
        ScrollPanelModule
    ],
    exports: [
        FilterComponent
    ]
})
export class FilterModule { }