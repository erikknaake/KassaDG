import {Component, Input} from "@angular/core";
import {MoneyFormatter} from "../../../../MoneyFormatter";

@Component({
  selector: 'app-balance-chip',
  templateUrl: './balance-chip.component.html',
  styleUrls: ['./balance-chip.component.scss']
})
export class BalanceChipComponent {

  @Input()
  balanceCents: number;

  constructor() {
  }

  formatMoney(balanceCents: number): string {
    return MoneyFormatter.format(balanceCents);
  }

}
