import Mock from 'mockjs';
import { VNode, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Checkbox, Card, Space } from 'ant-design-vue';
import { AdminSearch } from '@/index';
import '@/components/AdminSearch/style/index.less';
import withVueApp from '@stories/internals/withVueApp';
import mdx from './SearchTable.mdx';
import { TableListItem, TableSearchState } from './type';
import { formParams } from './formData';
import { TableList } from './mockData';

export default {
  title: '组件/AdminSearch/SearchTable',
  component: AdminSearch.SearchTable,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/**
 * 如何使用
 * @param args
 * @returns
 */
 export const HowToUseTable: any = (args: any, { argTypes }: any) => ({
  setup(props: any, { emit }: any) {
    return () => {
      return <div></div>;
    };
  },
});

HowToUseTable.parameters = {
  controls: {
    disabled: true,
  },
};
HowToUseTable.storyName = '如何使用';

/**
 * 基本用法
 * @param args
 * @returns
 */
export const BaseUseTable: any = (args: any) => {
  return withVueApp({
    setup() {
      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
        request({ params, form, pagination, sorter }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              // 数据获取
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'index',
            title: '序号',
            width: 100,
            type: 'index',
          },
          {
            key: 'id',
            title: 'ID',
            width: 100,
            render() {
              return 'render';
            },
          },
          {
            key: 'name',
            title: '名称',
          },
          {
            key: 'consumption',
            type: 'money',
            title: '金额',
          },
          {
            key: 'email',
            title: '邮箱',
            width: 300,
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: false,
      });
      return () => {
        return (
          <AdminSearch>
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              sortDirections={[false, 'descend', 'ascend']}
              table={table}
            />
          </AdminSearch>
        );
      };
    },
  });
};
BaseUseTable.storyName = '基本用法';

/**
 * 序号倒序
 * @param args
 * @returns
 */
export const DescSortTable: any = (args: any) => {
  return withVueApp({
    setup() {
      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
        request({ params, form, pagination, sorter }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              // 数据获取
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'indexDesc',
            title: '序号(降序)',
            width: 100,
            type: 'indexDesc',
          },
          {
            key: 'id',
            title: 'ID',
            width: 100,
            render() {
              return 'render';
            },
          },
          {
            key: 'name',
            title: '名称',
          },
          {
            key: 'consumption',
            type: 'money',
            title: '金额',
          },
          {
            key: 'email',
            title: '邮箱',
            width: 300,
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: false,
      });
      return () => {
        return (
          <AdminSearch>
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              sortDirections={[false, 'descend', 'ascend']}
              table={table}
            />
          </AdminSearch>
        );
      };
    },
  });
};
DescSortTable.storyName = '序号降序';

/**
 * 按字段排序
 * @param args
 * @returns
 */
export const SortByFieldTable: any = (args: any) => {
  return withVueApp({
    setup() {
      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
        request({ params, form, pagination, sorter }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'index',
            title: '序号',
            width: 100,
            type: 'index',
          },
          {
            key: 'id',
            title: 'ID',
            width: 100,
            render() {
              return 'render';
            },
          },
          {
            key: 'name',
            title: '名称',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
          },
          {
            key: 'age',
            title: '年龄',
            sorter: true,
            defaultSortOrder: 'ascend',
          },
          {
            key: 'consumption',
            type: 'money',
            title: '金额',
          },
          {
            key: 'email',
            title: '邮箱',
            width: 300,
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: false,
      });
      return () => {
        return (
          <AdminSearch>
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              table={table}
            />
          </AdminSearch>
        );
      };
    },
  });
};
SortByFieldTable.storyName = '按字段排序';
/**
 * 可选择
 * @param args
 * @returns
 */
export const SelectedTable: any = (args: any) => {
  return withVueApp({
    setup() {
      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
        request({ params, form, pagination, sorter }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              // 数据获取
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'index',
            title: '序号',
            width: 100,
            type: 'index',
          },
          {
            key: 'id',
            title: 'ID',
            width: 100,
            render() {
              return 'render';
            },
          },
          {
            key: 'name',
            title: '名称',
          },
          {
            key: 'consumption',
            type: 'money',
            title: '金额',
          },
          {
            key: 'email',
            title: '邮箱',
            width: 300,
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: true,
      });

      return () => {
        return (
          <AdminSearch>
            <p>选中了 {table.state.selected?.length} 条数据</p>
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              sortDirections={[false, 'descend', 'ascend']}
              table={table}
            />
          </AdminSearch>
        );
      };
    },
  });
};
SelectedTable.storyName = '可选择';

