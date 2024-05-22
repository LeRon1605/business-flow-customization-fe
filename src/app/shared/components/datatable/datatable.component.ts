import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from "@angular/core";
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PagedResult } from "../../../core/schemas/paged.schema";
import { ServeSyncFormControlModule } from "../form-controls/form-control.module";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { Subject, debounceTime, distinctUntilChanged } from "rxjs";
import { FilterField, FilterModule, SelectedFilterField } from "../filter/filter.component";
import { TooltipModule } from 'primeng/tooltip';

export interface DatatableOption {
    title?: string | null;
    columns: DatatableColumn[],
    activeColumnIds?: string[];
    rows: number;
    pagedResult?: PagedResult<any> | null,
}

export interface DatatableColumn {
    id?: string;
    name: string;
    field: string;
    metadata?: any;
    generate?: (item: any) => string;
}

@Component({
    selector: 'app-datatable',
    styleUrl: 'datatable.component.scss',
    templateUrl: './datatable.component.html'
})
export class DataTableComponent implements OnInit {

    private searchText$ = new Subject<string>();

    @Input()
    model!: DatatableOption;

    @Input()
    styleClass?: string;

    @Input()
    filterFields?: FilterField[];

    @Output()
    pageChange = new EventEmitter<number>();

    @Output()
    searchChange = new EventEmitter<string>();

    @Output()
    filterChange = new EventEmitter<SelectedFilterField[]>();

    @Output()
    rowSelected = new EventEmitter<any>();

    filterForm = new FormGroup({
        search: new FormControl('')
    })

    selectedRow: any;

    get activeColumns() : DatatableColumn[] {
        if (!this.model.activeColumnIds)
            return this.model.columns;

        return this.model.columns.filter(x => x.id && this.model.activeColumnIds?.includes(x.id));
    }

    get totalRecords() : number {
        if (this.model.pagedResult)
            return this.model.pagedResult.total;
        
        return 0;
    }

    get data() : any[] {
        if (this.model.pagedResult)
            return this.model.pagedResult.data;

        return [];
    }

    ngOnInit(): void {
        this.searchText$.pipe(
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe(x => this.searchChange.emit(x));
    }

    onPageChange(arg: any) {
        this.pageChange.emit((arg.first / arg.rows) + 1);
    }

    onSearch(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.searchText$.next(value);
    }

    onFilterChange(filters: SelectedFilterField[]) {
        this.filterChange.emit(filters);
    }

    onRowSelected(event: TableRowSelectEvent) {
        this.rowSelected.emit(event.data);
    }
    
}

@NgModule({
    declarations: [
        DataTableComponent
    ],
    imports: [
        TableModule,
        CommonModule,
        SkeletonModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        InputTextModule,
        FilterModule,
        TooltipModule
    ],
    exports: [
        DataTableComponent
    ]
})
export class DataTableModule { }