import { Component } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { URL_BACKEND } from 'src/config/config';
import { ProductService } from '../_services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent  {
  products:any[] =[];
    orginalproducts:any[] =[];
    searchText:any=null;
    userId:number|undefined;
    URL=URL_BACKEND;
    page: number = 1;
    
    
  
    constructor(
      public ProductService : ProductService
    ){}
  
    ngOnInit():void{
     this.allproduct();
    }
    allproduct(page=1){
     
      let LINK="";
      if(this.searchText){
        LINK = LINK+ "&search="+this.searchText;
      }
      this.ProductService.getProduct(page, LINK).subscribe((resp:any)=>{
        console.log(resp);
        this.products = resp.products.data;
        this.page = page;
      })
    }
    
     
   
    deleteProduct(id: number) {
      this.ProductService.deleteProduct(id).subscribe(response => {
       
        this.products = this.products.filter(product => product.id !== id);
      }, error => {
        console.error("Product Delete Failed", error);
      });
    }
    pageChanged(pageNumber: number): void {
      this.page = pageNumber; 
      this.allproduct(pageNumber); 
    }
    reset() {
      this.searchText = null;
      this.allproduct();
    }
  }