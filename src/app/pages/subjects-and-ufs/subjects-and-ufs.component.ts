import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSubjectComponent } from '../../modals/modal-subject/modal-subject.component';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import {
    getAllSubjects,
    getAll,
    archiveOrDearchiveSubject
} from '../../services/subject.service';
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
                moduleId: data._id
            }
            this.subjects.push(subject);
        })
        console.log(res);
        
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
