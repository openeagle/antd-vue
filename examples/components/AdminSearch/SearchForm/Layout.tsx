import { defineComponent } from 'vue';
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
      },
      {
        type: 'number',
        name: 'number',
        label: 'number',
      },
      {
        type: 'year',
        name: 'year',
        label: 'year',
      },
      {
        type: 'month',
        name: 'month',
        label: 'month',
      },
      {
        type: 'week',
        name: 'week',
        label: 'week',
      },
      {
        type: 'date',
        name: 'date',
        label: 'date',
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
      },
      {
        type: 'dateTimeRange',
        name: 'dateTimeRange',
        label: 'dateTimeRange',
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
      },
      {
        type: 'select',
        name: 'select',
        label: 'select',
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
        <Card title="layout">
          {JSON.stringify(form.state)}
          <Card bordered={false} title="inline">
            <AdminSearch pure>
              <AdminSearch.SearchForm layout="inline" form={form} />
            </AdminSearch>
          </Card>
          <Card bordered={false} title="grid">
            <AdminSearch pure>
              <AdminSearch.SearchForm layout="grid" form={form} />
            </AdminSearch>
          </Card>
          <Card bordered={false} title="grid with label width">
            <AdminSearch pure>
              <AdminSearch.SearchForm
                layout="grid"
                form={form}
                labelWidth={110}
              />
            </AdminSearch>
          </Card>
          <Card bordered={false} title="inline action split">
            <AdminSearch pure>
              <AdminSearch.SearchForm
                layout="inline"
                form={form}
                actionSplit
              />
            </AdminSearch>
          </Card>
          <Card bordered={false} title="main actions">
            <AdminSearch pure>
              <AdminSearch.SearchForm
                layout="grid"
                form={form}
                actionSplit
                mainActions={[
                  {
                    text: '下载',
                    onClick: () => null,
                  },
                ]}
              />
            </AdminSearch>
          </Card>
          <Card bordered={false} title="extra actions">
            <AdminSearch pure>
              <AdminSearch.SearchForm
                layout="grid"
                form={form}
                actionSplit
                extraActions={[
                  {
                    text: '下载',
                    onClick: () => null,
                  },
                ]}
              />
            </AdminSearch>
          </Card>
        </Card>
      );
    };
  },
});
