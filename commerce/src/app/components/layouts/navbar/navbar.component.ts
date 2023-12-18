import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EcommerceService } from 'src/app/common/services/ecommerce.servis';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  itemCount: number = 0;

  constructor(private ecommerceService: EcommerceService) { }
  
  ngOnInit(): void {
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    this.ecommerceService.getCartItemCount().subscribe((response: any) => {
      this.itemCount = response.item_count; // 'item_count' özelliğini kullanarak 'itemCount' değerini güncelle
      console.log(this.itemCount);
    }, (error) => {
      console.error('Error fetching cart item count:', error);
    });
  }
}