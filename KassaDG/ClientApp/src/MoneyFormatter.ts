export class MoneyFormatter {
  public static format(cents: number): string {
    const money: number = cents / 100;
    return `€ ${money.toFixed(2)}`;
  }

  public static toCents(euros: number): number {
    return euros * 100;
  }

  public static stringToCents(euros: string): number {
    return MoneyFormatter.toCents(parseFloat(euros.replace(",", ".")));
  }
}
