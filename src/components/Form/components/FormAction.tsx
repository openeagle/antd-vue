import { defineComponent, computed, PropType } from 'vue';
import { propTypes } from '../../../utils/propTypes';
import type { ColEx } from '../types/index';
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import { Form, Col, Button } from 'ant-design-vue';
type ButtonOptions = Partial<ButtonProps> & { text: string };
import { useFormContext } from '../hooks/useFormContext';


export default defineComponent({
  name: 'BasicFormAction',
  props: {
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: {},
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonOptions>,
      default: {},
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: {},
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool,
  },
  emits: ['toggle-advanced'],
  setup(props, { emit }) {
    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
      const actionSpan = 24 - span;
      const advancedSpanObj = showAdvancedButton
        ? { span: actionSpan < 6 ? 24 : actionSpan }
        : {};
      const actionColOpt: Partial<ColEx> = {
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions,
      };
      return actionColOpt;
    });

    const getResetBtnOptions = computed(
      (): ButtonOptions => {
        return Object.assign(
          {
            text: '重置',
          },
          props.resetButtonOptions
        );
      }
    );

    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          text: '查询',
        },
        props.submitButtonOptions
      );
    });

    function toggleAdvanced() {
      emit('toggle-advanced');
    }

    const {resetAction,submitAction} = useFormContext()

    return () => {
      if (props.showActionButtonGroup) {
        return <Col {...actionColOpt.value} style={{textAlign: 'right'}}>
          <Form.Item>
            <slot name="resetBefore"></slot>
            {props.showResetButton && <Button
              onClick={resetAction}
              {...getResetBtnOptions.value}
              class="mr-2">
                {getResetBtnOptions.value.text}
            </Button>}

            <slot name="submitBefore"></slot>
            {props.showSubmitButton && <Button
              onClick={submitAction}
              {...getSubmitBtnOptions.value}
              class="mr-2">
                {getSubmitBtnOptions.value.text}
            </Button>}

            <slot name="advanceBefore"></slot>
            {(props.showAdvancedButton && !props.hideAdvanceBtn) && <Button
              onClick={toggleAdvanced}
              {...getSubmitBtnOptions.value}
              class="mr-2">
                {props.isAdvanced ? '收起' : '展开'}
                {/* <BasicArrow class="ml-1" expand={!props.isAdvanced} top /> */}
            </Button>}
            <slot name="advanceAfter"></slot>
          </Form.Item>
        </Col>
      }
      return null;
    };
  },
});
