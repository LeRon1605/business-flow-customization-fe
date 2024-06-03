import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CommentDto, CreateCommentDto, PagedResult } from "../schemas";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CommentApiService extends BaseApiService {

    getSubmissionComment(submissionId: number, page: number, size: number) {
        let params: HttpParams = new HttpParams()
            .append('page', page)
            .append('size', size);
            
        return this.http.get<PagedResult<CommentDto>>(this.API_END_POINTS.COMMENTS + `/submissions/${submissionId}`, {
            params
        });
    }

    createSubmissionComment(submissionId: number, comment: CreateCommentDto) {
        return this.http.post<{ id: string }>(this.API_END_POINTS.COMMENTS + `/submissions/${submissionId}`, comment);
    }

}