import {
  PropType,
  computed,
  cloneVNode,
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
} from 'vue';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  TimePicker,
} from 'ant-design-vue';
import { ColProps } from 'ant-design-vue/es/grid/Col';
import {
  SearchField,
  SearchFormInstance,
  SearchFormAction,
} from '../../typings';
import { useSearchContext } from '../../SearchContext';
import useForm from '../../utils/useForm';

const FIELD_CONTROLS: {
  [key: string]: {
    control: any;
    controlProps?:
      | {
          [key: string]: any;
        }
      | ((
          field: SearchField,
          form: SearchFormInstance,
        ) => {
          [key: string]: any;
        });
    valuePropName?: string;
    valueChangePropName?: string;
  };
} = {
  text: {
    control: Input,
    controlProps: {
      type: 'text',
    },
  },
  textarea: {
    control: Input.TextArea,
  },
  number: {
    control: InputNumber,
  },
  year: {
    control: DatePicker,
    controlProps: {
      picker: 'year',
    }
  },
  month: {
    control: DatePicker,
    controlProps: {
      picker: 'month',
    }
  },
  week: {
    control: DatePicker.WeekPicker,
  },
  date: {
    control: DatePicker,
  },
  dateRange: {
    control: DatePicker.RangePicker,
  },
  dateTime: {
    control: DatePicker,
    controlProps: {
      showTime: true,
    },
  },
  dateTimeRange: {
    control: DatePicker.RangePicker,
    controlProps: {
      showTime: true,
    },
  },
  time: {
    control: TimePicker,
  },
  select: {
    control: Select,
    controlProps: {
      style: {
        width: '200px',
      },
    },
  },
};

