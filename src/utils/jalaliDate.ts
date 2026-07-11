export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

export function toJalali(gregorian: Date): JalaliDate {
  const gy = gregorian.getFullYear();
  const gm = gregorian.getMonth() + 1;
  const gd = gregorian.getDate();

  let jy = gy - 1600;
  let jd = gd - 1;

  let gDayNo =
    365 * (gy - 400) +
    Math.floor((gy - 400 + 3) / 4) -
    Math.floor((gy - 400 + 99) / 100) +
    Math.floor((gy - 400 + 399) / 400);

  const gMonthDays = [
    31,
    28 + (isGregorianLeap(gy) ? 1 : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  for (let i = 0; i < gm - 1; i++) {
    gDayNo += gMonthDays[i] ?? 0;
  }
  gDayNo += gd - 1;

  let jDayNo = gDayNo - 79;
  const j400 = Math.floor(jDayNo / 146097);
  jDayNo %= 146097;

  let leap = true;
  if (jDayNo >= 36525) {
    jDayNo--;
    const j100 = Math.floor(jDayNo / 36524);
    jDayNo %= 36524;
    if (jDayNo >= 365) jDayNo++;
    else leap = false;
    jy = 400 * j400 + 100 * j100;
  } else {
    jy = 400 * j400;
  }

  const j4 = Math.floor(jDayNo / 1461);
  jDayNo %= 1461;

  if (jDayNo >= 366) {
    leap = false;
    jDayNo--;
    const j1 = Math.floor(jDayNo / 365);
    jDayNo %= 365;
    jy += 4 * j4 + j1;
  } else {
    jy += 4 * j4;
  }

  const jMonthDays = [
    31,
    31,
    31,
    31,
    31,
    31,
    30,
    30,
    30,
    30,
    30,
    leap ? 30 : 29,
  ];
  let jMonth = 0;
  for (let i = 0; i < 12; i++) {
    const days = jMonthDays[i] ?? 0;
    if (jDayNo < days) {
      jMonth = i + 1;
      jd = jDayNo + 1;
      break;
    }
    jDayNo -= days;
  }

  return { year: jy, month: jMonth, day: jd };
}

export function todayJalali(): JalaliDate {
  return toJalali(new Date());
}

export function formatJalali(date: JalaliDate): string {
  const mm = String(date.month).padStart(2, "0");
  const dd = String(date.day).padStart(2, "0");
  return `${date.year}/${mm}/${dd}`;
}

export function buildFileName(baseName: string): string {
  const today = todayJalali();
  const mm = String(today.month).padStart(2, "0");
  const dd = String(today.day).padStart(2, "0");
  const name = baseName.trim() || "لیست دروس";
  return `${name}/${mm}/${dd}`;
}

function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
