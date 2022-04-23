const formatDate = (date: Date, fmt: string) => {
  let o: { [key: string]: any } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};

const createArr = (len: number) => {
  return Array.from(Array(len)).map((ret, id) => id);
};

const formatWeektime = (col: number) => {
  const timestamp = 1542384000000; // '2018-11-17 00:00:00'
  const beginstamp = timestamp + col * 1800000; // col * 30 * 60 * 1000
  const endstamp = beginstamp + 1800000;

  const begin = formatDate(new Date(beginstamp), 'hh:mm');
  let end = formatDate(new Date(endstamp), 'hh:mm');

  if (endstamp > beginstamp && end === '00:00') {
    end = '24:00';
  }
  return `${begin}~${end}`;
};

export interface WeekDataChild {
  week: string;
  value: string;
  begin: string;
  end: string;
  row: number;
  col: number;
  [key: string]: any;
}

export interface WeekData {
  value: string;
  row: number;
  child: WeekDataChild[];
}

export const splicing = (list: WeekDataChild[]) => {
  let same;
  let i = -1;
  let len = list.length;
  let arr = [];

  if (!len) return;
  while (++i < len) {
    const item = list[i];
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...['、', item.begin, '~', item.end]);
      } else if (arr.length) {
        arr.pop();
        arr.push(item.end);
      }
    }
    same = Boolean(item.check);
  }
  arr.shift();
  return arr.join('');
};

const data: WeekData[] = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
].map((ret: string, index) => {
  const children = (ret: string, row: number, max: number) => {
    return createArr(max).map((t, col) => {
      return {
        week: ret,
        value: formatWeektime(col),
        begin: formatWeektime(col).split('~')[0],
        end: formatWeektime(col).split('~')[1],
        row: row,
        col: col,
        check: false,
      };
    });
  };
  return {
    value: ret,
    row: index,
    child: children(ret, index, 48),
  };
});

export default data;
