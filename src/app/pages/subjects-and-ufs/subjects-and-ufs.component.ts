import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSubjectComponent } from '../../modals/modal-subject/modal-subject.component';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import { getAll, archiveOrDearchiveSubject, getAllSubjects, getUfsFromOneModule } from 'src/app/services/subject.service';
import { isLocalStorageToken } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-subjects-and-ufs',
    templateUrl: './subjects-and-ufs.component.html',
    styleUrls: ['./subjects-and-ufs.component.scss']
})
export class SubjectsAndUfsComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private toastr: ToastrService
    ) { }

    subjects: any[]=[]

    async ngOnInit(): Promise<void> {
        if(!isLocalStorageToken()){
            this.router.navigate([`/login`]);
        }
        this.reloadData()
    }

    selectTab(tabSelected: any){
        this.router.navigate([`/${tabSelected}`]);
    }

    openNewSubjectModal(){
        const dialogRef = this.dialog.open(ModalSubjectComponent,{
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(async (result) =>{
            if (!result) { return; }

            this.toastr.success('New subject created', 'Success', {
                closeButton: true,
                progressBar: true
            });
            this.reloadData()
        })
    }
    openEditSubjectModal(subject:any){
        const dialogRef = this.dialog.open(ModalSubjectComponent, {
            data: subject,
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(async (result) =>{
            if (!result) { return; }

            this.toastr.success('Subject updated', 'Success', {
                closeButton: true,
                progressBar: true
            });
            this.reloadData()
        })
    }
    openNewUfModal(subjectId: string){
        const dialogRef= this.dialog.open(ModalUfComponent,{
            data: subjectId,
            autoFocus: false
        })
        dialogRef.afterClosed().subscribe(async (result) => {
            if (!result) { return; }

            this.toastr.success('New UF created', 'Success', {
                closeButton: true,
                progressBar: true
            });
            this.reloadData()
        })
    }

    async deleteSubject(subjectToDelete:any){
        await archiveOrDearchiveSubject(subjectToDelete)
        this.reloadData()
        this.toastr.success('Subject archived', 'Success', {
            closeButton: true,
            progressBar: true
        });
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
