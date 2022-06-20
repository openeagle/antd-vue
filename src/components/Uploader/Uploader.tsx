import { defineComponent, onUnmounted } from '@vue/runtime-core';
import { Upload } from 'ant-design-vue';
import eaxios, { CancelTokenSource } from '@openeagle/eaxios';

export interface UploadFileOptions {
  cancelToken: CancelTokenSource;
  onUploadProgress: (event: any) => void;
}

export const UploaderProps = {
  ...Upload.props,
  metadata: Function,
};

export default defineComponent({
  name: 'OpeneagleUploader',
  props: {
    ...UploaderProps,
    uploadFile: Function as PropType<
      (file: File, options?: UploadFileOptions) => Promise<any>
    >,
  },
  setup(props, { slots }) {
    let cancelToken: CancelTokenSource | undefined;
    onUnmounted(() => {
      if (cancelToken) {
        cancelToken.cancel();
      }
    });
    cancelToken = eaxios.CancelToken.source();
    const handleUpload = (option: any) => {
      return props
        .uploadFile(option.file, {
          cancelToken: cancelToken?.token,
          onUploadProgress: (event: any) => {
            if (event.total > 0) {
              event.percent = (event.loaded / event.total) * 100;
            }
            if (option.onProgress) {
              option.onProgress(event);
            }
          },
        })
        .then((data: any) => {
          if (typeof props.metadata === 'function') {
            return props
              .metadata(option.file)
              .then((meta: any) => {
                return {
                  ...data,
                  meta: {
                    ...data.meta,
                    ...meta,
                  },
                };
              })
              .catch((error: Error) => {
                return data;
              });
          }

          return data;
        })
        .then((data: any) => {
          if (option.onSuccess) {
            option.onSuccess(data);
          }
        })
        .catch((error: any) => {
          if (option.onError) {
            option.onError(error);
          }
        })
        .finally(() => {
          cancelToken = undefined;
        });
    };
    return () => {
      return (
        <Upload {...props} customRequest={handleUpload}>
          {slots.default?.()}
        </Upload>
      );
    };
  },
});
