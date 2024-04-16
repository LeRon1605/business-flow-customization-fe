import { Component, NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;

  constructor() { }
}

@NgModule({
  imports: [ CommonModule ],
  exports: [ SingleCardComponent ],
  declarations: [ SingleCardComponent ]
})
export class SingleCardModule {
  
}
