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

  @Input() subjectInfo: Object={};

  UFs=[
    {title: 'UF 1', rules:[{type:'Examen',percentage:80},{type:'Practicas',percentage:20}], total_hours:300, trauncy_percentage: 15},
    {title: 'UF 2', rules:[{type:'Examen',percentage:80},{type:'Practicas',percentage:20}], total_hours:300, trauncy_percentage: 15},
    {title: 'UF 3', rules:[{type:'Examen',percentage:80},{type:'Practicas',percentage:20}], total_hours:300, trauncy_percentage: 15}
  ]

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.subjectInfo);

  }

  openEditUfModal(UF:any){
    const dialogRef = this.dialog.open(ModalUfComponent, {
      data: UF
    });
  }

  DeleteUF(ufToDelete:any){
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: ufToDelete
    })
  }
}
