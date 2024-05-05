import { Injectable } from "@angular/core";
import { SpaceApiService } from "../apis/space.api";
import { CreateSpaceDto, SpaceDto } from "../schemas";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SpaceService {

    spaces: SpaceDto[] = [];
    spaces$: BehaviorSubject<SpaceDto[]> = new BehaviorSubject<SpaceDto[]>([]);
    create$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private spaceApiService: SpaceApiService
    ) { }

    load() {
        this.getAll()
            .subscribe(x => {
                this.spaces = x;
                this.spaces$.next(this.spaces);
            });
    }

    triggerCreate() {
        this.create$.next(true);
    }

    create(data: CreateSpaceDto) {
        return this.spaceApiService.create(data);
    }

    getById(id: number) {
        return this.spaceApiService.getById(id);
    }

    getAll() {
        return this.spaceApiService.getAll();
    }
}