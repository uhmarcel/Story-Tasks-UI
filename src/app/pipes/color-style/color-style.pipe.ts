import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorStyle'
})
export class ColorStylePipe implements PipeTransform {

  transform(hexColor: string, ...args: unknown[]): object {
    return { backgroundColor: hexColor };
  }

}
