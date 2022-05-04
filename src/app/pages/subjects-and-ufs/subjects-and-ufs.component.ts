import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSubjectComponent } from '../../modals/modal-subject/modal-subject.component';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import { createUf } from 'src/app/services/uf.service';
import { getAll } from 'src/app/services/subject.service';

@Component({
    selector: 'app-subjects-and-ufs',
    templateUrl: './subjects-and-ufs.component.html',
    styleUrls: ['./subjects-and-ufs.component.scss']
})
export class SubjectsAndUfsComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router,
    ) { }

    subjects=[
        {name: 'Subject 1', checkColor: '#f04e4c'},
        {name: 'Subject 2', checkColor: '#f04e4c'},
        {name: 'Subject 3', checkColor: '#f04e4c'}
    ]

    ngOnInit(): void {
        // console.log(getAll().then(res => { console.log(res); }));
    }

    selectTab(tabSelected: any){
        console.log(tabSelected)
        this.router.navigate([`/${tabSelected}`]);
    }

    openNewSubjectModal(){
        const dialogRef = this.dialog.open(ModalSubjectComponent);
    }
    openEditSubjectModal(subject:any){
        const dialogRef = this.dialog.open(ModalSubjectComponent, {
            data: subject
        });
    }
    openNewUfModal(){
        const dialogRef= this.dialog.open(ModalUfComponent)
    }

    deleteSubject(subjectToDelete:any){
        this.subjects.forEach((subject,index) => {
            if(subject.name === subjectToDelete.name){
                this.subjects.splice(index,1);
            }
        })
    }
}
