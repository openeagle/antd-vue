import { defineComponent } from 'vue';
import { Spin } from 'ant-design-vue';

export default defineComponent({
  name: 'PageLoading',
  props: {
    tip: String,
  },
  setup(props) {
    return () => {
      const { tip } = props;
      return (
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
          <Spin size="large" tip={tip} />
        </div>
      );
    };
  },
});
