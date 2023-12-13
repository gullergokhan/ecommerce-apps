import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URL_SERVICE } from "src/config/config";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class EcommerceService {

    constructor(private http: HttpClient) { }
  
  
    getCategory():Observable<any>{
      let URL = URL_SERVICE + '/category/all';
  
     
  
      return this.http.get<any>(URL,);
        
    }
    getProduct(page=1, LINK=''):Observable<any>{
        let URL = URL_SERVICE + '/product/all?page='+page+LINK;
    
       
    
        return this.http.get<any>(URL,);
          
      }

      getProductsByCategory(categoryId: number): Observable<any> {
        let URL = URL_SERVICE + '/product/by-category/' + categoryId;
        return this.http.get<any>(URL);
      }
    productdetail(id:number):Observable<any>{
    let URL = URL_SERVICE + '/detail/'+id;

   

    return this.http.get<any>(URL,);
      
  }
  }