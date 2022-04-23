import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from '@vue/runtime-core';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import Uploader from '../Uploader';

export interface VideoFile {
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
  duration: number;
  bitrate: number;
}

export interface VideoFileInfo {
  width: number;
  height: number;
  duration: number;
}

export const getVideoFileInfo = (file: File): Promise<VideoFileInfo> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.style.display = 'none';
    video.addEventListener('canplay', () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      });
    });
    video.addEventListener('error', (e) => {
      reject(new Error(''));
    });
    video.src = URL.createObjectURL(file);
  });
};

export const VideoUploaderProps = {
  /**
   * 支持的图片格式
   */
  accept: {
    type: String,
    default: '.mp4',
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
   * 支持同时上传多张视频
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 最大视频大小
   */
  maxSize: Number,
  /**
   * 最小视频大小
   */
  minSize: Number,
  /**
   * 最大视频宽度
   */
  maxWidth: Number,
  /**
   * 最小视频宽度
   */
  minWidth: Number,
  /**
   * 最大视频高度
   */
  maxHeight: Number,
  /**
   * 最小视频高度
   */
  minHeight: Number,
  /**
   * 视频分辨率
   */
  resolution: Object as PropType<{
    width: number;
    height: number;
  }>,
  text: {
    type: String,
    default: '上传视频',
  },
  validate: Function as PropType<(file: VideoFile) => Promise<string>>,
  value: {
    type: Array as PropType<VideoFile[]>,
    default: [],
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  onChange: Function as PropType<(files: VideoFile[], file: VideoFile) => void>,
};

const formatFileSize = (size: number) => {
  if (size >= 1024) {
    return `${Math.floor((size / 1024) * 10) / 10} MB`;
  }
  return `${size} KB`;
};

export default defineComponent({
  name: 'OpeneagleVideoUploader',
  props: VideoUploaderProps,
  setup(props, { emit, slots }) {
    const videos = ref(props.value);
    const uploading = computed(() => {
      return props.value?.some((file) => file.status === 'uploading');
    });
    watch(
      () => props.value,
      () => {
        if (props.value !== videos.value) {
          videos.value = props.value;
        }
      },
    );
    const handleBeforeUpload = (file: any, fileList: any) => {
      let errorMessage = '';
      const fileExtension = `.${file.type.split('/')[1]}`;
      if (props.accept.indexOf(fileExtension) < 0) {
        errorMessage = `请上传正确格式的视频  ${props.accept}`;
      }
      const fileSize = file.size / 1024;
      if (props.maxSize && fileSize > props.maxSize) {
        errorMessage = `视频不可大于 ${formatFileSize(props.maxSize)}!`;
      }
      if (props.minSize && fileSize > props.minSize) {
        errorMessage = `视频不可小于 ${formatFileSize(props.minSize)}!`;
      }
      if (errorMessage) {
        message.error(errorMessage);
        return false;
      } else if (
        props.validate ||
        props.resolution ||
        props.maxWidth ||
        props.minHeight ||
        props.maxHeight ||
        props.minHeight
      ) {
        return getVideoFileInfo(file)
          .then((imageFileInfo: VideoFileInfo) => {
            const { height, width } = imageFileInfo;
            if (
              props.resolution &&
              props.resolution.width &&
              props.resolution.height &&
              (props.resolution.width !== width ||
                props.resolution.height !== height)
            ) {
              return `视频尺寸不符合：${props.resolution.width}*${props.resolution.height}px`;
            }
            if (props.minHeight && height < props.minHeight) {
              return `视频尺寸高度须大于等于 ${props.minHeight}`;
            }
            if (props.maxHeight && height > props.maxHeight) {
              return `视频尺寸高度须小于等于 ${props.maxHeight}`;
            }
            if (props.minWidth && width < props.minWidth) {
              return `视频尺寸宽度须大于等于 ${props.minWidth}`;
            }
            if (props.maxWidth && width > props.maxWidth) {
              return `视频尺寸宽度须小于等于 ${props.maxWidth}`;
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
        const newValue = videos.value.slice(0);
        let matchedIndex = -1;
        for (let index = 0; index < videos.value.length; index++) {
          const item = videos.value[index];
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
              ...videos.value[matchedIndex],
              status: file.status,
              percent: file.percent,
            };
            if (file.status === 'done' && file.response) {
              newFile = {
                ...newFile,
                id: file.response.fileId,
                url: file.response.url,
                thumbUrl: `${file.response.url}?vframe/jpg/offset/1`,
                width: file.response.meta?.width || 0,
                height: file.response.meta?.height || 0,
                duration: file.response.meta?.duration || 0,
                bitrate: file.response.meta?.bitrate || 0,
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
        videos.value = newValue;
        emit('update:value', newValue, newFile);
        if (props.onChange) {
          props.onChange(newValue, newFile);
        }
      }
    };
    return () => {
      return (
        <Uploader
          accept={props.accept}
          directory={props.directory}
          multiple={props.multiple}
          fileList={videos.value}
          listType="picture-card"
          beforeUpload={handleBeforeUpload}
          disabled={props.disabled}
          metadata={getVideoFileInfo}
          onChange={handleChange}
        >
          {videos.value.length >= props.limit || uploading.value
            ? null
            : slots.default?.() || (
                <div>
                  <PlusOutlined />
                  <div class="ant-upload-text">{props.text}</div>
                </div>
              )}
        </Uploader>
      );
    };
  },
});
