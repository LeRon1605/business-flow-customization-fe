import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { HomeRoomViewModel } from "../../schemas/home-room.schema";
import { HomeRoomApiService } from "../../apis/homeroom.api";
import { GetHomeRooms } from "./home-room.action";

interface IHomeRoomState {
    homeRooms: HomeRoomViewModel[]
}

@State<IHomeRoomState>({
    name: 'homeRooms',
    defaults: {
        homeRooms: []
    }
})
@Injectable()
export class HomeRoomState { 

    @Selector()
    public static getHomeRooms(state: IHomeRoomState) : HomeRoomViewModel[] {
        return state.homeRooms;
    }

    constructor(
        private homeRoomApiService: HomeRoomApiService
    ) { }

    @Action(GetHomeRooms)
    public getHomeRoom(ctx: StateContext<IHomeRoomState>) {
        const state = ctx.getState();
        return this.homeRoomApiService.getAllHomeRooms()
            .pipe(
                tap(x => ctx.setState({
                    ...state,
                    homeRooms: x
                }))
            )
    }
    
}   