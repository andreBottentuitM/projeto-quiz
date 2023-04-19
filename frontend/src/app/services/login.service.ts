import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   url = "http://localhost:5000/api/foods"
  constructor(private http: HttpClient) { }

  signUp(newUser:any): Observable<any>{
    console.log('test')
    return this.http.get(this.url)
  }
}
