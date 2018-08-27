import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { LoginRouteGuard } from './login-route.guard';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { NavigationComponent } from './home/navigation/navigation.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "home", component: WelcomeComponent, canActivate: [LoginRouteGuard]},
      { path: "login", component: LoginComponent},
      { path: "signup", component: SignupComponent},
      { path: 'post', loadChildren: "../app/post/post.module#PostModule", canActivate: [LoginRouteGuard]},
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: 'home' },
    ]),
    HttpClientModule,
  ],
  providers: [
    AuthService, 
    LoginRouteGuard, 
    CookieService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
