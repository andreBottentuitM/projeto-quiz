import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { QuizService } from 'src/app/services/quiz.service';
import { RankingService } from '../../services/ranking.service'


@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  faClock = faClock
  quizName: any=""
  questions: any
  currentQuestion: any
  disabledPrevious:boolean=true
  formQuestion: FormGroup | any
  questionOption: any
  answers: any = []
  time: any = "10:01"
  date:any = ""

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private quizService:QuizService,
    private rankingService: RankingService) {  this.route.params.subscribe(params => this.quizName = params['slug']);}



  ngOnInit(): void {

    this.getTime()

    this.quizService.getCurrentQuestions(this.quizName).subscribe(datas=>{
       this.questions = datas
       this.currentQuestion = this.questions[0]
       this.loadForm()
       this.questionOption = this.getQuestion()
       this.setTime()
    })

    this.quizName = this.quizName[0].toUpperCase() + this.quizName.substring(1)
  }

  getTime(){
    let gettingId:any = localStorage.getItem('UserQuiz')
    gettingId = {quiz:this.quizName, userId: JSON.parse(gettingId).id}

    this.rankingService.setTime(gettingId).subscribe(data => {
      let timeNow = Date.now()
      let timeLeft: any = parseFloat(data.limitTime) - timeNow
      if(timeLeft > 0){
       let minutes = Math.floor(timeLeft / 60000).toString()
       let seconds:any = ((timeLeft % 60000) / 1000).toString().split('.')[0]
       this.time = `${minutes}:${seconds}`
      }
      else{
       console.log('Se fodeu!')
      }

   })
  }

   setTime(){

    window.addEventListener("focus", function(){
      window.location.reload()
  });

     let minutes:any = this.time.split(':')[0]
     let seconds:any = this.time.split(':')[1]

     if(parseFloat(seconds) == 0){
      seconds = '59'
      minutes = (parseFloat(minutes) - 1).toString()
      }
     else{
      seconds = (parseFloat(seconds) - 1).toString()
      }

      this.time = `${minutes.length == 1 ? "0" + minutes : minutes}:${seconds.length == 1 ? "0" + seconds : seconds}`

      if(parseFloat(minutes) == 0 && parseFloat(seconds) == 0){
        return
      }

      setTimeout(() => {
        this.setTime()
      },1000)

    }

  loadForm(){
    this.formQuestion = this.formBuilder.group({
       alternative: [null]
    });
  }

  response(){
    this.answers.push({
      numero: this.currentQuestion.numero,
      answer: this.formQuestion.controls['alternative'].value
    })

    this.questions = this.questions.filter((item: any) => {
      return item.numero != this.currentQuestion.numero
    })

    if(this.questions.length > 0){
      this.currentQuestion = this.questions[0]

      this.questionOption = this.getQuestion()
      this.formQuestion.get('alternative').reset()
    }
    else{

    }
  }

  previous(){
    let index = this.questions.indexOf(this.currentQuestion)
    if(index !== 0){
      this.currentQuestion = this.questions[index - 1]
    }
    this.questionOption = this.getQuestion()
    this.formQuestion.get('alternative').reset()
  }

  next(){
    let index = this.questions.indexOf(this.currentQuestion)
    if(index !== this.questions.length - 1){
      this.currentQuestion = this.questions[index + 1]
    }
    this.questionOption = this.getQuestion()
    this.formQuestion.get('alternative').reset()
  }

  getQuestion(){
    return [
        {valor: 'A',desc:this.currentQuestion.alternativeA},
        {valor: 'B',desc:this.currentQuestion.alternativeB},
        {valor: 'C',desc:this.currentQuestion.alternativeC},
        {valor: 'D',desc:this.currentQuestion.alternativeD}
      ]
  }

  submitQuestion(){

  }

}
