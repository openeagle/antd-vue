import { ref, computed, defineComponent, PropType } from 'vue';
import { Input } from 'ant-design-vue';
import CountDown from '../CountDown/CountDown';
export default defineComponent({
  name: 'OpeneagleCode',
  props: {
    ...Input.Props,
    value: String,
    timeout: {
      type: Number,
      default: 60000,
    },
    request: {
      type: Function as PropType<(value: any) => void>,
      required: true,
    },
    maxlength: {
      type: Number,
      default: 4,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const start = ref(false);

    const onClick = () => {
      start.value = true;
      if (props.request) {
        props.request();
      }
    };
    const onChange = (time: any) => {
      if (time.seconds === 0) {
        start.value = false;
      }
    };
    const onInput = (e: any) => {
      const { value } = e.target;
      const reg = /^[0-9]*$/;
      console.log(reg.test(value));
      if (!Number.isNaN(value) && reg.test(value)) {
        emit('update:value', e.target.value);
      }
    };
    return () => (
      <div class="openeagle-ant-code-wrapper">
        <div class="openeagle-ant-code-wrapper-input">
          <Input {...props} value={props.value} onInput={onInput}>
            {{
              addonAfter: () => {
                return (
                  <div class="openeagle-ant-code-wrapper-code">
                    {!start.value ? (
                      <span class="code-text" onClick={onClick}>
                        获取验证码
                      </span>
                    ) : (
                      <span class="code-text-send">
                        <CountDown time={props.timeout} onChange={onChange}>
                          {{
                            default: (time: any) => {
                              return `${time.seconds}s后重新发送`;
                            },
                          }}
                        </CountDown>
                      </span>
                    )}
                  </div>
                );
              },
            }}
          </Input>
        </div>
      </div>
    );
  },
});
