import { CSSProperties, Ref, VNode, DefineComponent } from 'vue';

import { ColProps } from 'ant-design-vue/es/grid/Col';
import { ValidateOptions } from 'ant-design-vue/es/form/interface';
import { ValidationRule } from 'ant-design-vue/es/form/Form';

export type SearchParamType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'object'
  | 'array'
  | 'date';

export type SearchParamValueType =
  | number
  | string
  | boolean
  | (() => object)
  | (() => any[])
  | Date;

export interface SearchParam {
  name: string;
  type?: SearchParamType;
  initialValue?: SearchParamValueType;
  serialization?: {
    parse: (str?: string) => SearchParamValueType | undefined;
    stringify: (value?: SearchParamValueType) => string | undefined;
  };
}

export type SearchFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'dateRange'
  | 'dateTime'
  | 'dateTimeRange'
  | 'time'
  | 'select';

export interface SearchFieldProps {
  [key: string]: any;
}
export interface SearchFieldControlProps {
  [key: string]: any;
}

interface CommonFieldsControlProps {
  style?: any;
  [key: string]: any;
}

/**
 * type 为 text 对应  controlProps 的值
 */
interface TextFieldsControlProps extends CommonFieldsControlProps {
  prefixCls?: string;
  inputPrefixCls?: string;
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string | number;
  name?: string;
  size?: string;
  disabled?: boolean;
  readonly?: boolean;
  addonBefore?: VNode;
  addonAfter?: VNode;
  prefix?: VNode;
  suffix?: VNode;
  autofocus?: boolean;
  allowClear?: boolean;
  lazy?: boolean;
  maxlength?: number;
  loading?: boolean;
  onPressEnter?: (value?: any) => void;
  onKeydown?: (value?: any) => void;
  onKeyup?: (value?: any) => void;
  onFocus?: (value?: any) => void;
  onBlur?: (value?: any) => void;
  onChange?: (value?: any) => void;
  onInput?: (value?: any) => void;
  'onUpdate:value'?: (value?: any) => void;
}
interface InputNumberFieldsControlProps extends CommonFieldsControlProps {
  autofocus?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: string | number;
  precision?: number;
  decimalSeparator?: string;
  size?: string;
  formatter?: (value: number | string) => string;
  parser?: (value: string) => number;
}

interface DatePickerFieldsControlProps extends CommonFieldsControlProps {
  allowClear?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  dateRender?: any;
  disabledDate?: any;
  getCalendarContainer?: (trigger: any) => void;
  locale?: any;
  mode?: 'time' | 'date' | 'month' | 'year' | 'decade';
  open?: boolean;
  placeholder?: string;
  popupStyle?: CSSProperties;
  dropdownClassName?: string;
  size?: string;
  suffixIcon?: VNode;
  inputReadOnly?: boolean;
  align?: any;
  valueFormat?: string;
  openChange?: (status: any) => void;
  panelChange?: (value: any, mode: any) => void;
  disabledTime?: string;
  format?: string | string[];
  showTime?: any;
  showToday?: boolean;
  change?: (value: any) => void;
  ok?: (value: any) => void;
  defaultPickerValue?: string;
  monthCellContentRender?: any;
  renderExtraFooter?: any;
  ranges?: any;
  [key: string]: any;
}

interface SelectFieldsControlProps extends CommonFieldsControlProps {
  allowClear?: boolean;
  autoClearSearchValue?: boolean;
  autofocus?: boolean;
  bordered?: boolean;
  defaultActiveFirstOption?: boolean;
  disabled?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean;
  dropdownRender?: any;
  dropdownStyle?: Object;
  dropdownMenuStyle?: Object;
  filterOption?: boolean | ((inputValue: any, option: any) => void);
  firstActiveValue?: string | string[];
  getPopupContainer?: (triggerNode: any) => any;
  labelInValue?: boolean;
  maxTagCount?: number;
  maxTagPlaceholder?: any;
  maxTagTextLength?: number;
  mode?: 'multiple' | 'tags' | 'combobox';
  notFoundContent?: any;
  optionFilterProp?: string;
  optionLabelProp?: string;
  placeholder?: any;
  showSearch?: boolean;
  showArrow?: boolean;
  size?: string;
  suffixIcon?: any;
  removeIcon?: any;
  clearIcon?: any;
  menuItemSelectedIcon?: any;
  tokenSeparators?: string[];
  options?: any;
  defaultOpen?: boolean;
  open?: boolean;
}

