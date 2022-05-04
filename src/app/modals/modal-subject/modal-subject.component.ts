import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-modal-subject',
    templateUrl: './modal-subject.component.html',
    styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {name: string, checkColor: string},
        public dialogRef: MatDialogRef<ModalSubjectComponent>
    ) { }
    subjectForm!: FormGroup;

    colors=[
        {value:'#009688'},
        {value:'#4caf4f'},
        {value:'#f44336'},
        {value:'#e91e62'},
        {value:'#00bbd4'},
        {value:'#2194f3'},
        {value:'#4c62e2'},
        {value:'#7e57c2'}
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

    createNewSubject(){
        //Check if the form is correct and, then, send it to the backend
        if(this.subjectForm.valid){
            this.dialogRef.close()
            console.log(this.subjectForm.get('name')?.value);
            console.log(this.subjectForm.get('checkColor')?.value);
        } else {
            this.subjectForm.markAllAsTouched()
        }
    }

    changeColorValue(color:any){
        console.log(color);
    }
}

