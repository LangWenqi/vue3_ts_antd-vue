import moment from 'moment'

/**
 * 格式化时间
 * @param time
 * @param format 格式 YYYY-MM-DD HH:mm:ss
 */
export function formatTime(time: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
  if (time) {
    return moment(time).format(format)
  } else {
    return '';
  }
}
