import clsx, { type ClassValue } from 'clsx';
import dayjs, { type Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import numeral from 'numeral';
import { twMerge } from 'tailwind-merge';

export const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
export const DEFAULT_HOUR_MINUTE_FORMAT = 'HH:mm';
export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_MONTH_FORMAT = 'DD MMM';
export const DATE_FULLMONTH_FORMAT = 'DD MMMM';
export const MONTH_YEAR_FORMAT = 'MMM YYYY';
export const DATE_FORMAT = 'DD';
export const DATE_MONTH_YEAR_FORMAT = 'DD MMM YYYY';
export const DATE_MONTHFULL_YEAR_FORMAT = 'DD MMMM YYYY';
export const FULL_DATE_TIME_24H_FORMAT = 'DD MMM YYYY, HH:mmA';
export const FULL_DATE_TIME_12H_FORMAT_IN_SECOND = 'DD MMM YYYY, hh:mm:ssA';
export const FULL_DATE_MONTH_TIME_24H_FORMAT = 'DD MMMM YYYY, HH:mmA';
export const FULL_DATE_TIME_FORMAT = 'DD MMMM YYYY, HH:mm';
export const SINGAPORE_PHONE_REGEX = /^(8|9)\d{7}$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const BUSINESS_EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@(?!hotmail.com)(?!gmail.com)(?!yahoo.co)(?!yahoo.com)(?!mailinator.com)(?!gmail.co.in)(?!aol.com)(?!yandex.com)(?!msn.com)(?!gawab.com)(?!inbox.com)(?!gmx.com)(?!rediffmail.com)(?!in.com)(?!live.com)(?!hotmail.co.uk)(?!hotmail.fr)(?!yahoo.fr)(?!wanadoo.fr)(?!wanadoo.fr)(?!comcast.net)(?!yahoo.co.uk)(?!yahoo.com.br)(?!yahoo.co.in)(?!rediffmail.com)(?!free.fr)(?!gmx.de)(?!gmx.de)(?!yandex.ru)(?!ymail.com)(?!libero.it)(?!outlook.com)(?!uol.com.br)(?!bol.com.br)(?!mail.ru)(?!cox.net)(?!hotmail.it)(?!sbcglobal.net)(?!sfr.fr)(?!live.fr)(?!verizon.net)(?!live.co.uk)(?!googlemail.com)(?!yahoo.es)(?!ig.com.br)(?!live.nl)(?!bigpond.com)(?!terra.com.br)(?!yahoo.it)(?!neuf.fr)(?!yahoo.de)(?!live.com)(?!yahoo.de)(?!rocketmail.com)(?!att.net)(?!laposte.net)(?!facebook.com)(?!bellsouth.net)(?!yahoo.in)(?!hotmail.es)(?!charter.net)(?!yahoo.ca)(?!yahoo.com.au)(?!rambler.ru)(?!hotmail.de)(?!tiscali.it)(?!shaw.ca)(?!yahoo.co.jp)(?!sky.com)(?!earthlink.net)(?!optonline.net)(?!freenet.de)(?!t-online.de)(?!aliceadsl.fr)(?!virgilio.it)(?!home.nl)(?!qq.com)(?!telenet.be)(?!me.com)(?!yahoo.com.ar)(?!tiscali.co.uk)(?!yahoo.com.mx)(?!gmx.net)(?!mail.com)(?!planet.nl)(?!tin.it)(?!live.it)(?!ntlworld.com)(?!arcor.de)(?!yahoo.co.id)(?!frontiernet.net)(?!hetnet.nl)(?!live.com.au)(?!yahoo.com.sg)(?!zonnet.nl)(?!club-internet.fr)(?!juno.com)(?!optusnet.com.au)(?!blueyonder.co.uk)(?!bluewin.ch)(?!skynet.be)(?!sympatico.ca)(?!windstream.net)(?!mac.com)(?!centurytel.net)(?!chello.nl)(?!live.ca)(?!aim.com)(?!bigpond.ne)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/;
export const DIGIT_REGEX = /\d/;
export const LOWERCASE_REGEX = /[a-z]/;
export const UPPERCASE_REGEX = /[A-Z]/;
export const SPECIAL_REGEX = /[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<.>/?]/;
export const NOT_SPECIAL_REGEX = /^[A-Za-z0-9._]+$/;

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(isBetween);

export function numeralFormat(number: number, type = 'AUTO'): string {
  if (type === 'AUTO') {
    switch (true) {
      case Number.isNaN(number):
        type = '0,0';
        break;
      case Math.floor(number) !== number:
        type = '0,0.00';
        break;
      default:
        type = '0,0';
        break;
    }
  }
  return numeral(number).format(type);
}

export function dateTimeFormat(
  date: Dayjs | Date | string | number,
  format = FULL_DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format);
}

export function isDifferentDay(date1: string, date2: string): boolean {
  if (!date1 || !date2) return false;
  const d1 = dayjs(date1, 'YYYY-MM-DD');
  const d2 = dayjs(date2, 'YYYY-MM-DD');
  return !!dayjs(d1).diff(d2, 'day');
}

export function isSameDay(date1: string, date2: string): boolean {
  if (!date1 || !date2) return false;
  const d1 = dayjs(date1, 'YYYY-MM-DD');
  const d2 = dayjs(date2, 'YYYY-MM-DD');
  return !!dayjs(d1).isSame(d2, 'day');
}

export function convertTime(milisecons: number) {
  const mils = Math.max(milisecons, 0);
  const days = Math.floor(mils / (1000 * 60 * 60 * 24));
  const hours = Math.floor((mils / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((mils / 1000 / 60) % 60);
  const seconds = Math.floor((mils / 1000) % 60);

  return {
    days: ('0' + days).slice(-2),
    hours: ('0' + hours).slice(-2),
    seconds: ('0' + seconds).slice(-2),
    minutes: ('0' + minutes).slice(-2)
  };
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
