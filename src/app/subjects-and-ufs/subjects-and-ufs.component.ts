import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalSubjectComponent } from './modal-subject/modal-subject.component';
@Component({
  selector: 'app-subjects-and-ufs',
  templateUrl: './subjects-and-ufs.component.html',
  styleUrls: ['./subjects-and-ufs.component.scss']
})
export class SubjectsAndUfsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }
  
  subjects=[
    {name: 'Subject 1', color: 'red'},
    {name: 'Subject 2', color: 'green'},
    {name: 'Subject 3', color: 'yellow'}
  ]

  ngOnInit(): void {
  }

  

  openNewSubjectModal(){
    const dialogRef = this.dialog.open(ModalSubjectComponent);
    
  }
}
