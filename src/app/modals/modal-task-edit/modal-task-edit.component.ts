import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-task-edit',
    templateUrl: './modal-task-edit.component.html',
    styleUrls: ['./modal-task-edit.component.scss']
})
export class ModalTaskEditComponent implements OnInit {
    UFSelected: any;


    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {subject: string, UF: string, title: string, type: string, date: string},
        public dialogRef: MatDialogRef<ModalTaskEditComponent>
    ) { }

    disabled=true;
    formTask!:FormGroup;
    dataSubjects=[
        {name: 'Subject 1', UFs:[{value: 'uf 1', events: ['examen','practicas']}, {value: 'uf 3', events: ['examen','practicas']}, {value: 'uf 4', events: ['examen','practicas']}]},
        {name: 'Subject 2', UFs:[{value: 'uf 1', events: ['examen','practicas']}, {value: 'uf 2', events: ['examen','practicas']}, {value: 'uf 4', events: ['examen','practicas']}]}
    ]
    subjectSelected:any
    ngOnInit(): void {
        this.formTask = this.formBuilder.group({
            subject:['', Validators.required],
            UF:['',Validators.required],
            title:['',Validators.required],
            type:['',Validators.required],
            grade:[{value: null, disabled: true}]
        })
        this.formTask.patchValue({
            subject: this.data.subject,
            UF: this.data.UF,
            title: this.data.title,
            type: this.data.type
        });
        this.selectSubject(this.data.subject)
        this.selectUF(this.data.UF)
    }

    selectSubject(subject:any){
        this.dataSubjects.forEach(subjectData =>{
            if (subject===subjectData.name){
                this.subjectSelected = subjectData
            }
        })
    }
    editTask(){
        if(this.formTask.valid){
            if(this.disabled){
                this.dialogRef.close()
            } else if(this.formTask.get('grade')?.value || this.formTask.get('grade')?.value===0){
                this.dialogRef.close()
            } else {
                this.formTask.markAllAsTouched()
            }
        }
        else {
            console.log("incorrect form");
            this.formTask.markAllAsTouched();
        }
    }

    selectUF(UFSelected:any){
        console.log(UFSelected);

        this.subjectSelected.UFs.forEach((UF:any) =>{
            if (UFSelected===UF.value){
                this.UFSelected = UF
            }
        })
    }

    finishedTask(){
        if(this.disabled===true){
            this.formTask.get('grade')?.enable();
            this.formTask.get('grade')?.patchValue(0);
        } else {
            this.formTask.get('grade')?.disable();
            this.formTask.get('grade')?.reset();
        }
        this.disabled=!this.disabled;
    }
}
