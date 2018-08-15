import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductsPipe } from './products/products.pipe';
import { RatingComponent } from './products/rating/rating.component';
import { Float2ArrayPipe } from './products/float2-array.pipe';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { DetailComponent } from './home/detail/detail.component';
import { LoginComponent } from './home/login/login.component';
import { NavigationComponent } from './home/navigation/navigation.component';

import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsPipe,
    RatingComponent,
    Float2ArrayPipe,
    WelcomeComponent,
    DetailComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "home", component: WelcomeComponent },
      { path: "products", component: ProductsComponent },
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: 'home' },
    ]),
    HttpModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
