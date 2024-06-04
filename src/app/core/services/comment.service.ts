import { Injectable } from "@angular/core";
import { CommentDto, CreateCommentDto } from "../schemas";
import { CommentApiService } from "../apis/comment.api";

@Injectable({ providedIn: 'root' })
export class CommentService {

    constructor(
        private commentApiService: CommentApiService
    ) { }

    getSubmissionComment(submissionId: number, page: number, size: number) {
        return this.commentApiService.getSubmissionComment(submissionId, page, size);
    }

    createSubmissionComment(submissionId: number, comment: CreateCommentDto) {
        return this.commentApiService.createSubmissionComment(submissionId, comment);
    }

    deleteComment(id: string) {
        return this.commentApiService.deleteComment(id);
    }

    updateComment(id: string, comment: CreateCommentDto) {
        return this.commentApiService.updateComment(id, comment.content, comment.mentions);
    }

}