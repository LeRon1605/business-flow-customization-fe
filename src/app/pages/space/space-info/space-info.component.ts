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

    get valid() : boolean {
        return this.form.valid;
    }

    get data() : { name: string; color: string, description: string } {
        return {
            name: <string>this.form.value.name,
            description: <string>this.form.value.description,
            color: <string>this.form.value.color
        }
    }
}