import { Component, Input, OnInit } from "@angular/core";
import { SpaceDetailDto } from "../../../core/schemas";
import { MenuItem, PrimeIcons } from "primeng/api";

@Component({
    selector: 'app-space-header',
    templateUrl: 'space-header.component.html'
})
export class SpaceHeaderComponent implements OnInit {
    
    @Input()
    space?: SpaceDetailDto;

    items: MenuItem[] = [
        { label: 'Chỉnh sửa', icon: PrimeIcons.PENCIL },
        { label: 'Xóa', icon: PrimeIcons.TRASH }
    ]

    ngOnInit(): void {
    }

}