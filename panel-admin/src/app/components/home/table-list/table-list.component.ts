import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { URL_BACKEND } from 'src/config/config';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent  {

  orders:any[] =[];
  
  URL=URL_BACKEND
  

  constructor(
    public dashboardService: DashboardService
  ){}

  ngOnInit():void{
   this.allproduct();
  }
  allproduct(){
   
    
    this.dashboardService.topfoursale().subscribe((resp:any)=>{
      console.log(resp);
      this.orders = resp.orders.data;
    })
  }


}