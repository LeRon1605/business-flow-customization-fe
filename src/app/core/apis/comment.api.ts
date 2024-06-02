import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CommentDto, CreateCommentDto, PagedResult } from "../schemas";

@Injectable({ providedIn: 'root' })
export class CommentApiService extends BaseApiService {

    getSubmissionComment(submissionId: number, page: number, size: number) {
        return this.http.get<PagedResult<CommentDto>>(this.API_END_POINTS.COMMENTS + `/submissions/${submissionId}`);
    }

    createSubmissionComment(submissionId: number, comment: CreateCommentDto) {
        return this.http.post<{ id: string }>(this.API_END_POINTS.COMMENTS + `/submissions/${submissionId}`, comment);
    }

}