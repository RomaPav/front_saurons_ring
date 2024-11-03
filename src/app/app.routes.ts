import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { OwnerHomeComponent } from './components/owner-home/owner-home.component';
import { ActionComponent } from './components/action/action.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateTradeLotComponent } from './components/create-trade-lot/create-trade-lot.component';
import { EditTradeLotComponent } from './components/edit-trade-lot/edit-trade-lot.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: LoginComponent },
    { path: '/', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistryComponent },
    // { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard], data: { role: 'User' } },
    // { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
    // { path: 'owner-home', component: OwnerHomeComponent, canActivate: [AuthGuard], data: { role: 'Owner' } },
    { path: 'user-home', component: UserHomeComponent},
    { path: 'admin-home', component: AdminHomeComponent},
    { path: 'owner-home', component: OwnerHomeComponent,},
    { path: 'auction/:id', component: ActionComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'create-lot', component: CreateTradeLotComponent },
    { path: 'edit-lot/:id', component: EditTradeLotComponent },
    // { path: '**', redirectTo: '/login' }
];
