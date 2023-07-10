import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { QuizService } from 'src/app/services/quiz.service';


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

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private quizService:QuizService) {  this.route.params.subscribe(params => this.quizName = params['slug']);}

  ngOnInit(): void {

    this.quizService.getCurrentQuestions(this.quizName).subscribe(datas=>{
       this.questions = datas
       this.currentQuestion = this.questions[0]
       this.loadForm()
       this.questionOption = this.getQuestion()
    })

    this.quizName = this.quizName[0].toUpperCase() + this.quizName.substring(1)

  }

  loadForm(){
    this.formQuestion = this.formBuilder.group({
       alternative: [null]
    });
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
