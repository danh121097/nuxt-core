import { describe, it, expect } from 'vitest';
import {
  numeralFormat,
  dateTimeFormat,
  isDifferentDay,
  isSameDay,
  convertTime,
  cn,
  DEFAULT_DATE_FORMAT
} from '../../../app/utils/index';
import dayjs from 'dayjs';

describe('Utils - numeralFormat', () => {
  it('should format integers with AUTO mode', () => {
    expect(numeralFormat(1000)).toBe('1,000');
    expect(numeralFormat(1234567)).toBe('1,234,567');
    expect(numeralFormat(0)).toBe('0');
  });

  it('should format decimals with AUTO mode', () => {
    expect(numeralFormat(1234.56)).toBe('1,234.56');
    expect(numeralFormat(0.99)).toBe('0.99');
  });

  it('should handle NaN with AUTO mode', () => {
    // numeral.js formats NaN as '0'
    expect(numeralFormat(NaN)).toBe('0');
  });

  it('should format with custom type', () => {
    expect(numeralFormat(1234.5678, '0,0.00')).toBe('1,234.57');
    expect(numeralFormat(1000, '0,0')).toBe('1,000');
  });

  it('should handle negative numbers', () => {
    expect(numeralFormat(-1234)).toBe('-1,234');
    expect(numeralFormat(-1234.56)).toBe('-1,234.56');
  });
});

describe('Utils - dateTimeFormat', () => {
  it('should format Date object', () => {
    const date = new Date('2024-12-03T10:30:00');
    const result = dateTimeFormat(date, DEFAULT_DATE_FORMAT);
    expect(result).toBe('03/12/2024');
  });

  it('should format string date', () => {
    const result = dateTimeFormat('2024-12-03', DEFAULT_DATE_FORMAT);
    expect(result).toBe('03/12/2024');
  });

  it('should format number timestamp', () => {
    const timestamp = new Date('2024-12-03T10:30:00').getTime();
    const result = dateTimeFormat(timestamp, DEFAULT_DATE_FORMAT);
    expect(result).toBe('03/12/2024');
  });

  it('should format Dayjs object', () => {
    const date = dayjs('2024-12-03');
    const result = dateTimeFormat(date, DEFAULT_DATE_FORMAT);
    expect(result).toBe('03/12/2024');
  });

  it('should use default format when not specified', () => {
    const date = new Date('2024-12-03T10:30:00');
    const result = dateTimeFormat(date);
    expect(result).toContain('December');
    expect(result).toContain('2024');
  });

  it('should handle various format patterns', () => {
    const date = '2024-12-03T10:30:00';
    expect(dateTimeFormat(date, 'YYYY-MM-DD')).toBe('2024-12-03');
    expect(dateTimeFormat(date, 'DD/MM/YYYY')).toBe('03/12/2024');
    expect(dateTimeFormat(date, 'HH:mm:ss')).toBe('10:30:00');
  });
});

describe('Utils - isDifferentDay', () => {
  it('should return true for different days', () => {
    expect(isDifferentDay('2024-12-03', '2024-12-04')).toBe(true);
    expect(isDifferentDay('2024-12-01', '2024-12-31')).toBe(true);
  });

  it('should return false for same day', () => {
    expect(isDifferentDay('2024-12-03', '2024-12-03')).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isDifferentDay('', '')).toBe(false);
    expect(isDifferentDay('2024-12-03', '')).toBe(false);
    expect(isDifferentDay('', '2024-12-03')).toBe(false);
  });

  it('should handle null/undefined inputs', () => {
    expect(isDifferentDay(null as any, null as any)).toBe(false);
    expect(isDifferentDay(undefined as any, undefined as any)).toBe(false);
  });
});

describe('Utils - isSameDay', () => {
  it('should return true for same day', () => {
    expect(isSameDay('2024-12-03', '2024-12-03')).toBe(true);
  });

  it('should return false for different days', () => {
    expect(isSameDay('2024-12-03', '2024-12-04')).toBe(false);
    expect(isSameDay('2024-12-01', '2024-12-31')).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isSameDay('', '')).toBe(false);
    expect(isSameDay('2024-12-03', '')).toBe(false);
    expect(isSameDay('', '2024-12-03')).toBe(false);
  });

  it('should handle null/undefined inputs', () => {
    expect(isSameDay(null as any, null as any)).toBe(false);
    expect(isSameDay(undefined as any, undefined as any)).toBe(false);
  });
});

describe('Utils - convertTime', () => {
  it('should convert milliseconds to time components', () => {
    const result = convertTime(90061000); // 1 day, 1 hour, 1 minute, 1 second
    expect(result.days).toBe('01');
    expect(result.hours).toBe('01');
    expect(result.minutes).toBe('01');
    expect(result.seconds).toBe('01');
  });

  it('should handle zero milliseconds', () => {
    const result = convertTime(0);
    expect(result.days).toBe('00');
    expect(result.hours).toBe('00');
    expect(result.minutes).toBe('00');
    expect(result.seconds).toBe('00');
  });

  it('should handle negative values as zero', () => {
    const result = convertTime(-1000);
    expect(result.days).toBe('00');
    expect(result.hours).toBe('00');
    expect(result.minutes).toBe('00');
    expect(result.seconds).toBe('00');
  });

  it('should pad single digits with zero', () => {
    const result = convertTime(5000); // 5 seconds
    expect(result.seconds).toBe('05');
    expect(result.minutes).toBe('00');
  });

  it('should handle large values', () => {
    const result = convertTime(86400000 * 10); // 10 days
    expect(result.days).toBe('10');
    expect(result.hours).toBe('00');
    expect(result.minutes).toBe('00');
    expect(result.seconds).toBe('00');
  });

  it('should handle hours overflow correctly', () => {
    const result = convertTime(3661000); // 1 hour, 1 minute, 1 second
    expect(result.days).toBe('00');
    expect(result.hours).toBe('01');
    expect(result.minutes).toBe('01');
    expect(result.seconds).toBe('01');
  });
});

describe('Utils - cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', undefined, 'baz')).toBe('foo baz');
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should merge Tailwind classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('should handle objects', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, 'bar', null)).toBe('foo bar');
  });

  it('should merge complex Tailwind utilities', () => {
    expect(cn('bg-red-500 text-white', 'bg-blue-500')).toBe(
      'text-white bg-blue-500'
    );
  });
});
