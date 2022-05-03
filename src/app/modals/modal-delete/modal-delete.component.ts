import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {title: string, rules: any, total_hours:Number, trauncy_percentage:Number}
    ) { }

    ngOnInit(): void {
        console.log(this.data);
    }

}
