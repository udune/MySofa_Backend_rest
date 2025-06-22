import dayjs from 'dayjs';

export function getToday(): string {
  return dayjs().format('YYYY-MM-DD');
}
