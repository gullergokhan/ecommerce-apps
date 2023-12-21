import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { URL_BACKEND } from 'src/config/config';
import { EcommerceService } from 'src/app/services/ecommerce.servis';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { ProductsComponent } from '../products/products.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SharedModule,ProductsComponent,LoadingSpinnerComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent  {
  products:any[] =[];
    orginalproducts:any[] =[];
    searchText:any=null;
    userId:number|undefined;
    URL=URL_BACKEND
    isLoading: boolean = false;
    
  
    constructor(
      public ProductService : EcommerceService,
      private router: Router
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
      })
    }
    
    goToProductDetail(productId: number) {
      this.router.navigate(['/product', productId]); 
  
    }
   
   
    reset() {
      this.searchText = null;
      this.allproduct();
    }
  }