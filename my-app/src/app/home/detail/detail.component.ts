import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { ProductsService, Product } from "../../products/products.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  productCode: string;
  product: Product;
  constructor(private _activatedRoute: ActivatedRoute, private _productsService: ProductsService) { }

  ngOnInit() {
    this._activatedRoute.params.mergeMap(data => {
      this.productCode = data.pid;
      return this._productsService.getProductsByCode(this.productCode);
    }).subscribe(product => {
      this.product = product;
    })
    // this._activatedRoute.params.subscribe(data => {
    //   this.productCode = data.pid;
    //   this._productsService.getProductsByCode(this.productCode)
    // });
  }

}
