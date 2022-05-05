import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSubjectComponent } from '../../modals/modal-subject/modal-subject.component';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import { createUf, deleteUf, getUf, updateUf } from 'src/app/services/uf.service';
import { getAll, getAllSubjects, archiveOrDearchiveSubject } from 'src/app/services/subject.service';
import { createRule, deleteRule, getAllRules, getRule, updateRule } from 'src/app/services/rule.service';
import { createTask, deleteTask, getTask, updateTask } from 'src/app/services/task.service';

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

    subjects: any[]=[]

    async ngOnInit(): Promise<void> {
        let res: any = await getAll()
        res.forEach((data: any) => {
            let subject = {
                name: data.name,
                checkColor: data.color,
                moduleId: data._id,
                ufs: data.ufs
            }
            this.subjects.push(subject);
        })
        
    }

    selectTab(tabSelected: any){
        this.router.navigate([`/${tabSelected}`]);
    }

    openNewSubjectModal(){
        const dialogRef = this.dialog.open(ModalSubjectComponent,{
            autoFocus: false,
        });
    }
    openEditSubjectModal(subject:any){
        const dialogRef = this.dialog.open(ModalSubjectComponent, {
            data: subject,
            autoFocus: false
        });
    }
    openNewUfModal(subjectId: string){
        const dialogRef= this.dialog.open(ModalUfComponent,{
            data: subjectId,
            autoFocus: false
        })
    }

    async deleteSubject(subjectToDelete:any){
        let res = await archiveOrDearchiveSubject(subjectToDelete)
    }
}
