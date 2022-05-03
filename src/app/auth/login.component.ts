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
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.formRegister = this.formBuilder.group({
      email:['',Validators.required],
      name:['',Validators.required],
      lastName:['',Validators.required],
      password:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,}')]]
    })
  }

  async enterEmail() {
    if (this.formEmail.valid) {
      let email: string = this.formEmail.get('email')?.value
      let res: any = await auth(email)

      if (res.message === "LOGIN") {
        this.login = true;
        this.formLogin.patchValue({
          email: this.formEmail.get('email')?.value
        })
      } else if (res.message === "REGISTER") {
        this.register = true;
        this.formRegister.patchValue({
          email: this.formEmail.get('email')?.value
        })
      }
    }
  }
  enterLogin() {
    if (this.formLogin.valid) {
      if (this.formLogin.get('email')?.value === 'test@test.com' && this.formLogin.get('password')?.value === 'test') {
        this.router.navigate([`/calendar`]);
      } else {
        this.wrongData=true;
      }
    }
  }
  async enterRegister() {
    if (this.formRegister.valid) {
      let parameters = {
        firstName: this.formRegister.get('name')?.value,
        lastName: this.formRegister.get('lastName')?.value,
        email: this.formRegister.get('email')?.value,
        password: this.formRegister.get('password')?.value
      }
      let res = register(JSON.stringify(parameters));
      this.router.navigate([`/calendar`]);
    }
  }
  back(){
    this.login=false;
    this.register=false;
  }
}
