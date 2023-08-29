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
  time: any = "FINALIZADO"
  date:any = ""
  userId:any
  modal:boolean = false
  duration:string = ""
  ponctuation:number = 0
  name:string = ""
  message:string = ""
  color:string = ""
  image:string = ""

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private quizService:QuizService,
    private rankingService: RankingService) {  this.route.params.subscribe(params => this.quizName = params['slug']);}



  ngOnInit(): void {

    this.getTime()

    this.quizService.getCurrentQuestions(this.quizName).subscribe(data=>{
      data.quizName = {name:this.quizName}
      let datasUpdate:any
      if(localStorage.getItem('currentQuiz')){

        let dataFromLocal:any = localStorage.getItem('currentQuiz')
        dataFromLocal = JSON.parse(dataFromLocal)

        let quizCurrent:any = localStorage.getItem('quizName')
        quizCurrent = JSON.parse(quizCurrent)

        if(quizCurrent == this.quizName){
          datasUpdate = dataFromLocal
        }
        else{
          localStorage.setItem('currentQuiz', JSON.stringify(data))
          localStorage.setItem('quizName', JSON.stringify(this.quizName))
          localStorage.removeItem('answers')
          datasUpdate = data
        }
      }
      else{
        localStorage.setItem('currentQuiz', JSON.stringify(data))
        localStorage.setItem('quizName', JSON.stringify(this.quizName))
        datasUpdate = data
      }

      this.questions = datasUpdate
      this.currentQuestion = this.questions[0]
      this.loadForm()
      this.questionOption = this.getQuestion()
      this.setTime()

    })

    this.quizName = this.quizName[0].toUpperCase() + this.quizName.substring(1)
  }

  getTime(){
    let gettingId:any = localStorage.getItem('UserQuiz')
    this.userId = JSON.parse(gettingId).id
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

    if(!this.modal){
      window.addEventListener("focus", function(){
        window.location.reload()
    });
    }

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
   if(this.formQuestion.controls['alternative'].value){
    if(localStorage.getItem('answers')){
      let updateAnswer:any = localStorage.getItem('answers')
      updateAnswer = JSON.parse(updateAnswer)

      updateAnswer.push({
        numero: this.currentQuestion.numero,
        answer: this.formQuestion.controls['alternative'].value
      })
      localStorage.setItem('answers', JSON.stringify(updateAnswer))
    }
    else{
      let newAnswer = [{
        numero: this.currentQuestion.numero,
        answer: this.formQuestion.controls['alternative'].value
      }]
      localStorage.setItem('answers', JSON.stringify(newAnswer))
    }

    this.questions = this.questions.filter((item: any) => {
      return item.numero != this.currentQuestion.numero
    })

    localStorage.setItem('currentQuiz', JSON.stringify(this.questions))

    if(this.questions.length > 0){
      this.currentQuestion = this.questions[0]

      this.questionOption = this.getQuestion()
      this.formQuestion.get('alternative').reset()
    }
    else{
      let answers:any = localStorage.getItem('answers')
      answers = JSON.parse(answers)

      let dataRequisition = {
        nameQuiz: this.quizName,
        answers: answers,
        userId: this.userId
      }

      this.rankingService.setResponse(dataRequisition).subscribe(data => {

       let getName:any = localStorage.getItem('UserQuiz')
       this.name = JSON.parse(getName).name
       this.ponctuation = data.ponctuation
       this.duration = data.duration

       if(this.ponctuation === 10){
        this.message = `Excelente!, ${this.name}.`
        this.color = 'text-green-500'
        this.image = '../../../assets/excelente.png'
       }
       else if(this.ponctuation >= 7){
        this.message = `Muito bom!, ${this.name}.`
        this.color = 'text-blue-400'
        this.image = '../../../assets/bom.png'
       }
       else if(this.ponctuation >= 4){
        this.message = `Ops! Não foi uma das melhores pontuações, ${this.name}.`
        this.color = 'text-yellow-400'
        this.image = '../../../assets/neutro.png'
       }
       else if(this.ponctuation > 0){
        this.message = `Você não estava preparado, não é mesmo, ${this.name}?`
        this.color = 'text-orange-500'
        this.image = '../../../assets/triste.png'
       }
       else if(this.ponctuation === 0){
        this.message = `Vish!! Nem sorte você teve, ${this.name}.`
        this.color = 'text-red-700'
        this.image = '../../../assets/aborrecido.png'
       }
       this.modal = true

      })

    }

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
