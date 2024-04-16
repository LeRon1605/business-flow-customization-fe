import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { EducationProgramViewModel } from "../schemas/education-program.schema";

@Injectable({ providedIn: 'root' })
export class EducationProgramApiService extends BaseApiService {
    getAllEducationPrograms() {
        return this.http.get<EducationProgramViewModel[]>(this.API_END_POINTS.EDUCATION_PROGRAM);
    }
}