interface CommonFieldsProps {
  // type: SearchFieldType | ((context: SearchFormInstance) => VNode);
  // type: any;
  name: string;
  label?: string;
  colon?: boolean;
  initialValue?: boolean | number | string | (() => any);
  valuePropName?: string;
  valueChangePropName?: string;
  column?: string | number | ColProps;
  labelAlign?: 'left' | 'right';
  labelWidth?: number | 'auto';
  extra?: string;
  hasFeedback?: boolean;
  required?: boolean;
  rules?: ValidationRule[];
  validateFirst?: boolean;
  validateTrigger?: string | string;
  fieldProps?:
    | SearchFieldProps
    | ((context: SearchFormInstance) => SearchFieldProps);
  controlProps?:
    | SearchFieldControlProps
    | ((context: SearchFormInstance) => SearchFieldControlProps);
  serialization?:
    | 'string'
    | 'number'
    | 'time'
    | 'timeRange'
    | 'object'
    | 'array'
    | SearchFieldSerialization;
}

interface TextFieldsProps extends CommonFieldsProps {
  type: 'text' | 'textarea';
  controlProps?:
    | TextFieldsControlProps
    | ((context: SearchFormInstance) => TextFieldsControlProps);
}

interface InputNumberFieldsProps extends CommonFieldsProps {
  type: 'number';
  controlProps?:
    | InputNumberFieldsControlProps
    | ((context: SearchFormInstance) => InputNumberFieldsControlProps);
}
interface CustomFieldPros extends CommonFieldsProps {
  type: DefineComponent<any, any, any, any, any, any, any, any, any, {}, any>;
  controlProps?: {
    [key: string]: any;
  };
}
interface InstanceFieldPros extends CommonFieldsProps {
  type: (context: SearchFormInstance) => VNode;
  controlProps?: {
    [key: string]: any;
  };
}

interface DatePickerFieldsProps extends CommonFieldsProps {
  type:
    | 'year'
    | 'month'
    | 'week'
    | 'date'
    | 'dateRange'
    | 'dateTime'
    | 'dateTimeRange'
    | 'time';
  controlProps?:
    | DatePickerFieldsControlProps
    | ((context: SearchFormInstance) => DatePickerFieldsControlProps);
}

interface SelectFieldsProps extends CommonFieldsProps {
  type: 'select';
  controlProps?:
    | SelectFieldsControlProps
    | ((context: SearchFormInstance) => SelectFieldsControlProps);
}

export interface SearchFieldSerialization {
  parse: (str?: string) => any;
  stringify: (value?: any) => string | undefined;
}

/**
 * 搜索字段
 */

export type SearchField =
  | TextFieldsProps
  | InputNumberFieldsProps
  | DatePickerFieldsProps
  | SelectFieldsProps
  | InstanceFieldPros
  | CustomFieldPros;

/**
 * 搜索表单规则
 */
export interface SearchFormRule {
  [key: string]: ValidationRule[];
}

/**
 * 搜索表单动作
 */
export interface SearchFormAction {
  type?: 'default' | 'primary' | 'link';
  icon?: VNode;
  text: string;
  onClick(search: SearchFormInstance): void;
}

