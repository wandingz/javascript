import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products.component';
import { ProductsPipe } from '../products.pipe';
import { RatingComponent } from '../rating/rating.component';
import { Float2ArrayPipe } from '../float2-array.pipe';
import { DetailComponent } from '../../home/detail/detail.component';

import { LoginRouteGuard } from '../../login-route.guard';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsPipe,
    RatingComponent,
    DetailComponent,
    Float2ArrayPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent, canActivate: [LoginRouteGuard], },
      { path: "details/:pid", component: DetailComponent },
    ]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class ProductsModule { }
