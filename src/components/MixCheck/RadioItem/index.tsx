import { computed, defineComponent } from 'vue';

const RadioItem = defineComponent({
  name: 'OpeneagleRadioItem',
  props: {
    label: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
  },
  model: null,
  currentValue: false,
  emits: ['change'],
  setup(props, context) {
    const wrapClasses = computed(() => {
      return [
        'openeagle-ant-mixcheck-item',
        'openeagle-ant-radio-wrapper',
        {
          'c-wrapper-checked': props.checked,
          'c-wrapper-disabled': props.disabled,
        },
      ];
    });

    const onChange = (event: any) => {
      if (props.disabled) return false;
      context.emit('change', event.target.checked);
    };

    return () => {
      return (
        <label class={wrapClasses.value}>
          <span class="c-radio-item">
            <input
              type="radio"
              class="c-mix-input"
              disabled={props.disabled}
              checked={props.checked}
              name={props.name}
              onChange={onChange}
            />
            {context.slots?.default ? (
              context.slots?.default()
            ) : (
              <span>{props.label}</span>
            )}
          </span>
        </label>
      );
    };
  },
});

export default RadioItem;
