import { Component, EventEmitter, Input, NgModule, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ServeSyncCommonModule } from "../common/common.module";
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from "@angular/forms";
import { DropDownItem } from "../form-controls/dropwdown-input/dropdown-input.component";

export interface FilterField {
    id: string;
    name: string;
    type?: string;
    placeHolder?: string;
    data: DropDownItem[];
    selectedValue?: any;
    selectedValueChanged?: (value: any) => void;
}

export interface SelectedFilterField {
    id: string;
    name: string;
    value: any;
}

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    
    isDraft: boolean = false;

    @Output()
    filterChange = new EventEmitter<SelectedFilterField[]>();

    @Input()
    fields: FilterField[] = [];

    onApplyFilter() {
        const selectedFilters = this.fields.map(x => {
            return {
                id: x.id,
                name: x.name,
                value: x.selectedValue
            };
        });

        this.isDraft = false;
        this.filterChange.emit(selectedFilters);
    }

    onResetFilter() {
        this.fields.forEach(x => x.selectedValue = null);
        this.onApplyFilter();
    }

    ngOnInit(): void {
        
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
        FormsModule
    ],
    exports: [
        FilterComponent
    ]
})
export class FilterModule { }