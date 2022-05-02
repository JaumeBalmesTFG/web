import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  wrongData=false;
  formEmail!: FormGroup
  formLogin!: FormGroup
  formRegister!: FormGroup
  login=false;
  register=false;
  ngOnInit(): void {
    this.formEmail = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
    this.formLogin = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
    this.formRegister = this.formBuilder.group({
      email:['',Validators.required],
      name:['',Validators.required],
      lastName:['',Validators.required],
      password:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,}')]]
    })
  }

  enterEmail(){
    if(this.formEmail.valid){
      if(this.formEmail.get('email')?.value==='test@test.com'){
        this.login=true;
        this.formLogin.patchValue({
          email: this.formEmail.get('email')?.value
        })
      } else {
        this.register=true;
        this.formRegister.patchValue({
          email: this.formEmail.get('email')?.value
        })
      }
    }
  }
  enterLogin(){
    if(this.formLogin.valid){
      if(this.formLogin.get('email')?.value==='test@test.com' && this.formLogin.get('password')?.value==='test'){
        console.log("welcome back test");
        this.router.navigate([`/calendar`]);
      } else {
        this.wrongData=true;
      }
    }
  }
  enterRegister(){
    if(this.formRegister.valid){
      console.log("Welcome new user");
      this.router.navigate([`/calendar`]);
    }
  }
  back(){
    this.login=false;
    this.register=false;
  }
}
