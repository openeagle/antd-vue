import { onUnmounted, Ref, ref } from 'vue';
import eaxios, {
  CancelTokenSource,
  EaxiosError,
  EaxiosRequestConfig,
} from '@openeagle/eaxios';

export default function useRequest<T>(
  request: (option: Partial<EaxiosRequestConfig>) => Promise<T>,
  option?: { manual?: boolean; onCancel?(): void },
): {
  error: Ref<EaxiosError | undefined>;
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  run(): void;
  cancel(): void;
} {
  const error = ref<EaxiosError | undefined>();
  const data = ref<T | undefined>();
  const loading = ref<boolean>(false);
  let cancelToken: CancelTokenSource | undefined;
  const run = () => {
    loading.value = true;
    cancelToken = eaxios.CancelToken.source();
    request({ cancelToken: cancelToken.token })
      .then((response) => {
        data.value = response;
      })
      .catch((err: EaxiosError) => {
        error.value = err;
      })
      .finally(() => {
        cancelToken = undefined;
        loading.value = false;
      });
  };
  const cancel = () => {
    if (cancelToken) {
      option?.onCancel?.();
      cancelToken.cancel();
      cancelToken = undefined;
    }
  };
  if (!option?.manual) {
    run();
  }
  onUnmounted(() => {
    cancel();
  });
  return {
    error,
    data,
    loading,
    run,
    cancel,
  };
}
