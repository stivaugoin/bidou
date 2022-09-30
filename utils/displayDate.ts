import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export function displayDate(date: Date | string): string {
  return dayjs(date).format("ll");
}
