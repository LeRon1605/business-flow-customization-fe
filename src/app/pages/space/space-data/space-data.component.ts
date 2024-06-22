import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { BasicUserInfo, BusinessFlowBlockOutComeDto, FormDto, FormElementDto, FormElementType, FormVersionDto, RecordDateElementFilterValue, RecordDateFieldFilter, RecordFilterField, RecordFilterFieldType, SpaceDetailDto, SubmissionDataSource, SubmissionDto, SubmissionFilterRequestDto } from "../../../core/schemas";
import { DatatableColumn, DatatableOption } from "../../../shared/components/datatable/datatable.component";
import { FormService } from "../../../core/services/form.service";
import { DatePipe } from "@angular/common";
import { map } from "rxjs";
import { SpaceRecordDetailComponent } from "../space-record/space-record-detail.component";
import { FilterField, SelectedFilterField } from "../../../shared/components/filter/filter.component";
import { UserStorageService } from "../../../core/services";
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { PrimeIcons } from "primeng/api";
import { InputSwitchChangeEvent } from "primeng/inputswitch";
import { isArray } from "lodash";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BusinessFlowService } from "../../../core/services/business-flow.service";
import { DropDownItem } from "../../../shared/components/form-controls/dropwdown-input/dropdown-input.component";

const moment = extendMoment(Moment);

@Component({
    selector: 'app-space-data',
    styleUrl: 'space-data.component.scss',
    templateUrl: 'space-data.component.html'
})
export class SpaceDataComponent implements OnInit, OnChanges {

    @Input()
    spaceId: number = 1;

    @Input()
    space!: SpaceDetailDto;

    @ViewChild('recordDetail')
    recordDetailComponent?: SpaceRecordDetailComponent;

    form?: FormDto;
    addSubmitVisible: boolean = false;
    recordDetailVisible: boolean = false;
    submissions: SubmissionDto[] = [];
    versions: FormVersionDto[] = [];
    selectedRecordId?: number;
    filterFields: FilterField[] = [];
    search?: string;
    filters: RecordFilterField[] = [];
    isOpenSubmissionAfterLoaded: boolean = false;
    outComes: BusinessFlowBlockOutComeDto[] = [];

    tenantUsers: BasicUserInfo[] = [];
    
    private _versionId?: number;
    get versionId() {
        return this._versionId;
    }

    set versionId(value: number | undefined) {
        if (value && value != this._versionId) {
            this.formService.getByVersion(this.space.id, value)
                .subscribe(x => {
                    this.form = x;
                    if (this.isOpenSubmissionAfterLoaded) {
                        this.recordDetailVisible = true;
                        this.isOpenSubmissionAfterLoaded = false;
                    }
                    this.loadColumn();
                    this.loadFilter();
                });
        }

        this._versionId = value;
    }

    currentPage = 1;
    dataTable: DatatableOption = {
        rows: 10,
        columns: [
        ]
    }

    constructor(
        private formService: FormService,
        private userStorageSevice: UserStorageService,
        private router: Router,
        private route: ActivatedRoute,
        private businessFlowService: BusinessFlowService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(queryParams => {
            const submissionId = queryParams['submissionId'];
            const versionId = parseInt(queryParams['versionId']);
            const spaceId = parseInt(this.route.snapshot.paramMap.get('id')!);

            if (submissionId) {
                this.selectedRecordId = submissionId;
                if (!this.form || this.form.spaceId != spaceId || (versionId && this.form.versionId != versionId)) {
                    this.isOpenSubmissionAfterLoaded = true;
                } else {
                    this.recordDetailVisible = true;
                }
            }

            if (versionId) {
                this.versionId = versionId;
            }

            this.businessFlowService.getOutComes(spaceId)
                .subscribe(x => {
                    this.outComes = x;
                })
        });

        this.userStorageSevice.currentUser
            .subscribe(x => {
                if (x)
                    this.tenantUsers = x.tenantUsers
            })
    }

