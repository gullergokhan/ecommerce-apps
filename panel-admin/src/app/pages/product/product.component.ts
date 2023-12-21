import { Component } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { ListProductComponent } from '../../components/product/list-product/list-product.component';
import { NavbarComponent } from '../../components/layouts/navbar/navbar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule,ListProductComponent,NavbarComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

}
