import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue';
import RadioItem from './RadioItem';
import CheckItem from './CheckItem';

const MixCheck = defineComponent({
  name: 'OpeneagleMixCheck',
  props: {
    value: {
      type: Array,
    },
    options: {
      type: Array,
      default: () => [],
    },
    onChange: Function as PropType<(value: any) => void>,
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const internalInstance = getCurrentInstance();
    const currentValue = ref([]);

    const optionsList = ref(
      props.options.map((item: any) => {
        return {
          ...item,
          checked: props.value?.includes(item.id),
        };
      }),
    );

    const allCheck = computed(() => {
      return optionsList.value.every((item) => !item.checked);
    });

    const onChange = () => {
      const updateValue: any[] = [];
      optionsList.value.forEach((item) => {
        if (item.checked) {
          updateValue.push(item.id);
        }
      });
      emit('update:value', updateValue);
      props.onChange?.(updateValue);
    };

    const allChange = (checked: boolean) => {
      if (checked) {
        optionsList.value = optionsList.value.map((item) => {
          return {
            ...item,
            checked: false,
          };
        });
        emit('update:value', []);
        props.onChange?.([]);
      }
    };

    const initData = () => {
      optionsList.value = props.options.map((item: any) => {
        return {
          ...item,
          checked: props.value?.includes(item.id),
        };
      });
    };

    watch(
      () => props.options,
      () => {
        initData();
      },
    );
    watch(
      () => props.value,
      () => {
        initData();
      },
    );

    initData();

    return () => {
      return (
        <div class="openeagle-ant-mix-check">
          <RadioItem label="" checked={allCheck.value} onChange={allChange}>
            不限
          </RadioItem>
          {optionsList.value.map((item) => {
            return (
              <CheckItem
                label={item.id}
                v-model={[item.checked, 'checked']}
                onChange={onChange}
              >
                {item.name}
              </CheckItem>
            );
          })}
        </div>
      );
    };
  },
});

MixCheck.RadioItem = RadioItem;
MixCheck.CheckItem = CheckItem;

export default MixCheck as typeof MixCheck & {
  readonly RadioItem: typeof RadioItem;
  readonly CheckItem: typeof CheckItem;
};
