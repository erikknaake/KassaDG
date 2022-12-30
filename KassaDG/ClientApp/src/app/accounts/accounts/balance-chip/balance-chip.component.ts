import {Component, Input} from "@angular/core";

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

}
