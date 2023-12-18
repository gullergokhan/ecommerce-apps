import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../__services/dashboard.service';
import { URL_BACKEND } from 'src/config/config';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent  {
  products:any[] =[];
  orginalproducts:any[] =[];
  searchText:any=null;
  userId:number|undefined;
  URL=URL_BACKEND
  

  constructor(
    public dashboardService: DashboardService
  ){}

  ngOnInit():void{
   this.allproduct();
  }
  allproduct(){
   
    let LINK="";
    if(this.searchText){
      LINK = LINK+ "&search="+this.searchText;
    }
    this.dashboardService.topfourall().subscribe((resp: any) => {
      console.log(resp);
      if (resp && resp.products && resp.products.data) {
        this.products = resp.products.data;
      } else {
        // Handle the case when the expected properties are not available in the response
      }
    });
  }

}