import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatTableModule, MatDialogModule, MatListModule, MatIconModule, MatInputModule, MatCheckboxModule,
  MatButtonModule, MatChipsModule, MatFormFieldModule, MatSelectModule, MatToolbarModule, MatTabsModule
} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SigninComponent } from './account/signin/signin.component';
import { LoginComponent } from './account/login/login.component';
import { UserService } from './services/user.service';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { AuthenticationInterceptor} from './authentication.intercepter';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AccountComponent,
    HomeComponent,
    MenuComponent,
    SigninComponent,
    LoginComponent,
    PersonalAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [DataService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
