import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalUfComponent } from './modal-uf/modal-uf.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-ng-for-ufs',
  templateUrl: './ng-for-ufs.component.html',
  styleUrls: ['./ng-for-ufs.component.scss']
})
export class NgForUFsComponent implements OnInit {

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
    this.UFs.forEach((UF,index) => {
      if(UF.title === ufToDelete.title){
        this.UFs.splice(index,1);
      }
    })
  }
}
