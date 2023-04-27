import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuiz(): Observable<any>{
    return this.http.get<any>('').pipe(
      tap({next:(user)=> {

      },
      error:(errorResponse)=> {
        console.log(errorResponse.error)
      }
    })
    )
  }
}
