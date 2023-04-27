import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:any
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.userObservable.subscribe((newUser) => {
      this.user = newUser;//Pegar os dados do User.
    })

  }

  get isAuth(){
    return this.user.token;/*Caso o usuário não esteja logado, o valor vai ser undefined,
    caso esteja, vai ter o valor do token*/
  }

}
