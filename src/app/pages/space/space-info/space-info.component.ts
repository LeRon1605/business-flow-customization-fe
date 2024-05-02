import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-space-info',
    templateUrl: 'space-info.component.html'
})  
export class SpaceInfoComponent {
    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        color: new FormControl('#3B82F6', [Validators.required])
    });
}