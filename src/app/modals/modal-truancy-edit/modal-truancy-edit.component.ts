import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-truancy-edit',
    templateUrl: './modal-truancy-edit.component.html',
    styleUrls: ['./modal-truancy-edit.component.scss']
})
export class ModalTruancyEditComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {subject: string, UF: string, hours: Number, reason: string, date: string},
        public dialogRef: MatDialogRef<ModalTruancyEditComponent>
    ) { }

    formTruancy!:FormGroup;
    dataSubjects=[
        {name: 'Subject 1', UFs:['uf 1', 'uf 2', 'uf 4']},
        {name: 'Subject 2', UFs:['uf 1', 'uf 3', 'uf 4']}
    ]
    subjectSelected:any

    ngOnInit(): void {
        this.formTruancy = this.formBuilder.group({
            subject:['',Validators.required],
            UF:['',Validators.required],
            hours:['',Validators.required],
            reason:['']
        })
        this.formTruancy.patchValue({
            subject: this.data.subject,
            UF: this.data.UF,
            hours: this.data.hours,
            reason: this.data.reason
        })
        this.dataSubjects.forEach(subjectData =>{
            if (this.data.subject===subjectData.name){
                this.subjectSelected = subjectData
            }
        })
    }

    selectSubject(subject:any){
        this.formTruancy.get('UF')?.reset()
        this.dataSubjects.forEach(subjectData =>{
            if (subject===subjectData.name){
                this.subjectSelected = subjectData
            }
        })
    }

    editTruancy(){
        if(this.formTruancy.valid){
            this.dialogRef.close()
        }
        else {
            this.formTruancy.markAllAsTouched()
        }
    }

}