    ngOnChanges(changes: SimpleChanges): void {
        const spaceId = (changes['space']?.currentValue as SpaceDetailDto)?.id;
        if (spaceId) {
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
                    this.versionId = this.versions[0].id;
                });
        }
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadData();
    }

    loadColumn() {
        this.dataTable.activeColumnIds = ['execution', 'createdBy', 'createdAt', 'name'];
        let columns : DatatableColumn[] = [
            {
                id: 'execution',
                name: 'Kết quả',
                field: 'execution',
                metadata: {
                    icon: PrimeIcons.SIGN_OUT
                },
                generate: (x: SubmissionDto) => x.execution?.name ?? ''
            },
            {
                id: 'createdBy',
                name: 'Người tạo',
                field: 'fullName',
                metadata: {
                    icon: PrimeIcons.USER
                },
                generate: x => this.tenantUsers.find(u => u.id == x.createdBy)?.fullName ?? ''
            },
            {
                id: 'createdAt',
                name: 'Ngày tạo',
                field: 'createdAt',
                metadata: {
                    icon: PrimeIcons.CALENDAR
                },
                generate: (x: SubmissionDto) => <string>new DatePipe('vi_VN').transform(x.createdAt, 'hh:mm dd/MM/yyyy')
            },
            {
                id: 'updatedBy',
                name: 'Người chỉnh sửa',
                field: 'updatedBy',
                metadata: {
                    icon: PrimeIcons.USER
                },
                generate: x => this.tenantUsers.find(u => u.id == x.updatedBy)?.fullName ?? ''
            },
            {
                id: 'updatedAt',
                name: 'Ngày chỉnh sửa',
                field: 'updatedAt',
                metadata: {
                    icon: PrimeIcons.CALENDAR
                },
                generate: (x: SubmissionDto) => x.updatedAt ? <string>new DatePipe('vi_VN').transform(x.updatedAt, 'hh:mm dd/MM/yyyy') : ''
            }
        ];

        if (this.form) {
            const fieldColumns : DatatableColumn[] = [];
            for (const field of this.form.elements.filter(x => x.type != FormElementType.Attachment)) {
                fieldColumns.push({
                    id: field.id.toString(),
                    name: field.name,
                    field: field.name,
                    metadata: {
                        icon: this.getFieldIcon(field.type)
                    },
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
                                if (!fieldValue.value)
                                    return '';
                                
                                let value = JSON.parse(fieldValue.value);
                                if (!isArray(value))   
                                    value = [ parseInt(value) ];

                                return field.options.filter(x => value.includes(x.id)).map(x => x.name).join(', ');
                        }
                    }
                })
            }

            const formActiveFields = this.form.elements.filter(x => x.type != FormElementType.Attachment).map(x => x.id.toString()).slice(0, 4);
            this.dataTable.activeColumnIds = [...this.dataTable.activeColumnIds, ...formActiveFields];

            columns = [
                {
                    id: 'name',
                    name: 'Tên bản ghi',
                    field: 'name',
                    metadata: {
                        icon: PrimeIcons.LANGUAGE
                    }
                },
                ...fieldColumns, 
                ...columns];
        }

        this.dataTable.columns = columns;
        this.loadData();
    }

    loadFilter() {
        if (!this.form) 
            return;

        this.filters = [];
        this.filterFields = [
            {
                id: 'createdBy',
                name: 'Người tạo',
                data: this.tenantUsers.map(x => {
                    return {
                        text: x.fullName,
                        value: x.id
                    }
                }),
                type: 'multi-select',
                placeHolder: 'Chọn người tạo',
                metadata: {
                    icon: PrimeIcons.USER
                }
            },
            {
                id: 'createdAt',
                name: 'Ngày tạo',
                data: [
                    {
                        text: 'Hôm nay',
                        value: RecordDateFieldFilter.Today
                    },
                    {
                        text: 'Tuần này',
                        value: RecordDateFieldFilter.ThisWeek
                    },
                    {
                        text: 'Tháng này',
                        value: RecordDateFieldFilter.ThisMonth
                    },
                    {
                        text: 'Năm này',
                        value: RecordDateFieldFilter.ThisYear
                    }
                ],
                type: 'multi-select',
                placeHolder: 'Chọn ngày tạo',
                metadata: {
                    icon: PrimeIcons.CALENDAR
                }
            },
            {
                id: 'updatedBy',
                name: 'Người chỉnh sửa',
                data: this.tenantUsers.map(x => {
                    return {
                        text: x.fullName,
                        value: x.id
                    }
                }),
                type: 'multi-select',
                placeHolder: 'Chọn chỉnh sửa',
                metadata: {
                    icon: PrimeIcons.USER
                }
            },
            {
                id: 'updatedAt',
                name: 'Ngày chỉnh sửa',
                data: [
                    {
                        text: 'Hôm nay',
                        value: RecordDateFieldFilter.Today
                    },
                    {
                        text: 'Tuần này',
                        value: RecordDateFieldFilter.ThisWeek
                    },
                    {
                        text: 'Tháng này',
                        value: RecordDateFieldFilter.ThisMonth
                    },
                    {
                        text: 'Năm này',
                        value: RecordDateFieldFilter.ThisYear
                    }
                ],
                type: 'multi-select',
                placeHolder: 'Chọn ngày chỉnh sửa',
                metadata: {
                    icon: PrimeIcons.CALENDAR
                }
            },
            {
                id: 'dataSource',
                name: 'Nguồn dữ liệu',
                data: [
                    {
                        text: 'Nội bộ',
                        value: SubmissionDataSource.Internal
                    },
                    {
                        text: 'Ẩn danh',
                        value: SubmissionDataSource.External
                    }
                ],
                type: 'multi-select',
                placeHolder: 'Chọn nguồn dữ liệu',
                metadata: {
                    icon: PrimeIcons.SIGN_IN
                }
            },
            {
                id: 'execution',
                name: 'Kết quả',
                data: this.outComes.map(x => {
                    return {
                        text: x.name,
                        value: x.id
                    }
                }),
                type: 'multi-select',
                placeHolder: 'Chọn kết quả',
                metadata: {
                    icon: PrimeIcons.SIGN_OUT
                }
            }
        ];

        for (const field of this.form.elements) {
            const filterField = this.getFilterField(field);
            if (filterField)
                this.filterFields.push(filterField);
        }
    }

    getFilterField(element: FormElementDto) : FilterField | undefined {
        const field : FilterField = {
            id: element.id.toString(),
            name: element.name,
            data: [],
            type: 'single-select',
            metadata: element
        };

        switch (element.type) {
            case FormElementType.SingleOption:
            case FormElementType.MultiOption:
                field.type = 'multi-select';
                field.data = element.options.map((x) => {
                    return {
                        text: x.name,
                        value: x.id.toString()
                    }
                });
                field.placeHolder = 'Chọn ' + field.name;
                break;

            case FormElementType.Text:
                field.type = 'text';
                field.placeHolder = 'Nhập ' + field.name;
                break;

            case FormElementType.Date:
                field.type = 'multi-select';
                field.placeHolder = 'Chọn ' + field.name;
                field.data = [
                    {
                        text: 'Hôm nay',
                        value: RecordDateFieldFilter.Today
                    },
                    {
                        text: 'Tuần này',
                        value: RecordDateFieldFilter.ThisWeek
                    },
                    {
                        text: 'Tháng này',
                        value: RecordDateFieldFilter.ThisMonth
                    },
                    {
                        text: 'Năm này',
                        value: RecordDateFieldFilter.ThisYear
                    }
                ];
                field.metadata.icon = PrimeIcons.CALENDAR;
                break;

            default:
                return undefined;
        }

        return field;
    }

    loadData() {
        if (!this.versionId)
            return;

        const data : SubmissionFilterRequestDto = {
            page: this.currentPage,
            size: this.dataTable.rows,
            formVersionId: this.versionId,
            spaceId: this.space.id,
            search: this.search,
            filters: this.filters
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

    onSearchChange(search: string) {
        this.search = search;
        this.loadData();
    }

    onRecordDetailHide() {
        const qParams: Params = {};
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: qParams,
            queryParamsHandling: ''
        });

        if (!this.recordDetailComponent)
            return;

        const index = this.dataTable.pagedResult?.data.findIndex(x => x.id == this.recordDetailComponent?.submission.id);
        if (index != undefined && index >= 0) {
            this.dataTable.pagedResult?.data.splice(index, 1, this.recordDetailComponent.submission);
        }
    }

    onFilterChange(fields: SelectedFilterField[]) {
        this.filters = [];
        const filters : RecordFilterField[] = [];
        for (const field of fields) {
            switch (field.type) {
                case 'text':
                    filters.push({
                        type: RecordFilterFieldType.RecordElement,
                        value: JSON.stringify({
                            elementId: field.id,
                            value: field.value
                        })
                    });
                    break;

                case 'single-select':
                    filters.push({
                        type: RecordFilterFieldType.RecordElement,
                        value: JSON.stringify({
                            elementId: field.id,
                            value: JSON.stringify([field.value])
                        })
                    });
                    break;

                case 'multi-select':
                    switch (field.id) {
                        case 'createdBy':
                            filters.push({
                                type: RecordFilterFieldType.CreatedBy,
                                value: JSON.stringify(field.value)
                            })
                            break;

                        case 'createdAt':
                            filters.push({
                                type: RecordFilterFieldType.CreatedAt,
                                value: JSON.stringify(this.getDateRange(field.value))
                            })
                            break;

                        case 'updatedBy':
                            filters.push({
                                type: RecordFilterFieldType.UpdatedBy,
                                value: JSON.stringify(field.value)
                            })
                            break;

                        case 'updatedAt':
                            filters.push({
                                type: RecordFilterFieldType.UpdatedAt,
                                value: JSON.stringify(this.getDateRange(field.value))
                            })
                            break;

                        case 'dataSource':
                            filters.push({
                                type: RecordFilterFieldType.DataSource,
                                value: JSON.stringify(field.value)
                            })
                            break;

                        case 'execution':
                            filters.push({
                                type: RecordFilterFieldType.ExecutionResult,
                                value: JSON.stringify(field.value)
                            })
                            break;

                        default:
                            const element = field.metadata as FormElementDto;
                            switch (element.type) {
                                case FormElementType.SingleOption:
                                case FormElementType.MultiOption:
                                    filters.push({
                                        type: RecordFilterFieldType.RecordElement,
                                        value: JSON.stringify({
                                            elementId: field.id,
                                            value: JSON.stringify(field.value)
                                        })
                                    })
                                    break;

                                case FormElementType.Date:
                                    filters.push({
                                        type: RecordFilterFieldType.RecordElement,
                                        value: JSON.stringify({
                                            elementId: field.id,
                                            value: JSON.stringify(this.getDateRange(field.value))
                                        })
                                    })
                            }
                    }
                    break;
            }
        }

        this.filters = filters;
        this.loadData();
    }

    getDateRange(types: RecordDateFieldFilter[]) : RecordDateElementFilterValue[] {
        const filters : RecordDateElementFilterValue[] = [];
        for (const type of types) {
            switch (type) {
                case RecordDateFieldFilter.Today:
                    filters.push({
                        from: moment().startOf('day').toISOString(),
                        to: moment().endOf('day').toISOString()
                    });
                    break;

                    case RecordDateFieldFilter.ThisWeek:
                        filters.push({
                            from: moment().startOf('week').toISOString(),
                            to: moment().endOf('week').toISOString()
                        });
                        break;
    
                case RecordDateFieldFilter.ThisMonth:
                    filters.push({
                        from: moment().startOf('month').toISOString(),
                        to: moment().endOf('month').toISOString()
                    });
                    break;
    
                case RecordDateFieldFilter.ThisYear:
                    filters.push({
                        from: moment().startOf('year').toISOString(),
                        to: moment().endOf('year').toISOString()
                    });
                    break;
            }
        }
        
        return filters;
    }

    getFieldIcon(type: FormElementType) {
        switch (type) {
            case FormElementType.Text:
                return PrimeIcons.LANGUAGE;

            case FormElementType.Number:
                return PrimeIcons.HASHTAG;

            case FormElementType.Date:
                return PrimeIcons.CALENDAR;

            case FormElementType.Attachment:
                return PrimeIcons.FILE

            case FormElementType.MultiOption:
                return PrimeIcons.CHECK_CIRCLE;

            case FormElementType.SingleOption:
                return PrimeIcons.CHECK_SQUARE;
        }
    }

    onToggerField(id: string | undefined, $event: InputSwitchChangeEvent) {
        if (!this.dataTable.activeColumnIds || !id)
            return;

        if ($event.checked) {
            this.dataTable.activeColumnIds.push(id);
        } else {
            this.dataTable.activeColumnIds.splice(this.dataTable.activeColumnIds.indexOf(id), 1);
        }
    }
}