import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  auth,
  register,
  login
} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  wrongData=false;
  formEmail!: FormGroup
  formLogin!: FormGroup
  formRegister!: FormGroup
  login = false;
  register = false;
  ngOnInit(): void {
    this.formEmail = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
    this.formLogin = this.formBuilder.group({
      email: [{value: '',disabled: true}, Validators.required,],
      password: ['', Validators.required]
    })
    this.formRegister = this.formBuilder.group({
      email:[{value: '',disabled: true},Validators.required],
      name:['',Validators.required],
      lastName:['',Validators.required],
      password:['',[Validators.required]]
    })
  }

  async enterEmail() {
    // Function to redirect the user to Login or Register
    if (this.formEmail.valid) {
      let email: string = this.formEmail.get('email')?.value
      let res: any = await auth(email)
      //If the user's email exist in our DB we redirect them to login
      if (res.message === "LOGIN") {
        this.login = true;
        this.formLogin.patchValue({
          email: this.formEmail.get('email')?.value
        })
        this.error=''
      //If the user's email doesn't exist in our DB we redirect them to register
      } else if (res.message === "REGISTER") {
        this.register = true;
        this.formRegister.patchValue({
          email: this.formEmail.get('email')?.value
        })
        this.error=''
      } else {
        this.error = res.message
      }
    } else {
      this.formEmail.markAllAsTouched();
    }
  }
  async enterLogin() {
    // Function to validate the login
    if (this.formLogin.valid) {
      let parameters={
        email: this.formLogin.get('email')?.value,
        password: this.formLogin.get('password')?.value
      }
      let res: any = await login(JSON.stringify(parameters));
      // If the login is succesful we redirect the user to calendar
      if (res.message==='LOGIN_SUCCESSFUL') {
        this.router.navigate([`/calendar`]);
      // Otherwise we send them the error
      } else {
        this.error = res.message;
        this.wrongData=true;
      }
    } else {
      this.formLogin.markAllAsTouched();
    }
  }
  async enterRegister() {
    // Function to validate the register
    if (this.formRegister.valid) {
      let parameters = {
        firstName: this.formRegister.get('name')?.value,
        lastName: this.formRegister.get('lastName')?.value,
        email: this.formRegister.get('email')?.value,
        password: this.formRegister.get('password')?.value
      }
      let res: any = await register(JSON.stringify(parameters));
      //We redirect the user to the main app if the information is correct
      if(res.message==="USER_CREATED"){
        this.router.navigate([`/calendar`]);
      //Otherwise we show them the errors
      } else {
        this.error = res.message
      }
    } else {
      this.formRegister.markAllAsTouched();
    }
  }
  back(){
    this.login=false;
    this.register=false;
  }
}
