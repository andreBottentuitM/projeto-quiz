import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Register } from 'src/models/register';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

const USER = "UserQuiz"
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:5000/api/signup"
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage())

  public userObservable:Observable<User>
  constructor(private http: HttpClient,
    private router: Router) {
    this.userObservable = this.userSubject.asObservable()
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  signUp(newUser:any): Observable<Register>{
    return this.http.post<Register>(this.url, newUser).pipe(
      tap({next:(user)=> {

      },
      error:(errorResponse)=> {
        console.log(errorResponse.error)
      }
    })
    )
  }

  signIn(user:any): Observable<any>{
    return this.http.post<User>("http://localhost:5000/api/signin", user).pipe(
      tap({
        next:(user) =>{
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.router.navigate(['/'])
        },
        error: (errorResponse) => {
          console.log(errorResponse.error)
          //Toast de error
        }
      })
    )
  }

  upload(files:Set<File>, url:string){

    const formData = new FormData()
    files.forEach(file => formData.append('file', file, file.name))
    console.log(formData)
    const request = new HttpRequest('POST', url, formData)
    return this.http.request(request)
  }

  logout(){
    this.userSubject.next(new User());//Vai substituir o usuário atual do localStorage por um user vazio
    localStorage.removeItem(USER);/*Excluir o localStorage com nome user */
    this.router.navigate(['/'])
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER, JSON.stringify(user));//Criando o localStorage de User.
  }

   private getUserFromLocalStorage():any{
     const userJson = localStorage.getItem(USER);/*vai pegar o localStorage se ele tiver algum dado
    vai retornar os dados no formato de objeto javascript, caso não, vai estanciar um objeto novo com
     informações vazias.*/
     if(userJson) return JSON.parse(userJson) as User;
     return new User();
  }
}

