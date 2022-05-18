import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  createSubject,
  updateSubject
} from '../../services/subject.service'
@Component({
    selector: 'app-modal-subject',
    templateUrl: './modal-subject.component.html',
    styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {name: string, checkColor: string, moduleId: string},
        public dialogRef: MatDialogRef<ModalSubjectComponent>
    ) { }
    subjectForm!: FormGroup;
    error!: string
    colors=[
        {value:'#009688'},
        {value:'#4CAF4F'},
        {value:'#F44336'},
        {value:'#E91E62'},
        {value:'#00BBD4'},
        {value:'#2194F3'},
        {value:'#4C62E2'},
        {value:'#7E57C2'}
    ]
    ngOnInit(): void {
        //We create the form
        this.subjectForm = this.formBuilder.group({
            name: ['', Validators.required],
            checkColor: this.formBuilder.group({
                option:['',Validators.required]
            })
        })
        //If we got information from the subjects and ufs component (aka, we're editing) we patch the values onto the form
        if(this.data!==null){
            this.subjectForm.get('name')?.patchValue(this.data.name)
            this.subjectForm.get('checkColor')?.patchValue({
                option: this.data.checkColor
            })
            
        }
    }

    async createNewSubject(){
        //Check if the form is correct and, then, send it to the backend
        if(this.subjectForm.valid){
            if (this.data){
              let parameters = {
                name: this.subjectForm.get('name')?.value,
                color: this.subjectForm.get('checkColor')?.value.option,
                moduleId: this.data.moduleId
              }  
              let res:any = await updateSubject(parameters);
              if (res.error || res.message === "ALREADY_EXISTS"){
                  this.error = res.message
              } else {
                this.dialogRef.close('Edited')
              }
            } else {
                let parameters = {
                    name: this.subjectForm.get('name')?.value,
                    color: this.subjectForm.get('checkColor')?.value.option,
                }
                let res: any = await createSubject(JSON.stringify(parameters));
                if (res.error || res.message === "ALREADY_EXISTS"){
                    this.error = res.message
                } else {
                    this.dialogRef.close('Created')
                }
            }
        } else {
            this.subjectForm.markAllAsTouched()
        }
    }
    changeColorValue(color:any){
    }
}

