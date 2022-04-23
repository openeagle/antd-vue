import { defineComponent, ref } from 'vue';
import { Card } from 'ant-design-vue';
import eaxios from '@openeagle/eaxios';
import { Loader, AdminLayout, useRequest } from '@/index';

const { PageContainer } = AdminLayout;

const Success = defineComponent({
  setup() {
    const { error, data, loading, run } = useRequest(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: 1, name: 'success' });
        }, 1000);
      });
    });
    return () => {
      return (
        <Card>
          <Loader
            failure={{ error: error.value, onOk: run }}
            loading={loading.value}
          >
            {JSON.stringify(data.value)}
          </Loader>
        </Card>
      );
    };
  },
});

const Failure = defineComponent({
  setup() {
    const { error, data, loading, run } = useRequest(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(eaxios.createError('failure', '10001', null as any));
        }, 1000);
      });
    });
    return () => {
      return (
        <Card>
          <Loader
            failure={{ error: error.value, onOk: run }}
            loading={loading.value}
          >
            {JSON.stringify(data.value)}
          </Loader>
        </Card>
      );
    };
  },
});

const Failure500 = defineComponent({
  setup() {
    const { error, data, loading, run } = useRequest(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(eaxios.createError('500', 'SERVER_ERROR', null as any));
        }, 1000);
      });
    });
    return () => {
      return (
        <Card>
          <Loader
            failure={{ error: error.value, onOk: run }}
            loading={loading.value}
          >
            {JSON.stringify(data.value)}
          </Loader>
        </Card>
      );
    };
  },
});

/**
 * 可以通过 failure.options 定制特定错误码的提示信息
 */
const Warning = defineComponent({
  setup() {
    const { error, data, loading, run } = useRequest(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(eaxios.createError('warning', '10001', null as any));
        }, 1000);
      });
    });
    return () => {
      return (
        <Card>
          <Loader
            failure={{
              error: error.value,
              onOk: run,
              options: {
                10001: {
                  status: 'warning',
                  title: '警告！',
                  subTitle: '请求失败了',
                },
              },
            }}
            loading={loading.value}
          >
            {JSON.stringify(data.value)}
          </Loader>
        </Card>
      );
    };
  },
});

const Cancellation = defineComponent({
  setup() {
    const canceled = ref(false);
    const { error, data, loading, run, cancel } = useRequest(
      (option) => {
        // option 里包含了取消请求的 token，可以在 Chrome 调试 Network 里查看请求是否被取消了
        return eaxios({
          ...option,
          method: 'get',
          url: 'https://run.mocky.io/v3/fde1246b-affd-4d71-bdb2-eafc91eb0d3f',
        });
      },
      {
        onCancel: () => {
          canceled.value = true;
        },
      },
    );
    setTimeout(() => {
      // 为了模拟取消请求，这里立即执行了 cancel，正常情况 cancel 是组件销毁的时候自动执行
      cancel();
    }, 0);
    return () => {
      return (
        <Card>
          {!canceled.value ? (
            <Loader
              failure={{
                error: error.value,
                onOk: run,
              }}
              loading={loading.value}
            >
              {JSON.stringify(data.value)}
            </Loader>
          ) : (
            'canceld'
          )}
        </Card>
      );
    };
  },
});

export default defineComponent({
  setup(props) {
    const { error, data, loading, run } = useRequest(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: 1, name: 'success' });
        }, 1000);
      });
    });
    return () => {
      return (
        <PageContainer
          loader={{
            failure: {
              error: error.value,
              onOk: run,
            },
            loading: loading.value,
          }}
        >
          <Success />
          <Failure />
          <Failure500 />
          <Warning />
          <Cancellation />
        </PageContainer>
      );
    };
  },
});
