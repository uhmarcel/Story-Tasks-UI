import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeCase'
})
export class NormalizeCasePipe implements PipeTransform {

  transform(input: string): string {
    if (!input) {
      return null;
    }

    const tokens = input.toLowerCase().split('_');
    const formatted = tokens.map(token => token.charAt(0).toUpperCase() + token.slice(1));

    let result = '';
    formatted.forEach(token => result += ' ' + token);
    return result.substring(1);
  }

}
