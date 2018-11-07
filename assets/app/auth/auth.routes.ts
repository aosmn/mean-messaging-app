import { Routes } from '@angular/router';
import { SigninComponent } from './signin.component.ts'
import { SignupComponent } from './signup.component.ts'
import { LogoutComponent } from './logout.component.ts'

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
]
