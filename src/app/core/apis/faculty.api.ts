import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { Observable } from "rxjs";
import { FacultyViewModel } from "../schemas/faculty.schema";

@Injectable({ providedIn: 'root' })
export class FacultyApiService extends BaseApiService {
    getAllFaculties() : Observable<FacultyViewModel[]> {
        return this.http.get<FacultyViewModel[]>(this.API_END_POINTS.FACULTY);
    }
}