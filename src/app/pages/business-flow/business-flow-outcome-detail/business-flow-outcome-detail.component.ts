import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Node } from "@kr0san89/ngx-graph";
import { BusinessFlowOutComeDto } from "../../../core/schemas";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-business-flow-outcome-detail',
    templateUrl: 'business-flow-outcome-detail.component.html'
})
export class BusinessFlowOutComeDetailComponent implements OnInit {
    
    @Input()
    node?: Node;

    @Input()
    outComeId?: string;

    @Input()
    createMode: boolean = false;

    @Output()
    saveOutCome = new EventEmitter<BusinessFlowOutComeDto>();

    @Output()
    deleteOutCome = new EventEmitter<string>();

    form = new FormGroup({
        color: new FormControl('#7F879C', [Validators.required]),
        name: new FormControl('', [Validators.required])
    });

    get outCome() : BusinessFlowOutComeDto | undefined {
        if (!this.node)
            return;

        const outCome = this.node!.data.outComes.find((x: any) => x.id == this.outComeId);
        return outCome;
    }

    ngOnInit(): void {
        if (this.createMode)
            return;

        const outCome = this.outCome;
        if (outCome) {
            this.form.patchValue({
                name: outCome.name,
                color: outCome.color
            })
        }
    }

    onSaveOutCome() {
        if (this.form.valid) {
            this.saveOutCome.emit({
                id: this.createMode ? uuidv4() : <string>this.outComeId,
                name: <string>this.form.value.name,
                color: <string>this.form.value.color
            });
        }
    }

    onDeleteOutCome() {
        if (this.createMode)
            return;

        this.deleteOutCome.emit(this.outComeId);
    }

}