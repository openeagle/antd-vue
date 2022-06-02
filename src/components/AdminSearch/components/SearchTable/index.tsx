import { PropType, defineComponent, computed, VNode } from 'vue';
import { Card, Space, Table } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
import { tableProps, TablePaginationConfig } from 'ant-design-vue/es/table/Table';
import { TransformCellTextProps, Key } from 'ant-design-vue/es/table/interface';
import {
  SearchTableColumn,
  SearchTableInstance,
  SearchTableSortDirection,
  SearchTableRenderProps,
  SearchTableColumnType,
  SearchTableQuery,
} from '../../typings';
import NumberText from '../../../NumberText';
import { useSearchContext } from '../../SearchContext';
import useTable from '../../utils/useTable';

// 兼容 v3
const defaultTableProps = tableProps()

const SearchTable = defineComponent({
  name: 'OpeneagleAdminSearchTable',
  inheritAttrs: false,
  props: {
    ...defaultTableProps,
    rowKey: {
      ...defaultTableProps.rowKey,
      default: 'id',
    },
    sortDirections: {
      type: Array as PropType<SearchTableSortDirection[]>,
      default: [false, 'ascend', 'descend'],
    },
    table: {
      type: Object as PropType<SearchTableInstance>,
      required: true,
    },
    toolbar: Object as PropType<{
      class?: string;
      title?: string | VNode;
      actions?: VNode[];
      selectActions?: VNode[];
      menu?: {
        type: 'dropdown' | 'tab';
        activeKey: string;
        items: { key: string; label: VNode }[];
        onChange: (activeKey: string) => void;
      };
    }>,
    pure: Boolean,
    placeholder: {
      type: String,
      default: '--',
    }
  },
  setup(props, { attrs, slots }) {
    const context = useSearchContext();
    const sortDirections = computed(() => {
      return props.sortDirections.filter((item) => !!item) as (
        | 'ascend'
        | 'descend'
      )[];
    });

    const renderColumn = (data: SearchTableRenderProps, vnode: any) => {
      if (data.text === undefined || data.text === null || data.text === '') {
        if (data.column.placeholder !== undefined) {
          return data.column.placeholder;
        } else {
          return props.placeholder;
        }
      } else {
        return vnode;
      }
    };

    const columns = computed(() => {
      const {
        table: { columns, state },
      } = props;
      const curColumns = columns.filter((column) => {
        if (column.visible === undefined) {
          return true;
        } else {
          if (typeof column.visible === 'boolean') {
            return column.visible;
          } else if (typeof column.visible === 'function') {
            return column.visible();
          }
        }
      });
      return curColumns.map((column) => {
        const columnRenders: {
          [key in SearchTableColumnType]: SearchTableColumn['render'];
        } = {
          integer: (data) => {
            return renderColumn(
              data,
              <NumberText
                type="integer"
                value={data.text}
                {...column.renderProps}
              />,
            );
          },
          decimal: (data) => {
            return renderColumn(
              data,
              <NumberText
                type="decimal"
                value={data.text}
                {...column.renderProps}
              />,
            );
          },
          money: (data) => {
            return renderColumn(
              data,
              <NumberText
                type="money"
                value={data.text}
                {...column.renderProps}
              />,
            );
          },
          percent: (data) => {
            return renderColumn(
              data,
              <NumberText
                type="percent"
                value={data.text}
                {...column.renderProps}
              />,
            );
          },
          url: (data) => {
            return renderColumn(
              data,
              <a href={data.text} target="_blank" {...column.renderProps}>
                {data.text}
              </a>,
            );
          },
          action: (data) => {
            return (
              <Space {...column.renderProps}>{column.render?.(data)}</Space>
            ) as VNode;
          },
          index: ({ index }) => {
            return index + 1;
          },
          indexDesc: ({ index }) => {
            return state.total - (state.current - 1) * 10 - index;
          },
          text: (data) => {
            return renderColumn(data, data.text);
          },
        };

        const render = (data: TransformCellTextProps) => {
          const renderData: SearchTableRenderProps = {
            ...data,
            column: column,
          };
          if (column.render) {
            if (column.type === 'action') {
              return columnRenders['action']?.(renderData);
            } else {
              return column.render(renderData);
            }
          } else {
            // 没有render才加默认type为text
            const columnType = column.type || 'text';
            // render = renderObj[columnType] || renderObj['text'];
            return (columnRenders[columnType] || columnRenders['text'])?.(
              renderData,
            );
          }
        };

        return {
          align: column.align,
          ellipsis: column.ellipsis,
          dataIndex: column.key,
          fixed: column.fixed,
          key: column.key,
          customRender: render,
          sorter: column.sorter,
          placeholder: column.placeholder,
          sortOrder:
            column.sorter && state.sorter && state.sorter.key === column.key
              ? state.sorter.order
              : false,
          sortDirections: (column.sortDirections
            ? column.sortDirections.filter((item) => !!item)
            : sortDirections.value
          ).filter((item) => !!item),
          title: column.title,
          width: column.width || 150,
        };
      });
    });
    const scroll = computed<TableProps['scroll']>(() => {
      if (props.tableLayout === 'auto') {
        return undefined;
      }
      return {
        x:
          columns.value.reduce((rcc, column) => {
            return rcc + (column?.width || 150);
          }, 0) || true,
      };
    });
    const pagination = computed(() => {
      if (props.pagination && props.table.state.pageSize > 0) {
        return {
          ...(typeof props.pagination === 'object' ? props.pagination : {}),
          current: props.table.state.current,
          pageSize: props.table.state.pageSize,
          total: +props.table.state.total,
        };
      }
      return false;
    });
    const handleChange = (
      pagination: {
        current: number;
        pageSize: number;
      },
      filters: {
        [key: string]: any;
      },
      sorter: {
        column?: SearchTableColumn;
        columnKey?: string;
        field?: any,
        order?: 'ascend' | 'descend' | false;
      }
    ) => {
      const {
        table: { state },
      } = props;
      const tableQuery: SearchTableQuery = {};
      const sorterChanged =
        state.sorter?.key !== sorter?.columnKey ||
        state.sorter?.order !== sorter?.order;
      if (state.pageSize !== pagination.pageSize || sorterChanged) {
        tableQuery.current = 1;
      } else {
        tableQuery.current = pagination.current;
      }
      if (sorterChanged) {
        /**
         * 空：{field: "xxx", columnKey: "xxx"}
         * 升序：{column: {…}, order: "ascend", field: "xxx", columnKey: "xxx"}
         * 降序：{column: {…}, order: "descend", field: "xxx", columnKey: "xxx"}
         */
        if (sorter?.columnKey) {
          const sortColumnProps = props.table.columns.find(
            (item) => item.key === sorter?.columnKey,
          );
          const sortColumn = columns.value.find(
            (item) => item.key === sorter?.columnKey,
          );
          if (sortColumnProps && sortColumn) {
            /**
             * 这里需要判断新的排序值是否在字段配置的 sortColumnDirections 中。
             *
             * ps：正常来说，配置了 sortColumnDirections，table 会按支持的排序方式切换，但是 antd table 目前不支持禁用默认排序，所以这里需要特殊处理。
             */
            let newSorterOrder = sorter.order || false;
            const lastSortOrder = sortColumn.sortOrder;
            const sortColumnDirections =
              sortColumnProps.sortDirections || props.sortDirections;
            const newSortOrderIndex = sortColumnDirections.indexOf(
              newSorterOrder,
            );
            if (newSortOrderIndex < 0) {
              const lastOrderIndex = sortColumnDirections.indexOf(
                lastSortOrder,
              );
              newSorterOrder =
                sortColumnDirections[
                (lastOrderIndex + 1) % sortColumnDirections.length
                ];
            }
            tableQuery.sorter = sorter?.columnKey
              ? {
                key: sorter.columnKey,
                order: newSorterOrder,
              }
              : undefined;
          } else {
            tableQuery.sorter = undefined;
          }
        } else {
          tableQuery.sorter = undefined;
        }
      }
      tableQuery.pageSize = pagination.pageSize;
      props.table.change(tableQuery);
    };

    const handleSelectChange = (selectedRowKeys: any[]) => {
      props.table.state.selected = selectedRowKeys;
    };

    return () => {
      const { table, toolbar, ...tableProps } = props;
      let toolbarContent = null;
      const baseClass = 'openeagle-ant-search-table';
      if (toolbar) {
        const { title, actions, selectActions, menu } = toolbar;
        const titleContent =
          (title && <div class={`${baseClass}-toolbar-title`}>{title}</div>) ||
          (menu && null);
        const actionsContent = actions ? <Space>{actions}</Space> : null;
        const selectActionsContent = selectActions ? (
          <Space>{selectActions}</Space>
        ) : null;
        toolbarContent = (
          <div class={[`${baseClass}-toolbar`, toolbar.class]}>
            {titleContent ? (
              <div class={`${baseClass}-toolbar-container`}>
                <div class={`${baseClass}-toolbar-left`}>{titleContent}</div>
                <div class={`${baseClass}-toolbar-right`}>{actionsContent}</div>
              </div>
            ) : null}
            {selectActionsContent ? (
              <div class={`${baseClass}-toolbar-container`}>
                <div class={`${baseClass}-toolbar-left`}>
                  {selectActionsContent}
                </div>
                <div class={`${baseClass}-toolbar-right`}>
                  {!titleContent ? actionsContent : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      }

      const tableContent = (
        <>
          {toolbarContent}
          <Table
            {...attrs}
            {...tableProps}
            sortDirections={sortDirections.value}
            class={[baseClass, attrs.class]}
            columns={columns.value as any}
            dataSource={table.state.data}
            loading={table.state.loading}
            pagination={pagination.value}
            rowKey={props.rowKey || 'id'}
            v-slots={{
              emptyText: slots.emptyText,
              expandIcon: slots.expandIcon,
              title: slots.title,
              footer: slots.footer,
              summary: slots.summary,
              bodyCell: slots.bodyCell,
              headerCell: slots.headerCell,
              customFilterIcon: slots.customFilterIcon,
              customFilterDropdown: slots.customFilterIcon,
            }}
            rowSelection={
              table.state.selected
                ? {
                  selectedRowKeys: table.state.selected,
                  onChange: handleSelectChange,
                }
                : undefined
            }
            scroll={scroll.value}
            tableLayout={scroll.value?.x ? 'fixed' : tableProps.tableLayout}
            onChange={handleChange as any}
          />
        </>
      );
      if (
        props.pure === true ||
        (props.pure !== false && context?.pure === true)
      ) {
        return tableContent;
      }
      return (
        <Card
          bodyStyle={{
            paddingTop: toolbarContent ? 0 : '24px',
            paddingBottom: pagination.value ? 0 : '24px',
          }}
        >
          {tableContent}
        </Card>
      );
    };
  },
});

SearchTable.useTable = useTable;

export default SearchTable as typeof SearchTable & {
  readonly useTable: typeof useTable;
};
