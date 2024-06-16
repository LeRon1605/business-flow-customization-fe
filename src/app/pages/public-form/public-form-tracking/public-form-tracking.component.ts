import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormService } from "../../../core/services/form.service";
import { FormDto, SubmissionDto } from "../../../core/schemas";

@Component({
    selector: 'app-public-form-tracking',
    templateUrl: 'public-form-tracking.component.html'
})
export class PublicFormTrackingComponent implements OnInit {
    
    form?: FormDto;
    submission?: SubmissionDto;
    token?: string;
    isValidToken: boolean | null = null;

    constructor(
        private formService: FormService,
        private route: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.token = params['Token'];
            if (this.token) {

                this.formService.getSubmissionByTrackingToken(this.token)
                    .subscribe(x => {
                        this.submission = x;
                        this.isValidToken = true;
                    }, error => {
                        this.isValidToken = false;
                    });

            } else {
                this.isValidToken = false
            }
          });
    }

}