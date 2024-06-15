export interface NotificationDto {
    id: string
    title: string
    content: string
    type: NotificationType
    status: NotificationStatus
    metaData: string
    senderId: string
    created: Date
}

export enum NotificationStatus {
    Read,
    UnRead
}

export enum NotificationType {
    PersonInChargeAssigned,
    SubmissionExecutionInitiated,
    UserInvitationAccepted,
    SubmissionCommentMentioned,
    SubmissionComment,
    MemberAddedToSpace
}