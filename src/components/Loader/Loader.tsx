import { PropType, VNode, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Result, Spin } from 'ant-design-vue';
import { EaxiosError } from '@openeagle/eaxios';

const ERROR_STATUS: {
  [key: string]: {
    status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
    title: string;
  };
} = {
  UNKNOWN: {
    status: 'error',
    title: '出错了~',
  },
  REQUEST_OFFLINE: {
    status: 'error',
    title: '出错了~',
  },
  REQUEST_TIMEOUT: {
    status: 'error',
    title: '出错了~',
  },
  SERVER_ERROR: {
    status: '500',
    title: '500',
  },
  RESPONSE_INVALID: {
    status: 'error',
    title: '出错了~',
  },
};

export interface LoaderPropsType {
  failure: {
    error?: Error | EaxiosError;
    okText?: string;
    cancelText?: string;
    onOk?(): any;
    onCancel?(): any;
    options?: {
      [key: string]: {
        status:
          | 'success'
          | 'error'
          | 'info'
          | 'warning'
          | '404'
          | '403'
          | '500';
        title?: string;
        subTitle?: string;
        okText?: string;
        cancelText?: string;
        onOk?(): any;
        onCancel?(): any;
      };
    };
  };
  loading:
    | boolean
    | {
        size: 'small' | 'default' | 'large';
        tip: string;
      };
  success?: {
    status: 'success' | 'error';
    icon: VNode;
    title: string | VNode;
    subTitle: string;
    extra: VNode;
  };
}

export default defineComponent({
  name: 'OpeneagleLoader',
  props: {
    failure: Object as PropType<LoaderPropsType['failure']>,
    loading: [Boolean, Object] as PropType<LoaderPropsType['loading']>,
    success: Object as PropType<LoaderPropsType['success']>,
  },
  setup(props, { slots }) {
    const router = useRouter();
    return () => {
      const { failure, loading, success } = props;
      if (!!loading) {
        return (
          <div style={{ paddingTop: '100px', textAlign: 'center' }}>
            <Spin
              {...(typeof loading === 'object' ? loading : {})}
            />
          </div>
        );
      }

      if (failure?.error) {
        const {
          error,
          okText = '刷新重试',
          cancelText = '返回',
          onOk,
          onCancel = () => router.back(),
          options,
        } = failure;
        const { code = 'UNKNOWN' } = error as any;
        const option = {
          okText,
          cancelText,
          onOk,
          onCancel,
          ...ERROR_STATUS['UNKNOWN'],
          ...options?.['UNKNOWN'],
          ...ERROR_STATUS[code],
          ...options?.[code],
        };
        const actions: VNode[] = [];
        if (option.okText && option.onOk) {
          actions.push(
            (
              <Button key="ok" type="primary" onClick={option.onOk}>
                {option.okText}
              </Button>
            ) as VNode,
          );
        }
        if (option.cancelText && option.onCancel) {
          actions.push(
            (
              <Button key="ok" type="default" onClick={option.onCancel}>
                {option.cancelText}
              </Button>
            ) as VNode,
          );
        }
        return (
          <Result
            status={option.status}
            title={option.title}
            subTitle={option.subTitle || error.message}
            extra={actions}
          />
        );
      }

      if (success) {
        return <Result {...success} />;
      }

      return slots.default?.();
    };
  },
});
