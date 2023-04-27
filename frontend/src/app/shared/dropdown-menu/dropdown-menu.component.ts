import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit {

  menu:boolean=false
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();//Vai chamar o método logout que vai excluir o localStorage User
  }

  toggleMenu(){
   this.menu = this.menu == false ? true : false
  }

}
