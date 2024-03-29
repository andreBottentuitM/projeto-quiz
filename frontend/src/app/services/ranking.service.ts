import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {



  constructor(private http: HttpClient) { }

  setTime(time:any): Observable<any>{

    return this.http.post<any>("http://localhost:5000/api/settime",time).pipe(
      tap({next:()=> {

      },
      error:(errorResponse)=> {

      }
    })
    )
  }

  setResponse(response:any):Observable<any>{

    return this.http.post<any>("http://localhost:5000/api/setresponse",response).pipe(
      tap({next:()=> {

      },
      error:(errorResponse)=> {

      }
    })
    )

  }

  getRanking(response:any):Observable<any>{
    return this.http.post<any>("http://localhost:5000/api/getranking",response).pipe(
      tap({next:()=> {

      },
      error:(errorResponse)=> {

      }
    })
    )
  }

  getPage(page:any){
    return this.http.post<any>(`http://localhost:5000/api/getpage?page=${page.page}`, page).pipe(
      tap({next:()=> {

      },
      error:(errorResponse)=> {

      }
    })
    )
  }

}
