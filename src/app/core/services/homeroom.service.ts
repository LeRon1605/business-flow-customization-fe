import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { HomeRoomState } from "../states/home-rooms/home-room.state";
import { HomeRoomViewModel } from "../schemas/home-room.schema";
import { Observable, map, switchMap } from "rxjs";
import { GetHomeRooms } from "../states/home-rooms/home-room.action";
import { DropDownItem } from "../../shared/components/form-controls/dropwdown-input/dropdown-input.component";

@Injectable({ providedIn: 'root' })
export class HomeRoomService {

    @Select(HomeRoomState.getHomeRooms)
    homeRooms$!: Observable<HomeRoomViewModel[]>;

    constructor(
        private store: Store
    ) {}

    getHomeRoomByFaculty(facultyId: string) {
        return this.getAllHomeRoom()
            .pipe(map(x => x.filter(h => h.facultyId == facultyId)));
    }

    getAllHomeRoom() {
        if (this.store.selectSnapshot(HomeRoomState.getHomeRooms).length == 0)
            return this.store.dispatch(new GetHomeRooms())
                .pipe(switchMap(_ => this.homeRooms$));

        return this.homeRooms$;
    }

    getDropDownItems(facultyId: string) : Observable<DropDownItem[]> {
        return this.getHomeRoomByFaculty(facultyId).pipe(
            map(x => x.map(f => {
                return {
                    text: f.name,
                    value: f.id
                }
            }))
        )
    }
}