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
    {value:'#80ce90'},
    {value:'#f0742c'},
    {value:'#14115d'},
    {value:'#f04e4c'},
    {value:'#a8ff65'},
    {value:'#ff45d5'},
    {value:'#c3c4c3'},
    {value:'#c3c4c1'}
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
    }
  }

  changeColorValue(color:any){
    console.log(color);
  }
}

