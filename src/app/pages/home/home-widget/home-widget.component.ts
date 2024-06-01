import { Component, Input, OnInit } from "@angular/core";
import { InChargeSubmissionDto, NotificationDto, SpaceDto, SubmittableFormDto, WidgetType } from "../../../core/schemas";
import { SpaceService } from "../../../core/services/space.service";
import { finalize } from "rxjs";
import { NotificationService } from "../../../core/services/notification.service";
import { Router } from "@angular/router";
import { FormService } from "../../../core/services/form.service";

@Component({
    selector: 'app-home-widget',
    styleUrl: 'home-widget.component.scss',
    templateUrl: 'home-widget.component.html'
})
export class HomeWidgetComponent implements OnInit {

    @Input()
    type!: WidgetType;

    spaceId?: number;
    addSubmitVisible: boolean = false;
    isLoading: boolean = false;

    spaces: SpaceDto[] = [];
    notifications: NotificationDto[] = [];
    forms: SubmittableFormDto[] = [];
    submissions: InChargeSubmissionDto[] = [];

    constructor(
        private spaceService: SpaceService,
        private notificationService: NotificationService,
        private formService: FormService,
        private router: Router
    ) { }

    get name() {
        switch (this.type) {
            case WidgetType.Notification:
                return 'Thông báo';

            case WidgetType.Record:
                return 'Bản ghi phụ trách';

            case WidgetType.Space:
                return 'Quy trình nghiệp vụ';

            case WidgetType.Form:
                return 'Biểu mẫu';
        }
    }

    ngOnInit() {
        this.isLoading = true;

        switch (this.type) {
            case WidgetType.Space:
                this.spaceService.getAll()
                    .pipe(
                        finalize(() => {
                            this.isLoading = false;
                        })
                    )
                    .subscribe(x => {
                        this.spaces = x;
                    });

                break;

            case WidgetType.Notification:
                this.notificationService.getNotification()
                    .pipe(
                        finalize(() => {
                            this.isLoading = false;
                        })
                    )
                    .subscribe(x => {
                        this.notifications = x.data;
                    });

                break;

            case WidgetType.Form:
                this.formService.getSubmittableForms()
                    .pipe(
                        finalize(() => {
                            this.isLoading = false;
                        })
                    )
                    .subscribe(x => {
                        this.forms = x;
                    });

                break;

            case WidgetType.Record:
                this.formService.getInChargeSubmissions()
                    .pipe(
                        finalize(() => {
                            this.isLoading = false;
                        })
                    )
                    .subscribe(x => {
                        this.submissions = x;
                    });

                break;
        }
    }

    onSpaceClick(space: SpaceDto) {
        this.router.navigate(['/space', space.id]);
    }

    onFormClick(form: SubmittableFormDto) {
        this.addSubmitVisible = true;
        this.spaceId = form.spaceId
    }

    onSubmissionClick(submission: InChargeSubmissionDto) {
        this.router.navigate([`/space/${submission.spaceId}`], { queryParams: { submissionId: submission.id, versionId: submission.formVersionId } });
    }
}