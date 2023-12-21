import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { SliderComponent } from '../../app/components/slider/slider.component';
import { CategoriesComponent } from '../../app/components/categories/categories.component';
import { ProductsComponent } from '../../app/components/products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,SliderComponent,CategoriesComponent,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
