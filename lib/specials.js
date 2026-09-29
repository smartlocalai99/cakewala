// The shop is in Kadapa, so specials switch at midnight India time no matter where
// the visitor's device clock is set.
const SHOP_TIME_ZONE = "Asia/Kolkata";

export function shopToday(now = new Date()) {
  return {
    day: new Intl.DateTimeFormat("en-US", { timeZone: SHOP_TIME_ZONE, weekday: "short" }).format(now),
    date: new Intl.DateTimeFormat("en-CA", { timeZone: SHOP_TIME_ZONE }).format(now), // YYYY-MM-DD
  };
}

export function isShowingToday(special, { day, date }) {
  if (special.days && !special.days.includes(day)) return false;
  if (special.from && date < special.from) return false;
  if (special.to && date > special.to) return false;
  return true;
}
