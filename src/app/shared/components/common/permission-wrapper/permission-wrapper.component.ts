import { Component, Input, OnInit } from "@angular/core";
import { UserInfo } from "../../../../core/schemas/user.schema";
import { UserStorageService } from "../../../../core/services";

@Component({
    selector: 'app-permission-wrapper',
    templateUrl: './permission-wrapper.component.html'
})
export class PermissionWrapperComponent implements OnInit {

    @Input()
    permission!: string;

    user?: UserInfo | null;

    get hasPermission() {
        if (this.user)
            return this.user.permissions.includes(this.permission);

        return false;
    }

    constructor(
        private userStorageService: UserStorageService
    ) { }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => this.user = x)
    }
}