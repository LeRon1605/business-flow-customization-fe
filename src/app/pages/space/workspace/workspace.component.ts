import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem, PrimeIcons } from "primeng/api";
import { Subscription } from "rxjs";
import { SpaceDetailDto } from "../../../core/schemas";
import { SpaceService } from "../../../core/services/space.service";

@Component({
    selector: 'app-work-space',
    styleUrl: 'workspace.component.scss',
    templateUrl: 'workspace.component.html'
})
export class WorkSpaceComponent implements OnInit, OnDestroy {
    
    activeIndex!: number;

    spaceId!: number;
    routeSub!: Subscription;
    space?: SpaceDetailDto;

    items: MenuItem[] = [
        { label: 'Chỉnh sửa', icon: PrimeIcons.PENCIL },
        { label: 'Xóa', icon: PrimeIcons.TRASH }
    ]

    constructor(
        private route: ActivatedRoute,
        private spaceService: SpaceService
    ) { }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(x => {
            if (x['id'] != this.spaceId) {
                this.activeIndex = 0;
                this.spaceId = x['id'];
                this.spaceService.getById(this.spaceId)
                    .subscribe(x => {
                        this.space = x;
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

}