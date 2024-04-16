import { Injectable } from "@angular/core";
import { StudentApiService } from "../apis/student.api";
import { Select, Store } from "@ngxs/store";
import { StudentState } from "../states/students/student.state";
import { Observable, map, switchMap } from "rxjs";
import { StudentDetailViewModel } from "../schemas/student.schema";
import { GetStudentById } from "../states/students/student.action";

@Injectable({ providedIn: 'root' })
export class StudentService {

    @Select(StudentState.getStudents)
    student$!: Observable<StudentDetailViewModel[]>;

    constructor(
        private studentApiService: StudentApiService,
        private store: Store
    ) { }

    getAllStudents(page: number
        , size: number
        , searchText: string
        , facultyId?: string
        , homeRoomId?: string
        , educationProgramId?: string
        , gender?: boolean) {

        return this.studentApiService.getAllStudents({
            page, 
            size,
            search: searchText,
            facultyId,
            homeRoomId,
            educationProgramId,
            gender
        });
    }

    getById(id: string) : Observable<StudentDetailViewModel | undefined> {
        const isStudentExistedInStore = this.store
            .selectSnapshot(StudentState.getStudents)
            .some(x => x.id == id);

        const getStudentById$ = this.student$.pipe(
            map(x => x.find(s => s.id === id))
        );
        
        if (!isStudentExistedInStore)
            return this.store.dispatch(new GetStudentById(id))
                .pipe(switchMap(_ => getStudentById$));

        return getStudentById$;
    }
}