import { Injectable } from "@angular/core";
import { CreateCommentDto } from "../schemas";
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

}