import { Component, Input, OnInit } from "@angular/core";
import { BusinessFlowVersionDto, SpaceDetailDto } from "../../../core/schemas";
import { BusinessFlowService } from "../../../core/services/business-flow.service";
import { DropdownChangeEvent } from "primeng/dropdown";
import { map } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-space-business-flow',
    templateUrl: 'space-business-flow.component.html'
})
export class SpaceBusinessFlowComponent implements OnInit {
    
    @Input()
    space!: SpaceDetailDto;

    @Input()
    set spaceId(id: number) {
        this.loadBusinessFlowVersion(this.space.latestPublishedBusinessFlowId);
    }

    editable: boolean = true;
    selectedBusinessFlowVersionId!: number;
    businessFlowVersions?: BusinessFlowVersionDto[];

    constructor(
        private businessFlowService: BusinessFlowService
    ) { }

    ngOnInit(): void {
        this.selectedBusinessFlowVersionId = this.space.latestPublishedBusinessFlowId;
        this.loadBusinessFlowVersion();
    }

    onBusinessFlowVersionSelected(event: DropdownChangeEvent) {
        this.selectedBusinessFlowVersionId = event.value; 
    }

    loadBusinessFlowVersion(selectedId?: number) {
        this.businessFlowService.getSpaceBusinessFlowVersions(this.space.id)
            .pipe(
                map(x => x.map(v => {
                    return {
                        id: v.id,
                        createdAt: 'Phiên bản ' + <string>new DatePipe('vi_VN').transform(v.createdAt, 'hh:mm dd/MM/yyyy')
                    }
                }))
            )
            .subscribe(x => {
                this.businessFlowVersions = x;
                if (selectedId) {
                    this.selectedBusinessFlowVersionId = selectedId;
                }
            });
    }

    onBusinessFlowUpdated(id: number) {
        this.space.latestPublishedBusinessFlowId = id;
        this.loadBusinessFlowVersion(id);
    }
}