import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './account/signin/signin.component';
import { LoginComponent } from './account/login/login.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/signin', component: SigninComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'personalAccount', component: PersonalAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }