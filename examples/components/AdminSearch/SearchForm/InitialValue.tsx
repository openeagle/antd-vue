import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import { Card } from 'ant-design-vue';
import { AdminSearch } from '@/index';

const { SearchForm } = AdminSearch;

export default defineComponent({
  setup() {
    const form = SearchForm.useForm([
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
        controlProps: {
          step: '',
        },
      },
      {
        type: 'year',
        name: 'year',
        label: 'year',
        initialValue: () => dayjs(),
      },
      {
        type: 'month',
        name: 'month',
        label: 'month',
        initialValue: () => dayjs(),
      },
      {
        type: 'week',
        name: 'week',
        label: 'week',
        initialValue: () => dayjs(),
      },
      {
        type: 'date',
        name: 'date',
        label: 'date',
        initialValue: () => dayjs(),
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
        initialValue: () => [dayjs(), dayjs()],
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
        initialValue: () => dayjs(),
      },
      {
        type: 'dateTimeRange',
        name: 'dateTimeRange',
        label: 'dateTimeRange',
        initialValue: () => [dayjs(), dayjs()],
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
        initialValue: () => dayjs(),
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
