import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserRequest } from '../../model/user-request';
import { UserRole } from '../../model/enums/user_role';

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss'
})
export class RegistryComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  authenticateService: AuthenticateService;
  constructor(authenticateService: AuthenticateService, private router: Router){
    this.authenticateService =authenticateService;
  }

  registry() {
    if (this.fullName && this.username && this.email && this.password) {
      const user : UserRequest = new UserRequest(this.username, this.password, this.fullName, this.email, UserRole.USER)
      this.authenticateService.registry(user).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Помилка входу', error);
        },
        complete: () => {
          console.log('Запит завершено');
        }
      });
    } else {
      console.error('Please fill in all fields');
    }
  }
}
