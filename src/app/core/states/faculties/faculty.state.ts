import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { FacultyApiService } from "../../apis/faculty.api";
import { FacultyViewModel } from "../../schemas/faculty.schema";
import { GetFaculties } from "./faculty.action";

interface IFacultyState {
    faculties: FacultyViewModel[]
}

@State<IFacultyState>({
    name: 'Facultys',
    defaults: {
        faculties: []
    }
})
@Injectable()
export class FacultyState { 

    @Selector()
    public static getFacultys(state: IFacultyState) : FacultyViewModel[] {
        return state.faculties;
    }

    constructor(
        private facultyApiService: FacultyApiService
    ) { }

    @Action(GetFaculties)
    public getFaculty(ctx: StateContext<IFacultyState>) {
        const state = ctx.getState();
        return this.facultyApiService.getAllFaculties()
            .pipe(
                tap(x => ctx.setState({
                    ...state,
                    faculties: x
                }))
            )
    }
    
}   