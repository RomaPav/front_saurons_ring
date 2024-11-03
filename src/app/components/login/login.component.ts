import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthenticateService } from '../../services/authenticate.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { UserRole } from '../../model/enums/user_role';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule ],
  providers: [AuthenticateService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  authenticateService: AuthenticateService;
  constructor(authenticateService: AuthenticateService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object){
    this.authenticateService =authenticateService;
  }

  login() {
    if (this.username && this.password) {
      this.authenticateService.login(this.username,this.password).subscribe({
        next: (response) => {
          const user: User = AuthenticateService.getUserFromJwt(response.access_token)
          console.log(user);
          this.navigate(user);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("user", JSON.stringify(user));
          }
        },
        error: (error) => {
          console.error('Помилка входу', error);
        },
        complete: () => {
          console.log('Запит завершено');
        }
      });
    } else {
      console.error('Please fill in both fields');
    }
  }

  navigate(user: User){
    switch (user.getRole()) {
      case UserRole.OWNER:
        this.router.navigate(['/owner-home']);
        break;
      case UserRole.ADMIN:
        this.router.navigate(['/admin-home']);
        break;
      case UserRole.USER:
        this.router.navigate(['/user-home']);
        break;
      default:
        console.error('Невідома роль:', user.getRole());
        this.router.navigate(['/login']);
        break;
    }
  }
}

