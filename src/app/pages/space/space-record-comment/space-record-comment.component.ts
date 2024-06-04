import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Editor } from "primeng/editor";
import Quill from "quill";
import "quill-mention";
import {Mention, MentionBlot} from "quill-mention";
import { CommentService } from "../../../core/services/comment.service";
import { BasicUserInfo, CommentDto, CreateCommentDto, MentionEntity, NotificationType, UserInfo } from "../../../core/schemas";
import { ToastService, UserStorageService } from "../../../core/services";
import { Subscription, finalize } from "rxjs";
import { Scroller, ScrollerScrollIndexChangeEvent } from "primeng/scroller";
import { SignalrService } from "../../../core/services/realtime-client.service";

Quill.register({ "blots/mention": MentionBlot, "modules/mention": Mention });

@Component({
    selector: 'app-space-record-comment',
    styleUrl: 'space-record-comment.component.scss',
    templateUrl: 'space-record-comment.component.html',
})
export class SpaceRecordCommentComponent implements OnInit, OnDestroy {

    @Input()
    submissionId!: number;

    @ViewChild('editor') 
    editor!: Editor;

    @ViewChild('sc') 
    sc!: Scroller;
    
    text!: string;

    currentPage!: number;
    totalPage!: number;
    total!: number;
    isFirstLoading: boolean = false;
    isLoading: boolean = false;
    loadedPages: number[] = [];
    comments: CommentDto[] = [];
    editingComment?: CommentDto;

    isHasNewComment: boolean = false;

    subscription!: Subscription;
    newCommentSubscription!: Subscription;

    currentUser!: UserInfo;
    tenantUsers: BasicUserInfo[] = [];
    lookupMention: any[] = [];
    
    modules = {
        mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@"],
            source: (searchTerm: any, renderList: any, mentionChar: any) => {
                if (searchTerm.length === 0) {
                    renderList(this.lookupMention, searchTerm);
                } else {
                    const matches = [];

                    for (let i = 0; i < this.lookupMention.length; i++) {
                        const isValid = ~this.lookupMention[i].fullName.toLowerCase().indexOf(searchTerm.toLowerCase());
                        if (isValid)
                            matches.push(this.lookupMention[i]);
                    }

                    renderList(matches, searchTerm);
                }
            }
        }
    }

    constructor(
        private commentService: CommentService,
        private userStorageService: UserStorageService,
        private toastService: ToastService,
        private realtimeService: SignalrService
    ) { }

    ngOnInit(): void {
        this.subscription = this.userStorageService.currentUser.subscribe(x => {
            if (x) {
                this.currentUser = x;
                this.tenantUsers = x.tenantUsers;
                this.lookupMention = x.tenantUsers.filter(u => u.id != x.id).map(u => {
                    return {
                        id: u.id,
                        value: u.fullName
                    }
                });
            }   
        });

        this.newCommentSubscription = this.realtimeService.notification$.subscribe(x => {
            if (x.type == NotificationType.SubmissionComment || x.type == NotificationType.SubmissionCommentMentioned) {
                const data : { SubmissionId: string } = JSON.parse(x.metaData);
                if (data.SubmissionId == this.submissionId.toString())
                    this.isHasNewComment = true;
            }
        });

        this.loadInit();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.newCommentSubscription.unsubscribe();
    }

    loadInit() {
        this.total = 0;
        this.totalPage = 0;
        this.comments = [];
        this.isLoading = false;
        this.loadedPages = [];
        this.isFirstLoading = true;

        this.commentService.getSubmissionComment(this.submissionId, 1, 20)
            .pipe(
                finalize(() => {
                    this.isFirstLoading = false;
                })
            )
            .subscribe(x => {
                this.totalPage = x.totalPages;
                this.total = x.total;
                this.comments = x.data;
                this.loadedPages.push(1);
                this.sc.scrollToIndex(0, 'smooth');
            })
    }

    user(id: string) : BasicUserInfo | undefined {
        return this.tenantUsers.find(x => x.id == id);
    }

    sendMessage() {
        const delta = this.editor.getQuill().getContents();
        const userMentions = delta.ops
            .filter((x: any) => x.insert?.mention)
            .map((x: any) => x.insert?.mention)
            .map((x: any) => x.id);

        const comment : CreateCommentDto = {
            content: this.text.trim(),
            mentions: [
                {
                    entityType: MentionEntity.User,
                    entityIds: userMentions
                }
            ]
        }

        if (this.editingComment) {
            this.commentService.updateComment(this.editingComment.id, comment)
                .subscribe(x => {
                    this.toastService.success('Chỉnh sửa bình luận thành công');
                    this.text = '';
                    this.loadInit();
                });

            this.editingComment = undefined;
        } else {
            this.commentService.createSubmissionComment(this.submissionId, comment)
                .subscribe(x => {
                    this.text = '';
                    this.loadInit();
                });
        }
    }

    onScroll($event: ScrollerScrollIndexChangeEvent) {
        this.currentPage = Math.floor($event.last / 20);
        if (this.currentPage == this.totalPage || this.isLoading)
            return;

        const isLastOfCurrentPage = $event.last == (this.currentPage * 20);
        if (isLastOfCurrentPage && !this.loadedPages.includes(this.currentPage + 1)) {
            this.isLoading = true;
            this.loadedPages.push(this.currentPage + 1);
            this.commentService.getSubmissionComment(this.submissionId, this.currentPage + 1, 20)
                .pipe(
                    finalize(() => this.isLoading = false)
                )
                .subscribe(x => {
                    this.comments = [...this.comments, ...x.data];
                });
        }
    }

    onEdit(comment: CommentDto) {
        this.editor.quill.root.innerHTML = comment.content;
        this.editingComment = comment;
    }

    unEdit() {
        this.editor.quill.root.innerHTML = '';
        this.editingComment = undefined;
    }

    onDelete(comment: CommentDto) {
        this.commentService.deleteComment(comment.id)
            .subscribe(x => {
                this.loadInit();
                this.toastService.success('Xóa bình luận thành công');
            });
    }

    loadNewComment() {
        this.loadInit();
        this.isHasNewComment = false;
    }
}