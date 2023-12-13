import { Component } from '@angular/core';
import { URL_BACKEND } from 'src/config/config';
import { EccomerceService } from 'src/app/common/services/ecommerce.service';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { NavbarComponent } from '../layouts/navbar/navbar.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule,NavbarComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  {
  categories:any[] =[];
  orginalcategories:any[] =[];
  searchText:string = '';
  userId:number|undefined;
  URL=URL_BACKEND
  

  constructor(
    public EccommerceService:EccomerceService
  ){}

  ngOnInit(){
    this.EccommerceService.getCategory().subscribe((data:any)=>{
      this.categories = data['categories'];
      this.orginalcategories= data['categories'];
    })
  }
  onSearch(){
    if(this.searchText===''){
      this.categories = this.orginalcategories;
    }
    else{
      this.categories=this.orginalcategories.filter(category=>{
        return category.name.toLowerCase().includes(this.searchText.toLowerCase()) 
            
      })
    }
  }
  deleteCategory(id:number){
    this.EccommerceService.deletecategory(id).subscribe(response=>{

      this.EccommerceService.getCategory().subscribe((data:any)=>{
        this.categories = data['categories'];
        this.orginalcategories= data['categories'];
      });

    },error=>{
      console.error("User Delete Failed", error);
    })
  }
  

  
}