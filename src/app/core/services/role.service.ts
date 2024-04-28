import { Injectable } from "@angular/core";
import { RoleApiService } from "../apis/role.api";
import { Observable, map } from "rxjs";
import { DropDownItem } from "../../shared/components/form-controls/dropwdown-input/dropdown-input.component";

@Injectable({ providedIn: 'root' })
export class RoleService {

    constructor(
        private roleApiService: RoleApiService
    ) { }

    getDropDownItems() : Observable<DropDownItem[]> {
        return this.roleApiService.getAllRoles()
            .pipe(
                map(x => {
                    return x.data.map(role => {
                        return {
                            value: role.id,
                            text: role.name
                        };
                    })
                })
            );
    }
}