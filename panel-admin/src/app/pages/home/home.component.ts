import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CustomerListComponent } from '../../components/home/customer-list/customer-list.component';
import { TableListComponent } from '../../components/home/table-list/table-list.component';
import { DashboardWidgetComponent } from '../../components/home/dashboard-widget/dashboard-widget.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,CustomerListComponent,TableListComponent,DashboardWidgetComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean=true;

  email:any = null;
  password:any = null;
  userCount:number=0;
  ProductCount:number=0;
  SaleCount:number=0;

  constructor(
    public authService: AuthService,
    public router: Router,
    public dashboardService:DashboardService
  ) {}

  ngOnInit(): void {
    if (!this.authService.user || !this.authService.token) {
      this.router.navigate(['/login']);
    } else {
      this.dashboardService.getUsersCount().subscribe(data => {
        if (data) {
          this.userCount = data.userCount;
          this.ProductCount = data.ProductCount;
          this.SaleCount = data.SaleCount;
        }
      });
  
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }
}