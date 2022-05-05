import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSubjectComponent } from '../../modals/modal-subject/modal-subject.component';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import { getAll, archiveOrDearchiveSubject } from 'src/app/services/subject.service';

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
        this.reloadData()
    }

    selectTab(tabSelected: any){
        this.router.navigate([`/${tabSelected}`]);
    }

    openNewSubjectModal(){
        const dialogRef = this.dialog.open(ModalSubjectComponent,{
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(async () =>{
            this.reloadData()
        })
    }
    openEditSubjectModal(subject:any){
        const dialogRef = this.dialog.open(ModalSubjectComponent, {
            data: subject,
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(async () =>{
            this.reloadData()
        })
    }
    openNewUfModal(subjectId: string){
        const dialogRef= this.dialog.open(ModalUfComponent,{
            data: subjectId,
            autoFocus: false
        })
        dialogRef.afterClosed().subscribe(async () => {
            this.reloadData()
        })
    }

    async deleteSubject(subjectToDelete:any){
        await archiveOrDearchiveSubject(subjectToDelete)
        this.reloadData()
    }

    async reloadData(){
        let res: any = await getAll()
        this.subjects=[]
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
}
