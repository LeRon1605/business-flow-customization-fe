import { EducationProgramViewModel } from "./education-program.schema";
import { FacultyViewModel } from "./faculty.schema";
import { HomeRoomViewModel } from "./home-room.schema";
import { PagedRequest } from "./paged.schema";

export interface BaseStudentViewModel {
    id: string;
    code: string;
    fullName: string;
    dateOfBirth: string;
    homeTown: string;
    address: string;
    imageUrl: string;
    citizenId: string;
    email: string;
    phone: string;
    identityId: string;
}

export interface StudentViewModel extends BaseStudentViewModel {
    faculty: FacultyViewModel;
    homeRoom: HomeRoomViewModel;
    educationProgram: EducationProgramViewModel;
}

export interface StudentDetailViewModel extends BaseStudentViewModel {
    homeRoomId: string;
    educationProgramId: string;
    facultyId: string;
}

export interface StudentFilterAndPagingRequest extends PagedRequest {
    homeRoomId?: string;
    facultyId?: string;
    educationProgramId?: string;
    gender?: boolean;
}