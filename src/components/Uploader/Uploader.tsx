import { defineComponent, onUnmounted } from '@vue/runtime-core';
import { Upload } from 'ant-design-vue';
import eaxios, { CancelTokenSource } from '@openeagle/eaxios';
import config from '../../config';

/**
 * TODO: 改成外部配置
 */
function uploadFile(file: File, options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        fileId: Date.now(),
        fileName: '',
        fileType: 'jped',
        meta: {
          format: 'jpeg',
          size: 0,
        },
        url: URL.createObjectURL(file),
      });
    }, 2000);
  });
}

const { SITE_CDN_MAPS } = config;

export const UploaderProps = {
  ...Upload.props,
  metadata: Function,
};

export default defineComponent({
  name: 'OpeneagleUploader',
  props: UploaderProps,
  setup(props, { slots }) {
    let cancelToken: CancelTokenSource | undefined;
    onUnmounted(() => {
      if (cancelToken) {
        cancelToken.cancel();
      }
    });
    cancelToken = eaxios.CancelToken.source();
    const handleUpload = (option: any) => {
      return uploadFile(option.file, {
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
        .then((data) => {
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
        .then((data) => {
          if (option.onSuccess) {
            option.onSuccess(data);
          }
        })
        .catch((error) => {
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
