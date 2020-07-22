import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let formato = 'DD/MM/YYYY'
    if (value) {
      if (args.length > 0) {
        [formato] = args;
      }
      return moment(value).format(formato);
    } else {
      return null
    }
  }
}
