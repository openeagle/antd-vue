import { Dayjs } from "dayjs";

export   interface TableSearchState {
  text: string;
  number: number;
  year: Dayjs;
  month: Dayjs;
  week: Dayjs;
  date: Dayjs;
  dateRange: Dayjs[];
  dateTime: Dayjs;
  dateTimeRange: Dayjs[];
  time: Dayjs;
  select: string;
}

export   interface TableListItem {
  id: number;
  name: string;
  sex: string;
  age: string;
  email: string;
  address: string;
  contry: string;
  province: string;
  city: string;
  school: string;
  action: string;
}
