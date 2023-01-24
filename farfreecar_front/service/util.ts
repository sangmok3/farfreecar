export default class Utils {
  public static printairportNm(name: string) {
    switch (name) {
      case "무안":
        return "NAARKJB";

      default:
        return "기타";
    }
  }
}
