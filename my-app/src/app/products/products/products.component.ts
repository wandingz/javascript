import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService],
})
export class ProductsComponent implements OnInit {
  showImage: boolean = false;

  constructor(private _productsService: ProductsService) { }

  ngOnInit() {
    this.products = this._productsService.getProducts();
  }

  products: Array<any> = []
  
}
