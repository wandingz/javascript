import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './home/login/login.component';
import { NavigationComponent } from './home/navigation/navigation.component';

import { AuthService } from './auth/auth.service';
import { LoginRouteGuard } from './login-route.guard';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { TempleteComponent } from './home/templete/templete.component';
import { ReactiveComponent } from './home/reactive/reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    NavigationComponent,
    TempleteComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "home", component: WelcomeComponent },
      { path: 'products', loadChildren: "../app/products/products/products.module#ProductsModule"},
      { path: "templete", component: TempleteComponent, canActivate: [LoginRouteGuard], },
      { path: "reactive", component: ReactiveComponent, canActivate: [LoginRouteGuard], },
      { path: "login", component: LoginComponent },
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