const SearchForm = defineComponent({
  name: 'OpeneagleAdminSearchForm',
  inheritAttrs: false,
  props: {
    form: {
      type: Object as PropType<SearchFormInstance>,
      required: true,
    },
    pure: Boolean,
    /**
     * 布局方式
     *
     * - inline：内联
     * - grid：网格
     */
    layout: {
      type: String as PropType<'inline' | 'grid'>,
      default: 'inline',
    },
    /**
     * 搜索字段列宽配置，只有在 grid 布局模式有效
     *
     * - number：表示栅格布局占据的列数（每行供 24 列）
     * - string：表示字段宽度值，要求是一个带 css 单位的字符串
     * - object：同 ant-deisng-vue Col 组件的属性
     */
    column: {
      type: [String, Number, Object] as PropType<string | number | ColProps>,
      default: 8,
    },
    /**
     * label 标签的文本对齐方式
     */
    labelAlign: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
    /**
     * label 标签的宽度
     */
    labelWidth: {
      type: [Number, String] as PropType<number | 'auto'>,
      default: 'auto',
    },
    /**
     * 是否显示冒号
     */
    colon: {
      type: Boolean,
      default: true,
    },
    /**
     * 表单动作按钮是否分离显示，分离时表单的提交和重置等动作按钮不会与表单字段一行，否则为同一行
     */
    actionSplit: {
      type: Boolean,
      default: false,
    },
    /**
     * 表单动作按钮的对齐方式，表单动作氛分 main 和 extra。main 在左边，放置提交和重置等与表单相关的按钮，extra 放置额外的动作按钮，例如：表格的新建等。
     */
    actionAlign: {
      type: String as PropType<'start' | 'end' | 'center' | 'space-between'>,
      default: 'space-between',
    },
    /**
     * 搜索按钮文案
     */
    searchText: {
      type: [String, Boolean] as PropType<string | boolean>,
      default: '搜索',
    },
    /**
     * 重置按钮文案
     */
    resetText: {
      type: [String, Boolean] as PropType<string | boolean>,
      default: '重置',
    },
    /**
     * 表单的主要操作按钮
     */
    mainActions: Array as PropType<SearchFormAction[]>,
    /**
     * 表单的额外操作按钮
     */
    extraActions: Array as PropType<SearchFormAction[]>,
    /**
     * 隐藏所有表单项的必选标记
     */
    hideRequiredMark: {
      type: Boolean,
      default: false,
    },
    /**
     * 展示校验状态图标
     */
    hasFeedback: {
      type: Boolean,
      default: false,
    },
    /**
     * 当某一规则校验不通过时，是否停止剩下的规则的校验。
     */
    validateFirst: {
      type: Boolean,
      default: true,
    },
    /**
     * 设置字段校验的时机
     */
    validateTrigger: String,
  },
  setup(props, { attrs }) {
    const context = useSearchContext();
    const formRef = ref();

    const formColumn = computed<any>(() => {
      if (props.layout === 'grid') {
        return {
          flex:
            typeof props.column === 'string'
              ? `0 0 ${props.column}px`
              : undefined,
          span: typeof props.column === 'number' ? props.column : undefined,
          ...(typeof props.column === 'object' ? props.column : {}),
        };
      }
      return {};
    });
    const labelCol = computed(() => {
      return {
        flex:
          props.layout === 'inline'
            ? '0 0 auto'
            : `0 0 ${
                typeof props.labelWidth === 'number'
                  ? `${props.labelWidth}px`
                  : props.labelWidth
              }`,
      };
    });
    const wrapperCol = computed(() => {
      return {
        flex: props.layout === 'inline' ? '0 0 auto' : '1 1 auto',
      };
    });

    const fields = computed(() => {
      return props.form.fields.map((field, index) => {
        let control: any;
        let FieldControl: any = field.type;
        if (typeof FieldControl === 'function') {
          control = (FieldControl as any)(props.form as any);
        } else if (FieldControl) {
          const fieldControlConfig = FIELD_CONTROLS[FieldControl as any];
          if (fieldControlConfig?.control) {
            FieldControl = fieldControlConfig.control;
          }
          if (typeof FieldControl === 'object') {
            let controlProps = {};
            if (fieldControlConfig?.controlProps) {
              controlProps = {
                ...controlProps,
                ...(typeof fieldControlConfig.controlProps === 'function'
                  ? fieldControlConfig.controlProps(field, props.form)
                  : fieldControlConfig.controlProps),
              };
            }
            const valuePropName =
              fieldControlConfig?.valuePropName ||
              field.valuePropName ||
              'value';
            const valueChangePropName =
              fieldControlConfig?.valueChangePropName ||
              field.valueChangePropName ||
              `onUpdate:${field.valuePropName || 'value'}`;
            controlProps = {
              ...controlProps,
              [valuePropName]: props.form.state[field.name],
              [valueChangePropName]: (value: any) => {
                props.form.state[field.name] = value;
              },
            };
            control = <FieldControl {...controlProps} />;
          }
        }
        if (control) {
          let controlProps;
          if (typeof field.controlProps === 'function') {
            controlProps = field.controlProps(props.form);
          } else if (field.controlProps) {
            controlProps = field.controlProps;
          }
          control = cloneVNode(control, {
            ...controlProps,
          });
        }
        let fieldProps: any = {};
        if (typeof field.fieldProps === 'function') {
          fieldProps = field.fieldProps(props.form);
        } else if (field.fieldProps) {
          fieldProps = field.fieldProps;
        }
        if (field.labelWidth) {
          fieldProps.labelCol = `0 0 ${
            typeof field.labelWidth === 'number'
              ? `${field.labelWidth}px`
              : field.labelWidth
          }`;
        }
        let fieldColumn;
        if (props.layout === 'grid' && field.column) {
          return {
            flex: typeof field.column === 'string' ? field.column : undefined,
            span: typeof field.column === 'number' ? field.column : undefined,
            ...(typeof field.column === 'object' ? field.column : {}),
          };
        }
        return (
          <Col key={index} {...(fieldColumn || formColumn.value)}>
            <Form.Item
              name={field.name}
              label={field.label}
              colon={field.colon ?? props.colon}
              labelAlign={field.labelAlign ?? props.labelAlign}
              extra={field.extra}
              hasFeedback={field.hasFeedback ?? props.hasFeedback}
              required={field.required}
              validateFirst={field.validateFirst ?? props.validateFirst}
              validateTrigger={field.validateTrigger ?? props.validateTrigger}
              {...fieldProps}
            >
              {control}
            </Form.Item>
          </Col>
        );
      });
    });

    watchEffect(() => {
      props.form.ref.value = formRef.value;
    });
    onMounted(() => {
      if (context) {
        context.form[props.form.name] = props.form;
      }
    });
    onUnmounted(() => {
      if (context && context.form[props.form.name]) {
        delete context.form[props.form.name];
      }
    });
    const handleSubmit = () => {
      props.form.submit();
    }; 
    const handleReset = () => {
      props.form.reset();
    };

    return () => {
      let actions = (
        <Row type="flex" justify={props.actionAlign}>
          <Col>
            <Form.Item>
              <Space>
                {props.searchText !== false && (
                  <Button type="primary" onClick={handleSubmit}>
                    {props.searchText}
                  </Button>
                )}
                {props.resetText !== false && (
                  <Button type="default" onClick={handleReset}>
                    {props.resetText}
                  </Button>
                )}
                {props.mainActions?.map((action, index) => (
                  <Button
                    key={index}
                    type={action.type}
                    onClick={() => action.onClick(props.form)}
                  >
                    {action.icon}
                    {action.text}
                  </Button>
                ))}
              </Space>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Space>
                {props.extraActions?.map((action, index) => (
                  <Button
                    key={index}
                    type={action.type}
                    onClick={() => action.onClick(props.form)}
                  >
                    {action.icon}
                    {action.text}
                  </Button>
                ))}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      );
      const form = (
        <Form
          {...attrs}
          name={props.form.name}
          class={['openeagle-ant-search-form', attrs.class]}
          ref={formRef}
          layout="horizontal"
          model={props.form.state}
          rules={props.form.rules as any}
          labelCol={labelCol.value}
          wrapperCol={wrapperCol.value}
        >
          <Row gutter={16} type="flex">
            {fields.value}
            {!props.actionSplit ? <Col flex="1 0 auto">{actions}</Col> : null}
          </Row>
          {props.actionSplit ? actions : null}
        </Form>
      );
      if (
        props.pure === true ||
        (props.pure !== false && context?.pure === true)
      ) {
        return form;
      }
      return <Card class="openeagle-ant-search-form-card">{form}</Card>;
    };
  },
});

SearchForm.useForm = useForm;

export default SearchForm as typeof SearchForm & {
  readonly useForm: typeof useForm;
};
