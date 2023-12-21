import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/services/ecommerce.servis';
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
        this.slides = resp.products.data.slice(0, 20); 
        console.log(resp.products.data)
        this.isLoading = false; 
        setInterval(() => {
          this.showNextSlide();
        }, 5000);} else {
        console.error('Ürünler alınırken bir hata oluştu: Ürünler bulunamadı.');
      }
    });
  }
  showNextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    // Burada slide'ı güncelleyerek göstermek için gerekli işlemleri yapabilirsiniz.
  }
}
