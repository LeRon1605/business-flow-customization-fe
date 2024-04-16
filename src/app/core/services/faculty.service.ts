import { Injectable } from "@angular/core";
import { FacultyState } from "../states/faculties/faculty.state";
import { Select, Store } from "@ngxs/store";
import { Observable, map, switchMap } from "rxjs";
import { FacultyViewModel } from "../schemas/faculty.schema";
import { GetFaculties } from "../states/faculties/faculty.action";
import { DropDownItem } from "../../shared/components/form-controls/dropwdown-input/dropdown-input.component";

@Injectable({ providedIn: 'root' })
export class FacultyService {
    
    @Select(FacultyState.getFacultys)
    faculties$!: Observable<FacultyViewModel[]>;

    constructor(
        private store: Store
    ) {}

    getAllFaculties() : Observable<FacultyViewModel[]> {
        if (this.store.selectSnapshot(FacultyState.getFacultys).length == 0)
            return this.store.dispatch(new GetFaculties())
                .pipe(switchMap(_ => this.faculties$));

        return this.faculties$;
    }

    getDropDownItems() : Observable<DropDownItem[]> {
        return this.getAllFaculties().pipe(
            map(x => x.map(f => {
                return {
                    text: f.name,
                    value: f.id
                }
            }))
        )
    }
}