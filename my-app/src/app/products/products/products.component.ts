import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductsService } from '../products.service'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService],
})
export class ProductsComponent implements OnInit, OnDestroy {
  showImage: boolean = true;
  keyword: any;

  constructor(private _productsService: ProductsService) { }

  subscriptions: Array<Subscription> = []

  ngOnInit() {
    this.subscriptions.push(this._productsService.getProducts()
      .subscribe(resp => {
        console.log(resp);
        this.products = resp;
      }, error => {
        console.log(error);
        // alert('error');
      }, () => {
        console.log('complete');
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  products: Array<any> = []
  
}
