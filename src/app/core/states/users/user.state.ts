import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserBasicDto } from "../../schemas";
import { Injectable } from "@angular/core";
import { TenantApiService } from "../../apis/tenant.api";
import { tap } from "rxjs";
import { GetUserById } from "./user.action";

interface IUserState {
    users: UserBasicDto[];
}

@State<IUserState>({
    name: 'user',
    defaults: {
        users: []
    }
})

@Injectable()
export class UserState {
    
    @Selector()
    public static getUsers(state: IUserState) : UserBasicDto[] {
        return state.users;
    } 

    constructor(
        private tenantApiService: TenantApiService
    ) { }

    @Action(GetUserById)
    public getStudentDetail(ctx: StateContext<IUserState>, action: GetUserById) {
        const state = ctx.getState();
        return this.tenantApiService.getUserById(action.id)
            .pipe(
                tap(x => ctx.patchState({
                    ...state,
                    users: [...state.users, x]
                }))
            )
    }
}