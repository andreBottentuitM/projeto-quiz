import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('duration') duration:string = ""
  @Input('ponctuation') ponctuation:number = 0
  @Input('message') message:string = ""
  @Input('name') name:string = ""
  @Input('color') color:string = ""
  @Input('image') image:string = ""

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    console.log(this.image)
    // this.getResult()
  }

  goToRanking(){
    this.router.navigate(['ranking']);
  }


}
