import { Moment } from "moment";

export   interface TableSearchState {
  text: string;
  number: number;
  year: Moment;
  month: Moment;
  week: Moment;
  date: Moment;
  dateRange: Moment[];
  dateTime: Moment;
  dateTimeRange: Moment[];
  time: Moment;
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
