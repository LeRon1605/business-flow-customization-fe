import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { BasicUserInfo, NotificationDto, NotificationStatus, NotificationType } from "../../../core/schemas";
import { UserStorageService } from "../../../core/services";
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-notification-item',
    templateUrl: 'notification-item.component.html'
})
export class NotificationItemComponent implements OnInit, OnDestroy {
    
    @Input()
    item!: NotificationDto;

    @Input()
    styleClass?: string;

    @Output()
    readNotification = new EventEmitter<string>();

    tenantUsers: BasicUserInfo[] = [];

    subscription!: Subscription;

    constructor(
        private notificationService: NotificationService,
        private userStorageService: UserStorageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.subscription = this.userStorageService.currentUser.subscribe(x => {
            if (x)
                this.tenantUsers = x.tenantUsers;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    user(id: string) : BasicUserInfo | undefined {
        return this.tenantUsers.find(x => x.id == id);
    }

    onClickNotification(notification: NotificationDto) {
        if (notification.status == NotificationStatus.UnRead) {
            this.notificationService.markRead(notification.id)
                .subscribe(x => {
                    notification.status = NotificationStatus.Read;
                    this.readNotification.emit(this.item.id);
                })
        }

        switch (notification.type) {
            case NotificationType.PersonInChargeAssigned:
                this.onPersonInChargeAssignedNotification(notification);
                break;

            case NotificationType.UserInvitationAccepted:
                this.onInvitationAcceptedNotification(notification);
                break;

            case NotificationType.SubmissionCommentMentioned:
            case NotificationType.SubmissionComment:
                this.onSubmissionCommentNotification(notification);
                break;
            case NotificationType.MemberAddedToSpace:
                this.onMemberAddedToSpaceNotification(notification);
                break;
        }
    }

    onPersonInChargeAssignedNotification(notification: NotificationDto) {
        const data : { SpaceId: string, BusinessFlowBlockId: string, SubmissionId: string, FormVersionId: string } = JSON.parse(notification.metaData);
        
        this.router.navigate([`/space/${data.SpaceId}`], { queryParams: { submissionId: data.SubmissionId, versionId: data.FormVersionId } });
    }

    onInvitationAcceptedNotification(notification: NotificationDto) {
        this.router.navigate(['/tenant']);
    }

    onSubmissionCommentNotification(notification: NotificationDto) {
        const data : { SpaceId: string, SubmissionId: string, FormVersionId: string } = JSON.parse(notification.metaData);
        
        this.router.navigate([`/space/${data.SpaceId}`], { queryParams: { submissionId: data.SubmissionId, versionId: data.FormVersionId } });
    }

    onMemberAddedToSpaceNotification(notification: NotificationDto) {
        const data : { SpaceId: string } = JSON.parse(notification.metaData);
        
        this.router.navigate([`/space/${data.SpaceId}`]);
    }
}