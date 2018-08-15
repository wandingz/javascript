import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args ? value.filter(v => v.productName.indexOf(args) >= 0) : value;
  }

}
