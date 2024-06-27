import { Component, Input } from "@angular/core";
import { FormService } from "../../../core/services/form.service";
import { FormVersionDto, SpaceDetailDto } from "../../../core/schemas";
import { map } from "rxjs";
import { DatePipe } from "@angular/common";
import { ToastService } from "../../../core/services";
import { InputSwitchChangeEvent } from "primeng/inputswitch";

@Component({
    selector: 'app-space-form',
    templateUrl: 'space-form.component.html'
})
export class SpaceFormComponent {

    private _spaceId!: number;

    formVersions: FormVersionDto[] = [];

    versionId?: number;
    shareLink: string = "";
    isShared: boolean = false;
    shareDialogVisible: boolean = false;

    @Input()
    get spaceId() {
        return this._spaceId;
    }
    set spaceId(value: number) {
        this._spaceId = value;
        this.loadVersion();
    }

    @Input()
    space!: SpaceDetailDto;

    constructor(
        private formService: FormService,
        private toastService: ToastService,
    ) { }

    onFormUpdated(id: number) {
        this.loadVersion(id);
    }

    loadVersion(selectedId?: number) {
        this.formService.getSpaceVersions(this.spaceId)
            .pipe(
                map(x => x.map(v => {
                    return {
                        id: v.id,
                        createdAt: 'Phiên bản ' + <string>new DatePipe('vi_VN').transform(v.createdAt, 'hh:mm dd/MM/yyyy')
                    }
                }))
            )
            .subscribe(x => {
                this.formVersions = x;
                this.versionId = selectedId ?? this.formVersions[0].id;
            });
    }

    shareForm() {
        this.formService.generateFormLink(this.spaceId).subscribe({
          next: (response) => {
            this.isShared = response.isPublished;
            this.shareLink = window.location.origin + '/public-form?token=' + response.publicToken;
            this.shareDialogVisible = true;
          },
          error: () => {
            this.toastService.error('Không thể tạo liên kết chia sẻ');
          }
        });
    }

    toggleIshared(e: InputSwitchChangeEvent) {
        this.formService.toggleSharedStatus(this.spaceId, e.checked)
            .subscribe(x => {

            })
    }

    copyInputMessage(inputElement: any){
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        this.toastService.success("Sao chép thành công");
    }
}  