export interface SearchFormInstance<T = any> {
  readonly ref: Ref<any>;
  readonly name: string;
  readonly fields: SearchField[];
  readonly state: T;
  readonly searchState?: T;
  readonly rules: {
    [key: string]: ValidationRule[];
  };
  readonly initiate: () => void;
  readonly submit: () => void;
  readonly reset: () => void;
  readonly validate: (
    nameList?: string[],
    options?: ValidateOptions,
  ) => Promise<{
    values: Partial<T>;
    errorFields: {
      name: string;
      errors: Error[];
    }[];
  }>;
  readonly onInitiate: (callback: (form: SearchFormInstance) => void) => void;
  readonly onSubmit: (callback: (form: SearchFormInstance) => void) => void;
  readonly onReset: (callback: (form: SearchFormInstance) => void) => void;
}

/**
 * 搜索表单上下文
 */
export interface SearchContextProps {
  /**
   * 布局类型，pure 表示无样式显示，card 表示会将表单和表格放置在卡片组件内
   */
  pure: boolean;
  form: {
    [key: string]: SearchFormInstance;
  };
}

export type SearchTableSortDirection = 'ascend' | 'descend' | false;

export type SearchTableColumnType =
  | 'text'
  | 'integer'
  | 'decimal'
  | 'money'
  | 'percent'
  | 'url'
  | 'action'
  | 'index'
  | 'indexDesc';

export interface SearchTableColumn<T = any> {
  key: string;
  type?: SearchTableColumnType;
  title: string | VNode;
  tooltip?: string;
  align?: 'left' | 'right' | 'center';
  ellipsis?: boolean;
  fixed?: boolean | 'left' | 'right';
  render?: (props: SearchTableRenderProps) => VNode | VNode[] | string | number;
  renderProps?: {
    [key: string]: any;
  };
  sorter?: boolean;
  resizable?: boolean;
  defaultSortOrder?: 'ascend' | 'descend' | false;
  sortDirections?: SearchTableSortDirection[];
  placeholder?: string;
  width?: number;
  visible?: boolean | (() => boolean);
}
export interface SearchTableRenderProps<T = any> {
  text: any;
  record: T;
  index: number;
  column: SearchTableColumn;
}

export interface SearchTableOption<T = any> {
  name?: string;
  form?: false | SearchFormInstance | SearchFormInstance[];

  /**
   * params 必须是响应式的对象才能监听参数变化
   */
  params?: any;
  /**
   * 开启表示 表格的搜索条件实时跟着表格的字段值变化,默认关闭。
   */
  syncSearch?: boolean;
  /**
   * 开启表示表格表单位的搜索条件会同步到地址栏上，默读开启。
   */
  restoration?: boolean;
  /**
   * 是否手动请求
   *
   * TODO: 需要在内部增加状态为标记是否请求过。
   */
  manualRequest?: boolean;
  pagination?:
    | boolean
    | {
        current: number;
        pageSize: number;
      };
  request: (option: {
    params?: { [key: string]: any };
    form?: { [key: string]: any };
    pagination?: {
      pageSize: number;
      current: number;
    };
    sorter?: { key: string; order: 'ascend' | 'descend' | false };
  }) => Promise<{ data: T[]; total: number }>;
  columns: SearchTableColumn<T>[];
  selection?: boolean | any[];
}

export interface SearchTableQuery {
  sorter?: SearchTableInstance['state']['sorter'];
  current?: SearchTableInstance['state']['current'];
  pageSize?: SearchTableInstance['state']['pageSize'];
}

export interface SearchTableInstance<T = any> {
  readonly columns: SearchTableColumn[];
  readonly state: {
    /**
     * 表格数据列表
     */
    data: T[];
    /**
     * 是否加载中
     */
    loading: boolean;
    /**
     * 选中的行
     */
    selected?: any[];
    /**
     * 排序状态
     */
    sorter?: {
      key: string;
      order: false | 'ascend' | 'descend';
    };
    /**
     * 当前分页
     */
    current: number;
    /**
     * 分页大小
     */
    pageSize: number;
    /**
     * 总记录数
     */
    total: number;
  };
  readonly load: () => void;
  readonly change: (params: SearchTableQuery) => void;
}
