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
    getproductdetail(id:number):Observable<any>{
    let URL = URL_SERVICE + '/detail/'+id;

   

    return this.http.get<any>(URL,);
      
  }
  basketlist():Observable<any>{
    let URL = URL_SERVICE + '/basket/cart';

    const token = localStorage.getItem('token');

   

    return this.http.get<any>(URL, );
      
  }

  createBasket(data:any):Observable<any>{
    let URL = URL_SERVICE + '/basket/cart/add';

    return this.http.post<any>(URL, data);
      
  }
  deleteBasket(id:number):Observable<any>{
    let URL = URL_SERVICE + '/basket/cart/delete/'+id;


    return this.http.delete<any>(URL,);
      
  }
  updateBasket(id:number, data:any):Observable<any>{
    let URL = URL_SERVICE + '/basket/cart/update/'+id;
  
    return this.http.post<any>(URL, data, );
      
  }
  clientaddress():Observable<any>{
    let URL = URL_SERVICE + '/basket/user/address';
      
    return this.http.get<any>(URL, );
      
  }
  
  createAddress(data:any):Observable<any>{
    let URL = URL_SERVICE + '/basket/user/address/add';
  
    return this.http.post<any>(URL, data, );
      
  }
  
  updateAddress(id:number, data:any):Observable<any>{
    let URL = URL_SERVICE + '/basket/user/address/update/'+id;
  
  
    return this.http.post<any>(URL, data, );
      
  }
  
  deleteAddress(id:number):Observable<any>{
    let URL = URL_SERVICE + '/basket/user/address/delete/'+id;
  
   
  
  
    return this.http.delete<any>(URL,);
      
  }
  checkout(data:any):Observable<any>{
    let URL = URL_SERVICE + '/basket/checkout';


    return this.http.post<any>(URL, data,);
      
  }
  getCartItemCount(): Observable<number> {
    let URL = URL_SERVICE + '/basket/items/count'; 
  
    return this.http.get<number>(URL);
  }
  
}
  

  