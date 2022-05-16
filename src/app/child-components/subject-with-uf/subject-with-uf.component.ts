import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalUfComponent } from '../../modals/modal-uf/modal-uf.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalDeleteComponent} from "../../modals/modal-delete/modal-delete.component";
import { getAllRules } from "../../services/rule.service"
import {getUf} from "../../services/uf.service"
@Component({
    selector: 'app-subject-with-uf',
    templateUrl: './subject-with-uf.component.html',
    styleUrls: ['./subject-with-uf.component.scss']
})
export class SubjectWithUfComponent implements OnInit {

    @Input() subjectInfo: any;
    @Output() reloadEvent = new EventEmitter<any>();
    UFs: any[]=[]

    constructor(
        private dialog: MatDialog
    ) { }
    ngOnInit(): void {
        this.subjectInfo.ufs.forEach((data: any)=>{
            let uf: any = {
                title: data.name,
                rules:[],
                total_hours:data.hours,
                truancyPercentage: data.truancy_percentage,
                _id: data._id,
                moduleId: data.moduleId
            }
            getAllRules(data._id).then((res: any)=>{
                res.body.forEach((data:any) => {
                let rule = {
                    rule: data.title,
                    percentage: data.percentage,
                    ufId: data.ufId,
                    ruleId: data._id
                }
                uf.rules.push(rule)
                })
            })
            this.UFs.push(uf)
        })
    }

    openEditUfModal(UF:any){
        const dialogRef = this.dialog.open(ModalUfComponent, {
            data: UF,
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.reload()
        })
    }

    async DeleteUF(ufSelected:any){
        let ufToDelete = this.subjectInfo.ufs.find( (uf: any) => uf._id === ufSelected._id);
        if(ufToDelete.tasks.length < 1 && ufToDelete.truancies.length < 1){
            const dialogRef = this.dialog.open(ModalDeleteComponent, {
                data: ufToDelete
            });
            dialogRef.afterClosed().subscribe(()=>{
                this.reload()
            })
        } else {
            
        }
    }
    reload(){
        this.reloadEvent.emit();
    }
}
