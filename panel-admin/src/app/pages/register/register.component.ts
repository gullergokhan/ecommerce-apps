import { Component } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { AnimationsModule } from 'src/app/animations/animations.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  animations:[AnimationsModule.shake],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name :any =null;
  email:any =null;
  password :any =null;
  password_confirmation:any =null;

  constructor(
    public authService:AuthService,
    public router:Router
  ){}

  ngOnInit(): void{
    if(this.authService.user && this.authService.token){
      this.router.navigate(["/"])
    }
  }

  register(){
    if(!this.name || !this.email || !this.password || !this.password_confirmation){
      alert("Empty Form")
      return;
    }
    if(this.password != this.password_confirmation){
      alert("Password not match")
      return;
    }

    let data ={
      name:this.name,
      email:this.email,
      password:this.password,
      password_confirmation:this.password_confirmation,


    };

    this.authService.register(data).subscribe((resp:any)=>{
      console.log(resp);
      this.router.navigate(["/login"]);
    })

  }


}