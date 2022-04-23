import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
    clear: Boolean,
  },
  emits: ['clear'],
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="c-select-item">
          <div class="c-header">
            <span class="c-header-title">{props.title}</span>
            {props.clear && (
              <span class="c-header-clear" onClick={() => emit('clear')}>
                清空全部
              </span>
            )}
          </div>
          <div class="c-selecter-content">{slots.default?.()}</div>
        </div>
      );
    };
  },
});
