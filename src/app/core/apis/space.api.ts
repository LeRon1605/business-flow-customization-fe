import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CreateSpaceDto, SpaceDetailDto, SpaceDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class SpaceApiService extends BaseApiService {

    create(data: CreateSpaceDto) {
        return this.http.post<{ id: number }>(this.API_END_POINTS.SPACE, data);
    }

    getAll() {
        return this.http.get<SpaceDto[]>(this.API_END_POINTS.SPACE);
    }

    getById(id: number) {
        return this.http.get<SpaceDetailDto>(`${this.API_END_POINTS.SPACE}/${id}`);
    }
}