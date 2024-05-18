import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormDto, FormElementType, FormVersionDto, SpaceDetailDto, SubmissionDto, SubmissionFilterRequestDto } from "../../../core/schemas";
import { DatatableColumn, DatatableOption } from "../../../shared/components/datatable/datatable.component";
import { FormService } from "../../../core/services/form.service";
import { DatePipe } from "@angular/common";
import { map } from "rxjs";

@Component({
    selector: 'app-space-data',
    styleUrl: 'space-data.component.scss',
    templateUrl: 'space-data.component.html'
})
export class SpaceDataComponent implements OnChanges {

    @Input()
    space!: SpaceDetailDto;

    form?: FormDto;
    addSubmitVisible: boolean = false;
    recordDetailVisible: boolean = false;
    submissions: SubmissionDto[] = [];
    versions: FormVersionDto[] = [];
    selectedRecordId?: number;
    
    private _versionId?: number;
    get versionId() {
        return this._versionId;
    }

    set versionId(value: number | undefined) {
        if (value) {
            this.formService.getByVersion(this.space.id, value)
                .subscribe(x => {
                    this.form = x;
                    this.loadColumn();
                });
        }
        this._versionId = value;
    }

    currentPage = 1;
    dataTable: DatatableOption = {
        rows: 13,
        columns: [
            {
                name: 'Tên',
                field: 'name'
            },
            {
                name: 'Người tạo',
                field: 'fullName'
            },
            {
                name: 'Ngày tạo',
                field: 'createdAt'
            },
            {
                name: 'Người chỉnh sửa',
                field: 'updatedBy'
            },
            {
                name: 'Ngày chỉnh sửa',
                field: 'updatedAt'
            }
        ]
    }

    constructor(
        private formService: FormService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        const spaceId = (changes['space'].currentValue as SpaceDetailDto).id;
        this.formService.getSpaceVersions(spaceId)
            .pipe(
                map(x => x.map(v => {
                    return {
                        id: v.id,
                        createdAt: 'Phiên bản ' + <string>new DatePipe('vi_VN').transform(v.createdAt, 'hh:mm dd/MM/yyyy')
                    }
                }))
            )
            .subscribe(x => {
                this.versions = x;
                this.versionId= this.versions[0].id;
            });
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadData();
    }

    loadColumn() {
        let columns : DatatableColumn[] = [
            {
                name: 'Người tạo',
                field: 'fullName',
                generate: x => 'Lê Rôn'
            },
            {
                name: 'Ngày tạo',
                field: 'createdAt',
                generate: (x: SubmissionDto) => <string>new DatePipe('vi_VN').transform(x.createdAt, 'hh:mm dd/MM/yyyy')
            },
            {
                name: 'Người chỉnh sửa',
                field: 'updatedBy'
            },
            {
                name: 'Ngày chỉnh sửa',
                field: 'updatedAt',
                generate: (x: SubmissionDto) => x.updatedAt ? <string>new DatePipe('vi_VN').transform(x.updatedAt, 'hh:mm dd/MM/yyyy') : ''
            }
        ];

        if (this.form) {
            const fieldColumns : DatatableColumn[] = [];
            for (const field of this.form.elements.filter(x => x.type != FormElementType.Attachment).slice(0, 3)) {
                fieldColumns.unshift({
                    name: field.name,
                    field: field.name,
                    generate: (x: SubmissionDto) => {
                        const fieldValue = x.fields.find(f => f.elementId == field.id);
                        if (!fieldValue)
                            return '';

                        switch (field.type) {
                            case FormElementType.Text:
                            case FormElementType.Number:
                                return JSON.parse(fieldValue.value);

                            case FormElementType.Date:
                                return new DatePipe('vi_VN').transform(JSON.parse(fieldValue.value), 'dd/MM/yyyy', '7');
                            
                            case FormElementType.MultiOption:
                            case FormElementType.SingleOption:
                                const optionIds = JSON.parse(fieldValue.value);
                                return field.options.filter(x => optionIds.includes(x.id)).map(x => x.name).join(', ');
                        }
                    }
                })
            }

            columns = [
                {
                    name: 'Tên bản ghi',
                    field: 'name'
                },
                ...fieldColumns, 
                ...columns];
        }

        this.dataTable.columns = columns;
        this.loadData();
    }

    loadData() {
        if (!this.versionId)
            return;

        const data : SubmissionFilterRequestDto = {
            page: this.currentPage,
            size: this.dataTable.rows,
            formVersionId: this.versionId,
            spaceId: this.space.id
        };
        this.formService.getSpaceSubmissions(data)
            .subscribe(x => {
                this.dataTable.pagedResult = x;
            });
    }

    onSubmitted() {
        this.addSubmitVisible = false;
        this.loadData();
    }

    onRecordSelected(data: SubmissionDto) {
        this.selectedRecordId = data.id;
        this.recordDetailVisible = true;
    }
}