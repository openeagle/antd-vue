import { PropType, defineComponent } from 'vue';
import { Result, Button } from 'ant-design-vue';

export default defineComponent({
  name: 'PageResult',
  props: {
    failure: Object as PropType<{
      error: Error;
      retry: () => null;
      fail: () => null;
      attempts: number;
    }>,
  },
  setup(props) {
    return () => {
      const { failure } = props;
      console.log(failure)
      return (
        <Result status="error" title="加载失败了~">
          {{
            extra: () => {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    failure?.retry?.();
                  }}
                >
                  点击重试
                </Button>
              );
            },
          }}
        </Result>
      );
    };
  },
});
