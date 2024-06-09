import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../core/services/form.service';
import { FormDto } from '../../core/schemas';

@Component({
  selector: 'app-public-form',
  templateUrl: './public-form.component.html',
})
export class PublicFormComponent implements OnInit {
  isValidToken: boolean | null = null;
  token: string | null = null;
  form?: FormDto;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      if (this.token) {
        this.loadForm(this.token);
      } else {
        this.isValidToken = false;
      }
    });
  }

  loadForm(token: string): void {
    this.formService.getPublicForm(token).subscribe(
      result => {
        this.form = result;
        this.isValidToken = true;
      },
      error => {
        console.error('Error loading form:', error);
        this.isValidToken = false;
      }
    );
  }

  submit(): void {
    console.log('Form submitted');
  }
}
