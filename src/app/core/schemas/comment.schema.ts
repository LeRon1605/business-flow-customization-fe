export interface CreateCommentDto {
    content: string;
    parentId?: string;
    mentions: CommentMentionDto[];
}

export interface CommentDto {
    id: string;
    content: string;
    parentId?: string;
    mentions: CommentMentionDto[];
    createdAt: string;
    lastModified?: string;
    createdBy: string;
    lastModifiedBy?: string;
}

export interface CommentMentionDto {
    entityType: MentionEntity;
    entityIds: string[];
}

export enum MentionEntity
{
    User
} 