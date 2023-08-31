import { Component, OnInit } from '@angular/core';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit {
  faArrowDown = faAnglesDown
  menu:boolean=false
  user!:any
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.userObservable.subscribe((newUser) => {
      this.user = newUser;//Pegar os dados do User.
    })

  }

  get currentUser(){
    console.log(this.user)
    return this.user;/*Caso o usuário não esteja logado, o valor vai ser undefined,
    caso esteja, vai ter o valor do token*/
  }

  logout(){
    this.loginService.logout();//Vai chamar o método logout que vai excluir o localStorage User
  }

  toggleMenu(){
   this.menu = this.menu == false ? true : false
  }

}
