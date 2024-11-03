import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent,
    RegistryComponent,
    UserHomeComponent, 
    AdminHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ring';
}
