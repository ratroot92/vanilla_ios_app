import {format} from 'date-fns';
const dateUtils = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  getMonthNameByNumber: number => {
    return dateUtils.monthNames[number];
  },
  getDayName: date => {
    format(date, 'EEEE');
  },
};

export default dateUtils;
