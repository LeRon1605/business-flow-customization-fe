import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-space-form',
    templateUrl: 'space-form.component.html'
})
export class SpaceFormComponent {

    @Input()
    spaceId!: number;

    versionId?: number;
}