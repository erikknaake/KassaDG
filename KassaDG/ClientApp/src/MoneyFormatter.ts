export class MoneyFormatter {
  public static Format(cents: number): string {
    const money: number = cents / 100;
    return `€ ${money.toFixed(2)}`;
  }
}
