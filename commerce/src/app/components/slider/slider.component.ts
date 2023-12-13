import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/common/services/ecommerce.servis';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  isLoading: boolean = true; 

  slides: any[] = []; 
  currentSlide = 0;

 
  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit() {
    this.ecommerceService.getProduct().subscribe((resp: any) => {
      console.log('Response:', resp); 
      if (resp && resp.products && resp.products.data) {
        this.slides = resp.products.data.slice(0, 10); 
        console.log(resp.products.data)
        this.isLoading = false; 
      } else {
        console.error('Ürünler alınırken bir hata oluştu: Ürünler bulunamadı.');
      }
    });
  }
 
}
