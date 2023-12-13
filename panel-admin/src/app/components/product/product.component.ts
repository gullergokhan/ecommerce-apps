import { Component } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { ListProductComponent } from './list-product/list-product.component';
import { NavbarComponent } from '../layouts/navbar/navbar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule,ListProductComponent,NavbarComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

}
