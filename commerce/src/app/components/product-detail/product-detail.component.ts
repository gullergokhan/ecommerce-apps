import { Component } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { ProductsComponent } from '../products/products.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService } from 'src/app/common/services/ecommerce.servis';
import { URL_BACKEND } from 'src/config/config';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SharedModule,ProductsComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  URL=URL_BACKEND;
  id:number |undefined;
  title:any=null;
  stock:any=null;
  price_dsc:any=null;
  price_usd:any=null;
  summary:any=null;
  description:any=null;
  imageEcommerce:any=null;
  sizes:any=[];
  images:any=[];
  products:any=[];
  categoryname:any=null;
  selectedSize:any;
  selectedColor:any;
  quantity:number = 1;
  productsb:any=[];
  discount_p:any;
  SizeVisible:any=1;
  type_discount:any= null;
  unit_price:any=0;
  product_size_id	:any=0;
  product_color_size_id	:any=0;

  constructor(
    public ecommerce:EcommerceService,
    public route : ActivatedRoute,
    public router : Router,
    

  ){}

  decrement():void{

    if(this.quantity>1)
    {
      this.quantity--;
    }
  }
  increment():void
  {
    this.quantity++;
  }

  onSizeChange(selectedSize:any)
  {
    this.selectedSize = selectedSize;
    this.product_size_id=selectedSize.id

  }

  onColorChange(SelectedColor:any)
  {
    this.selectedColor = SelectedColor;
    this.product_color_size_id=SelectedColor;
  }

  ngOnInit():void
  {
    this.route.params.subscribe(params=>{
      this.id = + params['id']
      console.log(this.id);

      this.ecommerce.getproductdetail(this.id).subscribe((resp:any)=>{
        console.log(resp);
        this.title = resp.product.title
        this.stock = resp.product.stock
        this.price_dsc = resp.product.price_dsc

      
       
        this.summary = resp.product.summary
        this.description = resp.product.description
        this.imageEcommerce = resp.product.imageEcommerce
        this.sizes = resp.product.sizes
        this.images = resp.product.images
        this.categoryname = resp.product.category.name
        this.productsb = resp['product_a'];

        this.unit_price= resp.product.price_usd

        if(resp.product.sizes.length === 0)
        {
          this.SizeVisible=0;
        }

      


      })
    })


  }
  changeMainImage(newImage:string):void{
    this.imageEcommerce=newImage;
  }

  addCart()
  {
    

    let data= {
      
      product_id:this.id,
      type_discount:this.type_discount,
      discount:this.price_dsc,
      quantity:this.quantity,
      unit_price:this.unit_price,
      subtotal:this.unit_price*this.quantity,
      total:this.price_usd*this.quantity,
 
    }


    console.log(data);

    this.ecommerce.createBasket(data).subscribe((resp:any)=>{
      console.log(resp);

      if(resp.message==403)
      {
        console.log(resp.message_text)
        return;
      }
      else{
        console.log("The product has beeen added to cart");
      }
    })

    console.log(data);

  }

}