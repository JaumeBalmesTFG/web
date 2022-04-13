import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-subject',
  templateUrl: './modal-subject.component.html',
  styleUrls: ['./modal-subject.component.scss']
})
export class ModalSubjectComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
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
