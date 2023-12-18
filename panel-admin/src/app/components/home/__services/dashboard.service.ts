import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { URL_SERVICE } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getUsersCount():Observable<any>{
    let URL = URL_SERVICE + '/users/count';

   

    return this.http.get<any>(URL,);
      
  }

  getLastUsers():Observable<any>{
    let URL = URL_SERVICE + '/users/latest';



    return this.http.get<any>(URL, );
      
  }

  topfourall():Observable<any>{
    let URL = URL_SERVICE + '/topfour/all';

   

    return this.http.get<any>(URL, );
      
  }
  topfoursale():Observable<any>{
    let URL = URL_SERVICE + '/basket/toptensale/all';

   

    return this.http.get<any>(URL);
      
  }
}