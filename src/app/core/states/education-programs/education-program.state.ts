import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EducationProgramViewModel } from "../../schemas/education-program.schema";
import { Injectable } from "@angular/core";
import { GetEducationPrograms } from "./education-program.action";
import { tap } from "rxjs";
import { EducationProgramApiService } from "../../apis/education-program.api";

interface IEducationProgramState {
    educationPrograms: EducationProgramViewModel[]
}

@State<IEducationProgramState>({
    name: 'educationprograms',
    defaults: {
        educationPrograms: []
    }
})
@Injectable()
export class EducationProgramState { 

    @Selector()
    public static getEducationPrograms(state: IEducationProgramState) : EducationProgramViewModel[] {
        return state.educationPrograms;
    }

    constructor(
        private educationProgramApiService: EducationProgramApiService
    ) { }

    @Action(GetEducationPrograms)
    public getEducationProgram(ctx: StateContext<IEducationProgramState>) {
        const state = ctx.getState();
        console.log(state);
        return this.educationProgramApiService.getAllEducationPrograms()
            .pipe(
                tap(x => ctx.setState({
                    ...state,
                    educationPrograms: x
                }))
            )
    }
}   