import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AnimationsModule } from 'src/app/animations/animations.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  animations:[AnimationsModule.shake],
  styleUrls: ['./login.component.css']
})
export class  LoginComponent {
  email: any = null;
  password: any = null;
  loginError: string = ''; // Hata mesajını tutacak değişken

  constructor(
    public authService: AuthService,
    public router: Router
  ){}

  ngOnInit(): void {
    if(this.authService.user && this.authService.token) {
      this.router.navigate(["/"]);
    }
  }

  login() {
    if (!this.email || !this.password) {
      this.loginError = "Username and password are required."; // Kullanıcı adı ve şifre gereklidir.
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (resp: any) => {
        if (!resp.error && resp) {
          document.location.reload();
        } else {
          if (resp.error && resp.error.error === 'Unauthorized') {
            this.loginError = "Invalid username or password."; // Geçersiz kullanıcı adı veya şifre.
          }
        }
      },
      (error) => {
        this.loginError = "An error occurred. Please try again later."; // Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
        console.error(error);
      }
    );
  }
}