import { computed, defineComponent } from 'vue';

const CheckItem = defineComponent({
  name: 'OpeneagleCheckItem',
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
    },
    name: {
      type: String,
    }
  },
  emits: ['update:checked', 'change'],
  setup(props, context) {
    const wrapClasses = computed(() => {
      return [
        'openeagle-ant-mixcheck-item',
        'openeagle-ant-check-wrapper',
        {
          'c-wrapper-checked': props.checked,
          'c-wrapper-disabled': props.disabled,
        },
      ];
    });

    const onChange = (event: any) => {
      if (props.disabled) return false;
      context.emit('update:checked', event.target.checked);
      context.emit('change');
    };
    return () => {
      return (
        <label class={wrapClasses.value}>
          <span class="c-check-item">
            <input
              type="checkbox"
              class="c-mix-input"
              disabled={props.disabled}
              checked={props.checked}
              name={props.name}
              onChange={onChange}
            />
          </span>
          {context.slots?.default ? (
            context.slots?.default()
          ) : (
            <span>{props.label}</span>
          )}
        </label>
      );
    };
  },
});

export default CheckItem;
