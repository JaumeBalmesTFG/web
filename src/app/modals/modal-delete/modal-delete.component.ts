import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {deleteUf} from "../../services/uf.service";

@Component({
    selector: 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ModalDeleteComponent>
    ) {
    }

    ngOnInit(): void {
    }

    removeUf() {
        deleteUf(this.data._id)
        this.dialogRef.close('Deleted')
    }
}
