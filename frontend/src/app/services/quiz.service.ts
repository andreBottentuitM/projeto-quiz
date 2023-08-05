import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizzes:any

  constructor(private http: HttpClient) { }

  getQuiz(): Observable<any>{
    console.log('porra')
    return this.http.get<any>("http://localhost:5000/api/getquiz").pipe(
      tap({next:(quiz)=> {
        this.quizzes = quiz
      },
      error:(errorResponse)=> {
        console.log(errorResponse.error)
      }
    })
    )
  }

  getCurrentQuiz(quiz: string){
     console.log('porra')
    return this.http.post<any>("http://localhost:5000/api/getcurrentquiz", {name:quiz}).pipe(
      tap({next:(data)=> {

      },
      error:(errorResponse)=> {
        console.log(errorResponse.error)
      }
    })
    )
  }

  getCurrentQuestions(quiz:string){

    return this.http.post<any>("http://localhost:5000/api/getcurrentquestions", {name:quiz}).pipe(
      tap({next:(data)=> {

      },
      error:(errorResponse)=> {
        console.log(errorResponse.error)
      }
    })
    )
  }

}
