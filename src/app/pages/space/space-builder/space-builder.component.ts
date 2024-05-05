import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TabViewChangeEvent } from "primeng/tabview";
import { BusinessFlowComponent } from "../../business-flow/business-flow.component";
import { SpaceInfoComponent } from "../space-info/space-info.component";
import { ToastService } from "../../../core/services";
import { CreateSpaceDto } from "../../../core/schemas";
import { SpaceService } from "../../../core/services/space.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-space-builder',
    styleUrl: 'space-builder.component.scss',
    templateUrl: 'space-builder.component.html'
})
export class SpaceBuilderComponent implements OnInit, OnDestroy {
    visible: boolean = false;
    previousTabIndex: number = 0;
    navigatedTabs: number[] = [];

    @ViewChild('spaceInfo')
    spaceInfo!: SpaceInfoComponent;

    @ViewChild('businessFlow')
    businessFlow!: BusinessFlowComponent;

    visibleSubscription!: Subscription;

    constructor(
        private toastService: ToastService,
        private spaceService: SpaceService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.visibleSubscription = this.spaceService.create$.subscribe(x => {
            if (!this.visible) {
                this.visible = true;
                this.previousTabIndex = 0;
                this.navigatedTabs = [];
            }
        })
    }

    ngOnDestroy(): void {
        this.visibleSubscription.unsubscribe();
    }

    get valid() {
        return this.spaceInfo.valid && this.businessFlow.valid;
    }

    onCreateSpace(e: MouseEvent) {
        e.stopPropagation();

        if (!this.valid) {
            this.toastService.error('Thông tin không hợp lệ');
            return;
        }

        const businessFlow = this.businessFlow.data;
        const spaceInfo = this.spaceInfo.data;

        const data : CreateSpaceDto = {
            name: spaceInfo.name,
            description: spaceInfo.description,
            color: spaceInfo.color,
            businessFlow: businessFlow
        };

        this.spaceService.create(data)
            .subscribe(x => {
                this.spaceService.load();
                this.toastService.success('Khởi tạo không gian thành công');
                this.visible = false;
                this.router.navigate(['space', x.id]);
            });
    }
    
    onTabNavigated(e: TabViewChangeEvent) {
        if (!this.navigatedTabs.includes(this.previousTabIndex)) {
            this.navigatedTabs.push(this.previousTabIndex);
        }

        this.previousTabIndex = e.index;
    }
}