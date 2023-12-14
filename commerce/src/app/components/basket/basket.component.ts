import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EcommerceService } from 'src/app/common/services/ecommerce.servis';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { URL_BACKEND } from 'src/config/config';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  listCarts:any = [];
  Subtotal:any = 0;
  TotalPrice:any=0;
  URL=URL_BACKEND;

  constructor(

    public ecommerceService:EcommerceService,
    public router:Router
  ){}

  calculeteTotal():number{
    return this.listCarts.reduce((sum:number, item:any)=> sum +item.total,0 )
  }

  calculeteSubTotal():number{
    return this.listCarts.reduce((sum:number, item:any)=> sum +item.subtotal,0 )
  }

  calculateTotalPrice():void
  {
    this.Subtotal = this.calculeteSubTotal();
    this.TotalPrice = this.calculeteTotal();
  }

  ngOnInit():void{

    

    this.ecommerceService.basketlist().subscribe((resp:any)=>{
      console.log(resp);

      if(resp && resp.carts && resp.carts.data)
      {
        this.listCarts=resp.carts.data;
        this.calculateTotalPrice();
      }
      else
      {
        console.log("Invalid", resp);
      }

    })
  }

  decrement(cart:any):void
  {
   

    if(cart.quantity > 1){
      cart.quantity --;

      cart.subtotal = cart.unit_price*cart.quantity;
      cart.total = cart.discount*cart.quantity;

      this.ecommerceService.updateBasket(cart.id, cart).subscribe((resp:any)=>{

        this.calculateTotalPrice();
      })

    }

  }

  increment(cart:any):void
  {
    

    cart.quantity ++;

    cart.subtotal = cart.unit_price*cart.quantity;
    cart.total = cart.discount*cart.quantity;

    this.ecommerceService.updateBasket(cart.id, cart).subscribe((resp:any)=>{

      this.calculateTotalPrice();
      if(resp.message==403)
      {
        console.log(resp.message_text);
        return;
      }
    })
    
  }

  deleteItem(cart:any)
  {
   


    this.ecommerceService.deleteBasket(cart.id).subscribe();

    this.ecommerceService.basketlist().subscribe((resp:any)=>{

      if(resp && resp.carts && resp.carts.data)
      {
        this.listCarts=resp.carts.data;
      }
      else
      {
        console.log("Invalid", resp);
      }

      

    })

    


  }
 

}