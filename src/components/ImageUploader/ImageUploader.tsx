import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from '@vue/runtime-core';
import { message, Progress, Image as AImage } from 'ant-design-vue';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
import Uploader, { UploadFileOptions } from '../Uploader';
import { handleCompany } from '../../utils/common';
import './style';

export interface ImageFile {
  uid: string;
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  thumbUrl: string;
  url: string;
  width: number;
  height: number;
  [key: string]: any;
}

export interface ImageFileInfo {
  width: number;
  height: number;
}

export const getImageFileInfo = (file: File): Promise<ImageFileInfo> => {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  }).then((src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () =>
        resolve({
          height: img.naturalHeight,
          width: img.naturalWidth,
        });
      img.onerror = reject;
      img.src = src;
    });
  });
};

export const defaultFallback =
  'data:image/png;base64,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';

export const ImageUploaderProps = {
  /**
   * 支持的图片格式
   */
  accept: {
    type: String,
    default: '.jpg,.jpeg,.png,.gif',
  },
  /**
   * 是否保留上传失败的图片
   */
  errorReserve: {
    type: Boolean,
    default: true,
  },
  /**
   * 支持按文件夹上传
   */
  directory: {
    type: Boolean,
    default: false,
  },
  /**
   * 限制上传数量
   */
  limit: {
    type: Number,
    default: 1,
  },
  /**
   * 支持同时上传多张图片
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 最大图片大小
   */
  maxSize: Number,
  /**
   * 最小图片大小
   */
  minSize: Number,
  /**
   * 最大图片宽度
   */
  maxWidth: Number,
  /**
   * 最小图片宽度
   */
  minWidth: Number,
  /**
   * 最大图片高度
   */
  maxHeight: Number,
  /**
   * 最小图片高度
   */
  minHeight: Number,
  /**
   * 图片分辨率
   */
  resolution: Object as PropType<{
    width: number;
    height: number;
  }>,
  /**
   * 多组图片分辨率
   */
  resolutions: Array as PropType<
    {
      width: number;
      height: number;
    }[]
  >,
  /**
   * 预览图大小
   */
  view: {
    type: Object as PropType<{
      width: number | string;
      height: number | string;
    }>,
    default: {
      width: '104px',
      height: '104px',
    },
  },
  /**
   * 上传按钮文案
   */
  text: {
    type: String,
    default: '上传图片',
  },
  /**
   * 是否支持删除
   */
  closable: {
    // 是否显示右上角删除按钮
    type: Boolean,
    default: true,
  },
  /**
   * 自定义校验
   */
  validate: Function as PropType<(file: ImageFile) => Promise<string>>,
  /**
   * value 值
   */
  value: {
    type: Array as PropType<ImageFile[]>,
    default: [],
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  onChange: Function as PropType<(files: ImageFile[], file: ImageFile) => void>, // 上传进度条改变回调
  onRemove: Function as PropType<
    (files: ImageFile[], file: ImageFile, index: number) => void
  >, // 删除图片回调
  onPreview: Function as PropType<
    (files: ImageFile[], file: ImageFile, index: number) => void
  >, // 预览图片回调
  renderItem: Function as PropType<
    (vNode: any, img: ImageFile, index: number) => void
  >,
  uploadFile: Function as PropType<
    (file: File, options?: UploadFileOptions) => Promise<any>
  >,
};

const regUrl = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;

const formatFileSize = (size: number) => {
  if (size >= 1024) {
    return `${Math.floor((size / 1024) * 10) / 10} MB`;
  }
  return `${size} KB`;
};

export default defineComponent({
  name: 'OpeneagleImageUploader',
  props: ImageUploaderProps,
  setup(props, { emit, slots }) {
    const images = ref(props.value);
    const uploading = computed(() => {
      return props.value?.some((file) => file.status === 'uploading');
    });
    watch(
      () => props.value,
      () => {
        if (props.value !== images.value) {
          images.value = props.value;
        }
      },
    );
    const handleBeforeUpload = (file: any, fileList: any) => {
      let errorMessage = '';
      const fileExtension = `.${file.type.split('/')[1]}`;
      if (props.accept.indexOf(fileExtension) < 0) {
        errorMessage = `请上传正确格式的图片 ${props.accept}`;
      }
      const fileSize = file.size / 1024;
      if (props.maxSize && fileSize > props.maxSize) {
        errorMessage = `图片不可大于 ${formatFileSize(props.maxSize)}!`;
      }
      if (props.minSize && fileSize > props.minSize) {
        errorMessage = `图片不可小于 ${formatFileSize(props.minSize)}!`;
      }
      if (errorMessage) {
        message.error(errorMessage);
        return false;
      } else if (
        props.validate ||
        props.resolution ||
        props.resolutions ||
        props.maxWidth ||
        props.minHeight ||
        props.maxHeight ||
        props.minHeight
      ) {
        return getImageFileInfo(file)
          .then((imageFileInfo: ImageFileInfo) => {
            const { height, width } = imageFileInfo;

            if (props.resolutions) {
              let accord = props.resolutions.find((item) => {
                if (item.width === width && item.height === height) {
                  return true;
                }
              });
              if (!accord) {
                return `图片尺寸不符合：${props.resolutions
                  .map((item) => `${item.width}*${item.height}px`)
                  .join('、')}`;
              }
            }

            if (
              props.resolution &&
              props.resolution.width &&
              props.resolution.height &&
              (props.resolution.width !== width ||
                props.resolution.height !== height)
            ) {
              return `图片尺寸不符合：${props.resolution.width}*${props.resolution.height}px`;
            }

            if (props.minHeight && height < props.minHeight) {
              return `图片尺寸高度须大于等于 ${props.minHeight}`;
            }
            if (props.maxHeight && height > props.maxHeight) {
              return `图片尺寸高度须小于等于 ${props.maxHeight}`;
            }
            if (props.minWidth && width < props.minWidth) {
              return `图片尺寸宽度须大于等于 ${props.minWidth}`;
            }
            if (props.maxWidth && width > props.maxWidth) {
              return `图片尺寸宽度须小于等于 ${props.maxWidth}`;
            }
            if (props.validate && typeof props.validate === 'function') {
              return props.validate({ ...file, ...imageFileInfo });
            }
            return '';
          })
          .then((result: any) => {
            if (result) {
              message.error(result);
              return Promise.reject(new Error(result));
            }
            return true;
          });
      }
      return true;
    };
    const handleChange = ({ file, fileList, event }: any) => {
      if (file.status) {
        const newValue = images.value.slice(0);
        let matchedIndex = -1;
        for (let index = 0; index < images.value.length; index++) {
          const item = images.value[index];
          if (file.uid === item.uid) {
            matchedIndex = index;
            break;
          }
        }
        let newFile: any = file;
        if (matchedIndex >= 0) {
          if (
            file.status === 'removed' ||
            (props.errorReserve === false && file.status === 'error')
          ) {
            newValue.splice(matchedIndex, 1);
          } else {
            newFile = {
              ...images.value[matchedIndex],
              status: file.status,
              percent: file.percent,
            };
            if (file.status === 'done' && file.response) {
              newFile = {
                ...newFile,
                id: file.response.fileId,
                url: file.response.url,
                width: file.response.meta?.width || 0,
                height: file.response.meta?.height || 0,
              };
            }
            newValue[matchedIndex] = newFile;
          }
        } else {
          newFile = {
            uid: file.uid,
            name: file.name,
            size: file.size,
            type: file.type,
            percent: file.percent,
            status: file.status,
          };
          newValue.push(newFile);
        }
        images.value = newValue;
        emit('update:value', newValue, newFile);
        if (props.onChange) {
          props.onChange(newValue, newFile);
        }
      }
    };
    const previewImg = (file: ImageFile, index: number) => {
      props.onPreview && emit('preview', images.value, file, index);
    };

    const deleteImage = (file: ImageFile, index: number) => {
      images.value.splice(index, 1);
      props.onRemove && emit('remove', images.value, file, index);
      props.onChange?.(images.value, file);
      emit('update:value', images.value);
    };

    return () => {
      return (
        <div class={'openeagle-ant-image-view'}>
          <AImage.PreviewGroup key={images.value.length}>
            {images.value.map((item: any, i: number) => {
              let percent = (item.percent || 0).toFixed(2);
              percent = percent <= 0 ? 0 : percent;
              const ImageNode = (
                <div
                  key={item.uid || item.id}
                  class={'image-box'}
                  style={{
                    width: handleCompany(props.view.width),
                    height: handleCompany(props.view.height),
                  }}
                >
                  {item.status === 'done' || regUrl.test(item.url) ? (
                    <div class={'image-content'}>
                      <div class="image" onClick={() => previewImg(item, i)}>
                        <AImage
                          preview={true}
                          src={item.url}
                          fallback={defaultFallback}
                        ></AImage>
                      </div>
                      {props.closable && (
                        <CloseOutlined onClick={() => deleteImage(item, i)} />
                      )}
                    </div>
                  ) : (
                    <Progress
                      percent={percent}
                      width={70}
                      type={'circle'}
                      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                      size={'small'}
                    />
                  )}
                </div>
              ) as any;
              if (props.renderItem) {
                return props.renderItem(ImageNode, item, i);
              } else {
                return <ImageNode />;
              }
            })}
          </AImage.PreviewGroup>

          <Uploader
            accept={props.accept}
            directory={props.directory}
            multiple={props.multiple}
            fileList={images.value}
            listType="text"
            showUploadList={false}
            disabled={props.disabled}
            beforeUpload={handleBeforeUpload}
            metadata={getImageFileInfo}
            onChange={handleChange}
            uploadFile={props.uploadFile}
          >
            {images.value.length >= props.limit || uploading.value
              ? null
              : slots.default?.() || (
                  <div
                    class={'image-box image-box-upload'}
                    style={{
                      width: handleCompany(props.view.width),
                      height: handleCompany(props.view.height),
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div class="ant-upload-text">{props.text}</div>
                    </div>
                  </div>
                )}
          </Uploader>
        </div>
      );
    };
  },
});
