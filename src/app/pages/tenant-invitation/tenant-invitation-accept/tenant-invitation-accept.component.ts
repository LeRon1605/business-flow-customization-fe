import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TenantService } from "../../../core/services";
import { finalize } from "rxjs";

@Component({
    selector: 'app-tenant-invitation-accept',
    templateUrl: './tenant-invitation-accept.component.html'
})
export class TenantInvitationAcceptComponent implements OnInit {
    
    token!: string;
    isValidRequest!: boolean;
    isInitUser: boolean = false;
    loading: boolean = true;
    isSuccess: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private tenantService: TenantService
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('Token') || '';
        this.isValidRequest = this.token != '';

        if (this.isValidRequest) {
            this.tenantService.acceptInvitation(this.token)
                .pipe(
                    finalize(() => this.loading = false)
                )
                .subscribe(
                    x => {
                        this.isInitUser = !x.isUserExisted;
                    }, 
                    () => {
                        this.isValidRequest = false;
                    }
                )
        }
    } 

    onSubmit() {

    }

}