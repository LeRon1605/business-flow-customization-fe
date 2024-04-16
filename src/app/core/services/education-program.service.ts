import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { GetEducationPrograms } from "../states/education-programs/education-program.action";
import { EducationProgramState } from "../states/education-programs/education-program.state";
import { Observable, map, switchMap } from "rxjs";
import { EducationProgramViewModel } from "../schemas/education-program.schema";
import { DropDownItem } from "../../shared/components/form-controls/dropwdown-input/dropdown-input.component";

@Injectable({ providedIn: 'root' })
export class EducationProgramService {
    
    @Select(EducationProgramState.getEducationPrograms)
    educationPrograms$!: Observable<EducationProgramViewModel[]>;

    constructor(
        private store: Store
    ) { }

    getAllEducationPrograms() {
        if (this.store.selectSnapshot(EducationProgramState.getEducationPrograms).length == 0)
            return this.store.dispatch(new GetEducationPrograms())
                .pipe(switchMap(_ => this.educationPrograms$));

        return this.educationPrograms$;
    }

    getDropDownItems() : Observable<DropDownItem[]> {
        return this.getAllEducationPrograms().pipe(
            map(x => x.map(f => {
                return {
                    text: f.name,
                    value: f.id
                }
            }))
        ) 
    }
}