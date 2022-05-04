import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalDeleteComponent} from "../../modals/modal-delete/modal-delete.component";
@Component({
    selector: 'app-subject-with-uf',
    templateUrl: './subject-with-uf.component.html',
    styleUrls: ['./subject-with-uf.component.scss']
})
export class SubjectWithUfComponent implements OnInit {

    @Input() subjectInfo: any;

    UFs: any[]=[
    ]

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        console.log(this.subjectInfo);
        this.subjectInfo.ufs.forEach((data: any)=>{
          let uf = {
            title: data.name,
            rules:{},
            total_hours:data.hours,
            truancy_percentage: data.truancy_percentage
          }
          this.UFs.push(uf)
        })
    }

    openEditUfModal(UF:any){
        const dialogRef = this.dialog.open(ModalUfComponent, {
            data: UF,
            autoFocus: false
        });
    }

    DeleteUF(ufToDelete:any){
        const dialogRef = this.dialog.open(ModalDeleteComponent, {
            data: ufToDelete
        })
    }
}
