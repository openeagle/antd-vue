import Mock from 'mockjs';
import { Moment } from 'moment';
import { VNode, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Card, Checkbox, Space } from 'ant-design-vue';
import { AdminSearch } from '@/index';

const { SearchForm, SearchTable } = AdminSearch;

interface TableSearchState {
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

interface TableListItem {
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

export default defineComponent({
  setup() {
    const router = useRouter();
    const params = AdminSearch.useParams<{
      pure: boolean;
    }>([
      {
        name: 'pure',
        type: 'boolean',
        initialValue: false,
      },
    ]);
    const form = SearchForm.useForm<TableSearchState>([
      {
        type: 'text',
        name: 'text',
        label: 'text',
        controlProps: {},
      },
      {
        type: 'number',
        name: 'number',
        label: 'number',
        controlProps: {
          step: '11',
        },
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
          allowClear: true,
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
    const showSex = ref(true);
    setTimeout(() => {
      showSex.value = false;
    }, 2500);

    const table = SearchTable.useTable<TableListItem>({
      name: 'table',
      params,
      form,
      request({ params, form, pagination, sorter }) {
        console.log(
          1,
          JSON.stringify(params),
          JSON.stringify(form),
          pagination,
          sorter,
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              Mock.mock({
                total: 98,
                [`data|${(pagination && pagination.pageSize) || 10}`]: [
                  {
                    'id|+1': pagination?.current
                      ? (pagination.current - 1) * pagination.pageSize + 1
                      : 1,
                    name: '@cname',
                    sex: '???',
                    'age|1-100': 1,
                    'consumption|1-10000': 0,
                    email: '@email',
                    address: '@ctitle',
                    contry: '@ctitle',
                    province: '@ctitle',
                    city: '@ctitle',
                    school: '@ctitle',
                  },
                ],
              }),
            );
          }, 1000);
        });
      },
      columns: [
        {
          key: 'index',
          title: '??????',
          width: 100,
          type: 'index',
          fixed: 'left',
        },
        {
          key: 'indexDesc',
          title: '??????(??????)',
          width: 100,
          type: 'indexDesc',
          fixed: 'left',
        },
        {
          key: 'id',
          title: 'ID',
          width: 100,
          fixed: 'left',
          render() {
            return 'render';
          },
        },
        {
          key: 'name',
          title: '??????',
          sorter: true,
          sortDirections: ['ascend', 'descend'],
        },
        {
          key: 'sex',
          title: '??????(???????????????)',
          visible: () => {
            return showSex.value;
          },
        },
        {
          key: 'age',
          title: '??????',
          sorter: true,
          defaultSortOrder: 'ascend',
        },
        {
          key: 'consumption',
          type: 'money',
          title: '??????',
        },
        {
          key: 'email',
          title: '??????',
          width: 300,
        },
        {
          key: 'address',
          title: '??????',
        },
        {
          key: 'contry',
          title: '??????',
        },
        {
          key: 'province',
          title: '??????',
        },
        {
          key: 'city',
          title: '??????',
        },
        {
          key: 'school',
          title: '??????',
          width: 150,
        },
        {
          key: 'action',
          title: '??????',
          fixed: 'right',
          width: 150,
          type: 'action',
          render: ({ record }) => {
            return [
              <a
                key="link"
                onClick={() => {
                  console.log(`edit record: ${record.id}`);
                }}
              >
                ??????
              </a>,
              <a key="link2">??????</a>,
              <a
                key="link3"
                onClick={() => {
                  router.push({
                    path: '/components/image-uploader',
                    query: {
                      text: 33,
                    },
                    state: {
                      newTab: true,
                    },
                  });
                }}
              >
                realworld text77
              </a>,
            ] as VNode[];
          },
        },
      ],
      selection: true,
    });
    const table2 = SearchTable.useTable<TableListItem>({
      name: 'table2',
      params,
      form,
      request({ params, form, pagination, sorter }) {
        console.log(
          2,
          JSON.stringify(params),
          JSON.stringify(form),
          pagination,
          sorter,
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              Mock.mock({
                total: 100,
                [`data|${(pagination && pagination.pageSize) || 10}`]: [
                  {
                    'id|+1': pagination?.current
                      ? (pagination.current - 1) * pagination.pageSize + 1
                      : 1,
                    name: '@cname',
                    sex: '???',
                    'age|1-100': 1,
                    email: '@email',
                    address: '@ctitle',
                    contry: '@ctitle',
                    province: '@ctitle',
                    city: '@ctitle',
                    school: '@ctitle',
                  },
                ],
              }),
            );
          }, 1000);
        });
      },
      columns: [
        {
          key: 'index',
          title: '??????',
          width: 100,
          type: 'index',
          fixed: 'left',
        },
        {
          key: 'id',
          title: 'ID',
          width: 100,
          fixed: 'left',
        },
        {
          key: 'name',
          title: '??????',
          sorter: true,
          sortDirections: ['ascend', 'descend'],
        },
        {
          key: 'sex',
          title: '??????(???????????????)',
          visible: () => {
            return showSex.value;
          },
        },
        {
          key: 'age',
          title: '??????',
          sorter: true,
          defaultSortOrder: 'ascend',
        },
        {
          key: 'email',
          title: '??????',
          width: 300,
        },
        {
          key: 'address',
          title: '??????',
        },
        {
          key: 'contry',
          title: '??????',
        },
        {
          key: 'province',
          title: '??????',
        },
        {
          key: 'city',
          title: '??????',
        },
        {
          key: 'school',
          title: '??????',
          width: 150,
        },
        {
          key: 'action',
          title: '??????',
          fixed: 'right',
          width: 150,
          type: 'action',
          render: ({ record }) => {
            return [
              <a
                key="link"
                onClick={() => {
                  console.log(`edit record: ${record.id}`);
                }}
              >
                ??????
              </a>,
              <a key="link2">??????</a>,
              <a
                key="link3"
                onClick={() => {
                  router.push({
                    path:
                      '/components/admin-search/search-table/realworld?text=33',
                    state: {
                      newTab: true,
                    },
                  });
                }}
              >
                realworld text
              </a>,
            ] as VNode[];
          },
        },
      ],
      selection: true,
    });
    return () => {
      const content = (
        <AdminSearch pure={params.pure}>
          <SearchForm layout="inline" form={form} />
          <SearchTable
            pagination={{
              pageSizeOptions: ['10', '20', '30', '40'],
              showSizeChanger: true,
            }}
            sortDirections={[false, 'descend', 'ascend']}
            table={table}
            toolbar={{
              title: '????????????',
              actions: [
                (
                  <Button
                    key="add"
                    type="primary"
                    onClick={() => {
                      alert('add');
                    }}
                  >
                    ??????
                  </Button>
                ) as VNode,
                (
                  <Button
                    key="import"
                    type="primary"
                    onClick={() => {
                      alert('import');
                    }}
                  >
                    ??????
                  </Button>
                ) as VNode,
              ],
              selectActions: [
                (
                  <Button
                    key="update"
                    type="primary"
                    onClick={() => {
                      alert('update');
                    }}
                  >
                    ????????????
                  </Button>
                ) as VNode,
                (
                  <Button
                    key="delete"
                    type="primary"
                    onClick={() => {
                      alert('delete');
                    }}
                  >
                    ????????????
                  </Button>
                ) as VNode,
              ],
            }}
          />
          <SearchTable
            pagination={{
              pageSizeOptions: ['10', '20', '30', '40'],
              showSizeChanger: true,
            }}
            sortDirections={[false, 'descend', 'ascend']}
            table={table2}
            toolbar={{
              title: '????????????',
              actions: [
                (
                  <Button
                    key="add"
                    type="primary"
                    onClick={() => {
                      alert('add');
                    }}
                  >
                    ??????
                  </Button>
                ) as VNode,
                (
                  <Button
                    key="import"
                    type="primary"
                    onClick={() => {
                      alert('import');
                    }}
                  >
                    ??????
                  </Button>
                ) as VNode,
              ],
              selectActions: [
                (
                  <Button
                    key="update"
                    type="primary"
                    onClick={() => {
                      alert('update');
                    }}
                  >
                    ????????????
                  </Button>
                ) as VNode,
                (
                  <Button
                    key="delete"
                    type="primary"
                    onClick={() => {
                      alert('delete');
                    }}
                  >
                    ????????????
                  </Button>
                ) as VNode,
              ],
            }}
          />
        </AdminSearch>
      );
      return (
        <div>
          <Card style={{ marginBottom: '16px' }}>
            <Space>
              <Checkbox v-model={[params.pure, 'checked']}>pure</Checkbox>
              <Button
                onClick={() => {
                  router.replace({
                    path: '/components/admin-search/search-table/realworld',
                    query: {
                      a: undefined,
                    },
                  });
                }}
              >
                ??????
              </Button>
            </Space>
          </Card>
          {params.pure ? (
            <Card bodyStyle={{ paddingBottom: 0 }}>{content}</Card>
          ) : (
            content
          )}
        </div>
      );
    };
  },
});
