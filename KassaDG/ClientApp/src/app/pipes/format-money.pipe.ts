import {Pipe, PipeTransform} from "@angular/core";
import {MoneyFormatter} from "../../MoneyFormatter";

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return MoneyFormatter.format(value);
  }
}
