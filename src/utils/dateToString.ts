export default function dateToString(date: number) {
  const _date = new Date(date);
  return `${_date.getMinutes().toString().padStart(2, "0")}:${_date
    .getSeconds()
    .toString()
    .padStart(2, "0")}.${(_date.getMilliseconds() / 10)
    .toFixed(0)
    .toString()
    .padStart(2, "0")}`;
}
