import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Register } from 'src/models/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   url = "http://localhost:5000/api/signup"
  constructor(private http: HttpClient) { }

  signUp(newUser:Register): Observable<Register>{
    return this.http.post<Register>(this.url, newUser).pipe(
      tap(console.log)
    )
  }

  signIn(user:any): Observable<any>{
    return this.http.post<any>("http://localhost:5000/api/signin", user).pipe(
      tap(console.log)
    )
  }
}
