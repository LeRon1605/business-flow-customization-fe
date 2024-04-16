import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { HttpParams } from "@angular/common/http";
import { HomeRoomViewModel } from "../schemas/home-room.schema";

@Injectable({ providedIn: 'root' })
export class HomeRoomApiService extends BaseApiService {
    getAllHomeRooms(facultyId?: string) {
        return this.http.get<HomeRoomViewModel[]>(this.API_END_POINTS.HOOMROOM, {
            params: this.getParams(facultyId)
        })
    }

    getParams(facultyId?: string) : HttpParams {
        let params: HttpParams = new HttpParams();

        if (facultyId) {
            params = params.append('facultyId', facultyId!);
        }

        return params;
    }
}