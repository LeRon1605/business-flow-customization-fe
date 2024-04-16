import { Injectable } from "@angular/core";
import { StudentDetailViewModel } from "../../schemas/student.schema";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StudentApiService } from "../../apis/student.api";
import { GetStudentById } from "./student.action";
import { tap } from "rxjs";

interface IStudentState {
    students: StudentDetailViewModel[];
}

@State<IStudentState>({
    name: 'student',
    defaults: {
        students: []
    }
})
@Injectable()
export class StudentState {
    
    @Selector()
    public static getStudents(state: IStudentState) : StudentDetailViewModel[] {
        return state.students;
    } 

    constructor(
        private studentApiService: StudentApiService
    ) { }

    @Action(GetStudentById)
    public getStudentDetail(ctx: StateContext<IStudentState>, action: GetStudentById) {
        const state = ctx.getState();
        return this.studentApiService.getById(action.id)
            .pipe(
                tap(x => ctx.patchState({
                    ...state,
                    students: [...state.students, x]
                }))
            )
    }
}