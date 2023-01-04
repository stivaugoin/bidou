import dayjs from "dayjs";
import { MONTH_YEAR } from "./constant";

export function getLastThreeMonths() {
  return [...Array(3)].map((_, i) =>
    dayjs().subtract(i, "month").format(MONTH_YEAR)
  );
}
