import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instrucao',
  templateUrl: './instrucao.component.html',
  styleUrls: ['./instrucao.component.css']
})
export class InstrucaoComponent implements OnInit {

  quizName:any =""
  quizCurrent:any= ""

  constructor( private route: ActivatedRoute,private quizService:QuizService ) {
    this.route.params.subscribe(params => this.quizName = params['slug']);
}

  ngOnInit(): void {
    console.log(this.quizName)
      this.quizService.getCurrentQuiz(this.quizName).subscribe(dado => {
        this.quizCurrent = dado
      })
  }

}
