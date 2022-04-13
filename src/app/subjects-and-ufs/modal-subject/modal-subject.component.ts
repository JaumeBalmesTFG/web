import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-subject',
  templateUrl: './modal-subject.component.html',
  styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, checkColor: string}
  ) { }
  subjectForm!: FormGroup;

  colors=[
    {value:'#80ce90'},
    {value:'#f0742c'},
    {value:'#14115d'},
    {value:'#f04e4c'},
    {value:'#a8ff65'},
    {value:'#ff45d5'},
    {value:'#c3c4c3'}
  ]
  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      checkColor: this.formBuilder.group({
        option:['',Validators.required]
      })
    })
    if(this.data!==null){
      this.subjectForm.patchValue(this.data)
    }
  }

  createNewSubject(){
    console.log("hola");
    console.log(this.subjectForm.get('name')?.value);
    console.log(this.subjectForm.get('checkColor')?.value);
  }

  changeColorValue(color:any){
    console.log(color);
  }
}

