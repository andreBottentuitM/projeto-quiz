import { Component, OnInit } from '@angular/core';
import {FormValidations} from '../../shared/utils'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup
  formRegister!: FormGroup | any
  files!:Set<File>
  image!:string

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
      passwordConfirmRegister:[null, [Validators.required, FormValidations.equalsTo('passwordRegister')]],
      fileRegister:[null]
    })


  }

  submitSignIn(){
    if(this.formLogin.valid){
      this.loginService.signIn(this.formLogin.value).subscribe(e=>{

      })
    }

  }

  submitRegister() {
    const formData = new FormData();
    formData.append('nameRegister', this.formRegister.get('nameRegister').value)
    formData.append('emailRegister', this.formRegister.get('emailRegister').value)
    formData.append('passwordRegister', this.formRegister.get('passwordRegister').value)
    formData.append('passwordConfirmRegister', this.formRegister.get('passwordConfirmRegister').value)
    formData.append('file', this.formRegister.get('fileRegister').value);


    if(this.formRegister.valid){
      this.loginService.signUp(formData).subscribe(e=>{

      })
    }
  }

  onChange(event:any){
    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.formRegister.patchValue({

        fileRegister: file

      });
    }

  }

  onUpload(event:any){

    if(this.files && this.files.size > 0){
      this.loginService.upload(this.files,'blabla')
    }


  }

}
