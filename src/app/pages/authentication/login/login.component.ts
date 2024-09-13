import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { F } from '@angular/cdk/keycodes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class AppSideLoginComponent {
  username?: string;
  password?: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.toast.error('Please enter username and password');
      return;
    }
    this.authService.login(this.username!, this.password!).subscribe({
      next: (data: any) => {
        console.log(data);
        localStorage.setItem('mamlaka-token', data?.accessToken);

        setTimeout(() => {}, 1000);
        this.router.navigate(['/dashboard']);
        this.toast.success('Login successful');
      },
      error: (error) => {
        console.error(error);
        this.toast.error('Invalid username or password');
      }
    });
  }
}
