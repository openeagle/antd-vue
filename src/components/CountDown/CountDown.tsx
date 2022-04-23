import { watch, computed, defineComponent, PropType } from 'vue';
import { parseFormat } from './utils';

// Composables
import { useCountDown, useExpose } from '../../hooks';

export default defineComponent({
  name: 'OpeneagleCountDown',
  props: {
    millisecond: Boolean,
    time: {
      type: [Number, String],
      default: 0,
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
    onFinish: Function as PropType<(value: any) => void>,
    onChange: Function as PropType<(value: any) => void>,
  },

  emits: ['change', 'finish'],

  setup(props, { emit, slots }) {
    const { start, pause, reset, current } = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: (current) => emit('change', current),
      onFinish: () => emit('finish'),
    });

    const timeText = computed(() => parseFormat(props.format, current.value));

    const resetTime = () => {
      reset(+props.time);

      if (props.autoStart) {
        start();
      }
    };

    watch(() => props.time, resetTime, { immediate: true });

    useExpose({
      start,
      pause,
      reset: resetTime,
    });

    return () => (
      <div class="openeagle-ant-count-down">
        {slots.default ? slots.default(current.value) : timeText.value}
      </div>
    );
  },
});
