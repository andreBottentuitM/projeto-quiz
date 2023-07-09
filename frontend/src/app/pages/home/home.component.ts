import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!:any

  quiz:any = []

  constructor(private loginService:LoginService, private quizService:QuizService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.userObservable.subscribe((newUser) => {
      this.user = newUser;//Pegar os dados do User.
    })

    this.quizService.getQuiz().subscribe(quiz => {
        this.quiz = quiz
    })

  }

  navigate(quiz:any){

    let path = this.router.url
    console.log(`${path}/quiz`)
    this.router.navigate([`${path}/quiz/${quiz.name.toLowerCase()}`])
  }

  get isAuth(){
    return this.user.token;/*Caso o usuário não esteja logado, o valor vai ser undefined,
    caso esteja, vai ter o valor do token*/
  }

}
