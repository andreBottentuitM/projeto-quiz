import { Component, OnInit } from '@angular/core';
import {FormValidations} from '../../shared/utils'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup
  formRegister!: FormGroup

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required,Validators.minLength(6)]]
    });

    this.formRegister = this.formBuilder.group({
      nameRegister: [null, [Validators.required, Validators.minLength(3)]],
      emailRegister: [null, [Validators.required, Validators.email]],
      passwordRegister:[null, [Validators.required, Validators.minLength(6)]],
      passwordConfirmRegister:[null, [Validators.required, FormValidations.equalsTo('passwordRegister')]]
    });


  }

  submitSignIn(){
    if(this.formLogin.valid){
      this.loginService.signIn(this.formLogin.value).subscribe(e=>{
        console.log(e)
      })
    }

  }

  submitRegister() {
    if(this.formRegister.valid){
      this.loginService.signUp(this.formRegister.value).subscribe(e=>{
        console.log(e)
      })
    }
  }

}
