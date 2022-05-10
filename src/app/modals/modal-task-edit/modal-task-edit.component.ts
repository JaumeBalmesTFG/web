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
    ]
    subjectSelected:any
    ngOnInit(): void {
        this.formTask = this.formBuilder.group({
            subject:['', Validators.required],
            UF:['',Validators.required],
            title:['',Validators.required],
            type:['',Validators.required],
            grade:[{value: 0, disabled: true}]
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
            this.dialogRef.close()
            console.log(this.formTask.value);
        }
        else {
            console.log("incorrect form");
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
        } else {
            this.formTask.get('grade')?.disable();
        }
        this.disabled=!this.disabled;
    }
}
