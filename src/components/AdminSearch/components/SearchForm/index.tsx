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
      mode: 'year',
    },
    valueChangePropName: 'onPanelChange',
  },
  month: {
    control: DatePicker,
    controlProps: {
      mode: 'month',
    },
    valueChangePropName: 'onPanelChange',
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
     * ????????????
     *
     * - inline?????????
     * - grid?????????
     */
    layout: {
      type: String as PropType<'inline' | 'grid'>,
      default: 'inline',
    },
    /**
     * ???????????????????????????????????? grid ??????????????????
     *
     * - number???????????????????????????????????????????????? 24 ??????
     * - string????????????????????????????????????????????? css ??????????????????
     * - object?????? ant-deisng-vue Col ???????????????
     */
    column: {
      type: [String, Number, Object] as PropType<string | number | ColProps>,
      default: 8,
    },
    /**
     * label ???????????????????????????
     */
    labelAlign: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
    /**
     * label ???????????????
     */
    labelWidth: {
      type: [Number, String] as PropType<number | 'auto'>,
      default: 'auto',
    },
    /**
     * ??????????????????
     */
    colon: {
      type: Boolean,
      default: true,
    },
    /**
     * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     */
    actionSplit: {
      type: Boolean,
      default: false,
    },
    /**
     * ?????????????????????????????????????????????????????? main ??? extra???main ???????????????????????????????????????????????????????????????extra ????????????????????????????????????????????????????????????
     */
    actionAlign: {
      type: String as PropType<'start' | 'end' | 'center' | 'space-between'>,
      default: 'space-between',
    },
    /**
     * ??????????????????
     */
    searchText: {
      type: [String, Boolean] as PropType<string | boolean>,
      default: '??????',
    },
    /**
     * ??????????????????
     */
    resetText: {
      type: [String, Boolean] as PropType<string | boolean>,
      default: '??????',
    },
    /**
     * ???????????????????????????
     */
    mainActions: Array as PropType<SearchFormAction[]>,
    /**
     * ???????????????????????????
     */
    extraActions: Array as PropType<SearchFormAction[]>,
    /**
     * ????????????????????????????????????
     */
    hideRequiredMark: {
      type: Boolean,
      default: false,
    },
    /**
     * ????????????????????????
     */
    hasFeedback: {
      type: Boolean,
      default: false,
    },
    /**
     * ???????????????????????????????????????????????????????????????????????????
     */
    validateFirst: {
      type: Boolean,
      default: true,
    },
    /**
     * ???????????????????????????
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
