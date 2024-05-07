import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SpaceDetailDto } from "../../../core/schemas";
import { SpaceService } from "../../../core/services/space.service";

@Injectable()
export class WorkSpaceService {

    currentSpace$: BehaviorSubject<SpaceDetailDto | undefined> = new BehaviorSubject<SpaceDetailDto | undefined>(undefined);

    constructor(
        private spaceService: SpaceService
    ) { }

    load(id: number) {
        this.spaceService.getById(id)
            .subscribe(x => {
                this.currentSpace$.next(x);
            })
    }

}