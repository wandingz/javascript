import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'float2Array'
})
export class Float2ArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Array(Math.floor(value))
  }

}
