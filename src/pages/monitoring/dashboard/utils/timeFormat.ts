import dayjs from 'dayjs';

export const formatTimeAxis = (time: string, timeRange: string) => {
  const date = dayjs(time);
  const now = dayjs();
  const diffMinutes = now.diff(date, 'minute');
  const diffHours = now.diff(date, 'hour');
  const diffDays = now.diff(date, 'day');

  if (timeRange.includes('min') || timeRange === '1h') {
    return date.format('HH:mm:ss');
  } else if (timeRange === '2h' || timeRange === '5h' || timeRange === '12h') {
    return date.format('HH:mm');
  } else if (timeRange === '1d') {
    if (diffHours < 24) {
      return `${diffHours}小时前`;
    }
    return date.format('HH:mm');
  } else {
    if (diffDays < 7) {
      return `${diffDays}天前`;
    }
    return date.format('MM-DD HH:mm');
  }
}; 