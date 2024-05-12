import { Component, Input } from "@angular/core";
import { FormService } from "../../../core/services/form.service";
import { FormVersionDto } from "../../../core/schemas";
import { map } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-space-form',
    templateUrl: 'space-form.component.html'
})
export class SpaceFormComponent {

    private _spaceId!: number;

    formVersions: FormVersionDto[] = [];

    versionId?: number;

    @Input()
    get spaceId() {
        return this._spaceId;
    }
    set spaceId(value: number) {
        this._spaceId = value;
        this.loadVersion();
    }

    constructor(
        private formService: FormService
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
}  