import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  quiz:any = [{
    name:'Angular',
    questions: '20',
    duration:'20',
    pathIMG:'../../../assets/angular-logo.png'
  },
  {
    name:'Team Developer',
    questions: '20',
    duration:'20',
    pathIMG:'../../../assets/team-developer.png'
  },
  {
    name:'SQL',
    questions: '20',
    duration:'20',
    pathIMG:'../../../assets/sql.jpg'
  },
  {
    name:'AWS',
    questions: '20',
    duration:'20',
    pathIMG:'../../../assets/aws.png'
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
