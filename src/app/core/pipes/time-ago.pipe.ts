import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    const str = moment(value).fromNow();
    
    return str
    .replaceAll('in a few', 'vài')
    .replaceAll('a few', 'vài')
    .replaceAll('an hour', '1 giờ')
    .replaceAll('a minute', '1 phút')
    .replaceAll('minutes', 'phút')
    .replaceAll('years', 'năm')
    .replaceAll('seconds', 'giây')
    .replaceAll('hours', 'giờ')
    .replaceAll('days', 'ngày')
    .replaceAll('ago', 'trước')
    .replaceAll('month', 'tháng');
  }

}