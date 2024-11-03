import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any = null;
  originalUser: any;
  purchases: any[] =[];
  constructor(private userService: UserService, private orderService: OrderService,@Inject(PLATFORM_ID) private platformId: Object){
    if (isPlatformBrowser(this.platformId)) {
      const user_storage = localStorage.getItem("user");
      this.user = user_storage ? JSON.parse(user_storage) : null;
    }
    this.originalUser = { ...this.user }; 
  }

  hasChanges = false;
  ngOnInit(){
    this.getPurchasses()
  }

  onChanges() {
    this.hasChanges = JSON.stringify(this.user) !== JSON.stringify(this.originalUser);
  }

  saveChanges() {
    console.log(this.user)
    if(this.user !=null){
      const userRequest = {
        "id": this.user.id,
        "role": this.user.role,
        "login": this.user.login,
        "email": this.user.email,
        "password": this.user.password,
        "full_name": this.user.fullName,
      }
      console.log(userRequest)
       if (this.user.password.length >= 8){
        this.userService.update(userRequest).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.error('Помилка входу', error);
          },
          complete: () => {
            console.log('Запит завершено');
          }
        });
        this.originalUser = { ...this.user }; 
        this.hasChanges = false; 
        alert('Зміни збережено!'); 
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem("user", JSON.stringify(this.user))
        }
       }else{
        alert('Заповніть всі поля'); 
       }
    }else{
      console.log("локал сторедж не працює")
    }

  }
  getPurchasses(){
    if(this.user !=null){
      this.orderService.getByUserId(this.user.id).subscribe({
        next: (response) => {
          console.log(response)
          this.purchases = response.data;
        },
        error: (error) => {
          console.error('Помилка входу', error);
        },
        complete: () => {
          console.log('Запит завершено');
        }
      });
    }else{
      console.log('локал сторедж не прарцює');
    }
  }
}
