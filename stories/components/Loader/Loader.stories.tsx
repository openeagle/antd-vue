import { ref } from 'vue';
import eaxios from '@openeagle/eaxios';
import { Loader, useRequest } from '@/index';
import mdx from './Loader.mdx';

export default {
  title: '组件/Loader',
  component: Loader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    value: {},
  },
};


export const API: any = (args: any, { argTypes }: any) => ({
  setup(props: any, { emit }: any) {
    return () => {
      return <div></div>;
    };
  },
});

API.parameters = {
  controls: {
    disabled: true,
  },
};


export const Success: any = (args: any) => ({
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
        <Loader
          failure={{ error: error.value, onOk: run }}
          loading={loading.value}
        >
          {JSON.stringify(data.value)}
        </Loader>
      );
    };
  },
});
Success.storyName = '成功';

export const Failure: any = (args: any) => ({
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
        <Loader
          failure={{ error: new Error('123232'), onOk: run }}
          loading={loading.value}
        >
          {JSON.stringify(data.value)}
        </Loader>
      );
    };
  },
});
Failure.storyName = '失败';

export const FailureWubai: any = (args: any) => ({
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
        <Loader
          failure={{ error: error.value, onOk: run }}
          loading={loading.value}
        >
          {JSON.stringify(data.value)}
        </Loader>
      );
    };
  },
});
FailureWubai.storyName = '失败500';
/**
 * 可以通过 failure.options 定制特定错误码的提示信息
 */

export const Warning: any = (args: any) => ({
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
      );
    };
  },
});
Warning.storyName = '警告';

export const Cancellation: any = (args: any) => ({
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
        <div>
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
        </div>
      );
    };
  },
});
Cancellation.storyName = '取消';
