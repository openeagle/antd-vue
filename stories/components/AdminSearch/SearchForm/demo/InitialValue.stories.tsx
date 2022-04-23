import { AdminSearch } from '@/index';
import withVueApp from '@stories/internals/withVueApp';
import moment from 'moment';
import { Card } from 'ant-design-vue';
import mdx from '../SearchForm.mdx';



 const InitialValue2: any = (args: any) =>
  withVueApp({
    setup() {
      const form = AdminSearch.useForm([
        {
          type: 'text',
          name: 'text',
          label: 'text',
          initialValue: 'text',
        },
        {
          type: 'number',
          name: 'number',
          label: 'number',
          initialValue: 1,
        },
        {
          type: 'year',
          name: 'year',
          label: 'year',
          initialValue: () => moment(),
        },
        {
          type: 'month',
          name: 'month',
          label: 'month',
          initialValue: () => moment(),
        },
        {
          type: 'week',
          name: 'week',
          label: 'week',
          initialValue: () => moment(),
        },
        {
          type: 'date',
          name: 'date',
          label: 'date',
          initialValue: () => moment(),
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'dateRange',
          name: 'dateRange',
          label: 'dateRange',
          initialValue: () => [moment(), moment()],
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'dateTime',
          name: 'dateTime',
          label: 'dateTime',
          initialValue: () => moment(),
        },
        {
          type: 'dateTimeRange',
          name: 'dateTimeRange',
          label: 'dateTimeRange',
          initialValue: () => [moment(), moment()],
          controlProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          type: 'time',
          name: 'time',
          label: 'time',
          initialValue: () => moment(),
        },
        {
          type: 'select',
          name: 'select',
          label: 'select',
          initialValue: 'beijing',
          controlProps: {
            placeholder: 'please select your zone',
            options: [
              {
                label: 'Zone one',
                value: 'shanghai',
              },
              {
                label: 'Zone two',
                value: 'beijing',
              },
            ],
          },
        },
      ]);
      return () => {
        return (
          <AdminSearch>
            <Card>{JSON.stringify(form.state)}</Card>
            <AdminSearch.SearchForm layout="inline" form={form} />
          </AdminSearch>
        );
      };
    },
  });

  // InitialValue2.storyName = '初始化值';
  export default {
    title: 'InitialValue2',
    component: InitialValue2
  };