/**
 * 隐藏列
 * @param args
 * @returns
 */
export const HideFieldTable: any = (args: any) => {
  return withVueApp({
    setup() {
      const show = ref(true);
      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
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
              // 数据获取
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'index',
            title: '序号',
            width: 100,
            type: 'index',
          },
          {
            key: 'id',
            title: 'ID',
            width: 100,
            render() {
              return 'render';
            },
          },
          {
            key: 'name',
            title: '名称',
            visible: () => {
              return show.value;
            },
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: false,
      });
      const onHide = () => {
        show.value = !show.value;
      };
      return () => {
        return (
          <AdminSearch>
            <Button
              type="primary"
              onClick={onHide}
              style={{ marginBottom: '20px' }}
            >
              {`点击${show.value ? '隐藏' : '显示'} 名称 列`}
            </Button>
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              sortDirections={[false, 'descend', 'ascend']}
              table={table}
            />
          </AdminSearch>
        );
      };
    },
  });
};
HideFieldTable.storyName = '隐藏列';
/**
 * 固定列
 * @param args
 * @returns
 */
export const FixedFieldTable: any = (args: any) => {
  return withVueApp({
    setup() {
      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
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
              // 数据获取
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'index',
            title: '序号',
            width: 100,
            type: 'index',
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
            title: '名称',
            fixed: 'left',
          },
          {
            key: 'age',
            title: '年龄',
            sorter: true,
            defaultSortOrder: 'ascend',
          },
          {
            key: 'email',
            title: '邮箱',
            width: 300,
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'contry',
            title: '国家',
          },
          {
            key: 'province',
            title: '省份',
          },
          {
            key: 'city',
            title: '城市',
          },
          {
            key: 'school',
            title: '学校',
            width: 150,
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: false,
      });

      return () => {
        return (
          <AdminSearch>
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              table={table}
            />
          </AdminSearch>
        );
      };
    },
  });
};
FixedFieldTable.storyName = '固定列';

/**
 * 结合 SearchForm 组件
 * @param args 
 * @returns 
 */
export const RealWorld: any = (args: any) => {
  return withVueApp({
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
      /** 表单 */
      const form = AdminSearch.SearchForm.useForm<TableSearchState>(
        formParams as any,
      );

      const table = AdminSearch.SearchTable.useTable<TableListItem>({
        name: 'table',
        request({ params, form, pagination, sorter }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              // 数据获取
              resolve(TableList(pagination));
            }, 1000);
          });
        },
        columns: [
          {
            key: 'index',
            title: '序号',
            width: 100,
            type: 'index',
          },
          {
            key: 'id',
            title: 'ID',
            width: 100,
            render() {
              return 'render';
            },
          },
          {
            key: 'name',
            title: '名称',
          },
          {
            key: 'consumption',
            type: 'money',
            title: '金额',
          },
          {
            key: 'email',
            title: '邮箱',
            width: 300,
          },
          {
            key: 'address',
            title: '地址',
          },
          {
            key: 'action',
            title: '操作',
            fixed: 'right',
            width: 100,
            type: 'action',
            render: ({ record }) => {
              return [
                <a
                  key="link"
                  onClick={() => {
                    console.log(`edit record: ${record.id}`);
                  }}
                >
                  编辑
                </a>,
                <a key="link2">删除</a>,
              ] as VNode[];
            },
          },
        ],
        selection: false,
      });

      return () => {
        const content = (
          <AdminSearch pure={params.pure}>
            <AdminSearch.SearchForm layout="inline" form={form} />
            <AdminSearch.SearchTable
              pagination={{
                pageSize: 5,
                pageSizeOptions: ['5', '10', '20', '30', '40'],
                showSizeChanger: true,
              }}
              table={table}
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
                  重置
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
};

RealWorld.storyName = '结合 SearchForm 组件';


/**
 * API
 * @param args
 * @returns
 */
 export const API: any = (args: any, { argTypes }: any) => ({
  setup(props: any, { emit }: any) {
    return () => {
      return <div></div>;
    };
  },
});

API.parameters = {
  controls: {
    disabled: true,
  },
};
