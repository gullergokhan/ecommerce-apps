import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { EcommerceService } from 'src/app/common/services/ecommerce.servis';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule,LoadingSpinnerComponent],
  templateUrl: './categories.component.html',
  
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isLoading: boolean = true; // Default olarak true olarak ayarlanır.

  categories: any[] = [];
  productsByCategory: any[] = [];

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit() {
    this.ecommerceService.getCategory().subscribe((data: any) => {
      this.categories = data['categories']; 
      this.isLoading = false; 
       if (this.categories.length > 0) {
      this.onCategoryClick(this.categories[2].id);
    }
    });
    
  }
 onCategoryClick(categoryId: number) {
  this.isLoading = true; // Yükleniyor göstergesini aktif et

  this.ecommerceService.getProductsByCategory(categoryId).subscribe((data) => {
    if (Array.isArray(data.products)) {
      this.productsByCategory = data.products; // Assign products array to productsByCategory
      this.isLoading = false; // Yükleniyor göstergesini kapat
      console.log(data.products); // Log the products array to verify the received data
    } else {
      // Handle error or unexpected data structure
      console.error('Received data does not contain an array of products:', data);
    }
  });
}
  
}