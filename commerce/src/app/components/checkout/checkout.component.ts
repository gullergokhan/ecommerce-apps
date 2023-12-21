import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.servis';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent   {

  name:any = null;
  surname:any = null;
  company_name:any = null;
  country:any = null;
  city:any = null;
  zip_code:any = null;
  phone:any = null;
  email:any = null;
  listCarts:any = [];
  defaultUserId: number = 1; 
  listAddress:any = [];

  Subtotal:any = 0;
  TotalPrice:any=0;
  adress_selected:any=null;

  registrationSuccess = false;
  successMessage= "Registtration Successful"

  registrationError= false;
  errorMessage:any=null;
  
  user:any=null;
 

  constructor(

    public ecommerceService:EcommerceService,
    
    public router:Router
  ){}


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

    this.ecommerceService.clientaddress().subscribe((resp:any)=>{
      console.log(resp);
      this.listAddress = resp.address
    })
  }

  calculeteTotal(): number {
    return this.listCarts.reduce((sum: number, item: any) => sum + (item.discount || 0), 0);
  }
  
  calculeteSubTotal(): number {
    return this.listCarts.reduce((sum: number, item: any) => sum + (item.discount || 0), 0);
  }

  calculateTotalPrice():void
  {
    this.Subtotal = this.calculeteSubTotal();
    this.TotalPrice = this.calculeteTotal();
    }

  selectAddress(address:any)
  {

    this.adress_selected = address;
    this.name = address.name
    this.surname= address.surname
    this.company_name= address.company_name
    this.country= address.country
    this.city= address.city
    this.zip_code= address.zip_code
    this.phone= address.phone
    this.email= address.email


  }

  resetAddress()
  {

    this.adress_selected = null;
    this.name = null;
    this.surname= null;
    this.company_name= null;
    this.country= null;
    this.city= null;
    this.zip_code= null;
    this.phone= null;
    this.email=null;

  }

  save()
  {

    if(!this.name && !this.surname)
    {
      this.registrationError=true;
      this.errorMessage="Full name and ful surname required"
    
      setTimeout(()=>{
        this.registrationError=false;
      }, 5000);

    }

    if(!this.country && !this.city)
    {
      this.registrationError=true;
      this.errorMessage="Country and City required"
    
      setTimeout(()=>{
        this.registrationError=false;
      }, 5000);

    }

    if(!this.email && !this.phone)
    {
      this.registrationError=true;
      this.errorMessage="Email and Phone required"
    
      setTimeout(()=>{
        this.registrationError=false;
      }, 5000);

    }


    if(this.adress_selected){
      this.updateAddress();
    }
    else{
      this.addAddress();
    }

  }

  updateAddress()
  {
    let data = {


      name:this.name,
      surname:this.surname,
      company_name:this.company_name,
      country:this.country,
      city:this.city,
      zip_code:this.zip_code,
      phone:this.phone,
      email:this.email,


    }

    this.ecommerceService.updateAddress(this.adress_selected.id, data).subscribe((resp:any)=>{
      console.log(resp);
      this.ecommerceService.clientaddress().subscribe((resp:any)=>{
        console.log(resp);
        this.listAddress = resp.address
      })
      this.registrationSuccess=true;
      this.successMessage="Update Successfull"
    
      setTimeout(()=>{
        this.registrationSuccess=false;
      }, 5000);

    })

  }
  delete(id :number)
  {
    console.log(id);
    this.ecommerceService.deleteAddress(id).subscribe((resp:any)=>{
      console.log(resp);

      this.ecommerceService.clientaddress().subscribe((resp:any)=>{
        console.log(resp);
        this.listAddress = resp.address
      })

    })

   

  }

  addAddress() {
    if (!this.name || !this.surname || !this.country || !this.city || !this.email || !this.phone) {
        this.registrationError = true;
        this.errorMessage = "All fields are required";

        setTimeout(() => {
            this.registrationError = false;
        }, 5000);
    } else {
        let data = {
            name: this.name,
            surname: this.surname,
            company_name: this.company_name,
            country: this.country,
            city: this.city,
            zip_code: this.zip_code,
            phone: this.phone,
            email: this.email,
        };

        this.ecommerceService.createAddress(data).subscribe((resp: any) => {
            console.log(resp);
            this.ecommerceService.clientaddress().subscribe((resp: any) => {
                console.log(resp);
                this.listAddress = resp.address;
            });
            this.registrationSuccess = true;
            this.successMessage = "Create Successful";

            setTimeout(() => {
                this.registrationSuccess = false;
            }, 5000);
        });
    }
}
  Ordercomplete()
  {

  

    if(!this.adress_selected)
    {
      this.registrationError=true;
      this.errorMessage="Select adress select"
    
      setTimeout(()=>{
        this.registrationError=false;
      }, 5000);

    }
    let userId = this.user ? this.user.id : this.defaultUserId;
    

    let orderData={
      sale:{
        user_id:userId,
        total:this.TotalPrice,
        subtotal:this.Subtotal,

      },
      sale_address:{

        name:this.adress_selected.name,
        surname:this.adress_selected.surname,
        company_name:this.adress_selected.company_name,
        country:this.adress_selected.country,
        city:this.adress_selected.city,
        zip_code:this.adress_selected.zip_code,
        phone:this.adress_selected.phone,
        email:this.adress_selected.email,


      }


    }

    this.ecommerceService.checkout(orderData).subscribe((resp:any)=>{
      console.log(resp);

      this.registrationSuccess=true;
      this.successMessage="Checkout Successfull"
    
      setTimeout(()=>{
        this.registrationSuccess=false;
      }, 5000);

    })
    this.router.navigate(['/order-completed']);


  }

}