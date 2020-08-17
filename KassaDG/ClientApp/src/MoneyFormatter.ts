export class MoneyFormatter {
  public static format(cents: number): string {
    const money: number = MoneyFormatter.toEuros(cents);
    return `€ ${money.toFixed(2)}`;
  }

  public static toCents(euros: number): number {
    return euros * 100;
  }

  public static stringToCents(euros: string): number {
    return MoneyFormatter.toCents(parseFloat(euros.replace(",", ".")));
  }

  static toEuros(cents: number) {
    return cents / 100;
  }
}
