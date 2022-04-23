import { PropType, defineComponent, watch, reactive } from 'vue';
import ImageUploader, { ImageFile, ImageUploaderProps } from '../ImageUploader';

const { value, onChange, ...imageUploaderProps } = ImageUploaderProps;

export const URLImageUploaderProps = {
  ...imageUploaderProps,
  value: {
    type: Array as PropType<string[]>,
    default: [],
  },
  withMetadata: {
    type: Boolean,
    default: false,
  },
  onChange: Function as PropType<(files: string[]) => void>,
};

const urlsToImages = (urls: string[]) => {
  return urls.map(
    (url, index): ImageFile => {
      return {
        id: String(index),
        uid: String(index),
        name: url,
        size: 0,
        type: '',
        status: 'done',
        thumbUrl: '',
        url,
        width: 0,
        height: 0,
      };
    },
  );
};

export default defineComponent({
  name: 'URLImageUploader',
  props: URLImageUploaderProps,
  emits: ['update:value'],
  setup(props, { emit, slots }) {
    const state = reactive({
      current: props.value,
      images: urlsToImages(props.value),
    });
    watch(
      () => props.value,
      () => {
        if (props.value !== state.current) {
          state.images = urlsToImages(props.value);
          state.current = props.value;
        }
      },
    );
    const handleChange = (files: ImageFile[], file: ImageFile) => {
      state.images = files;
      if (file.status === 'done' || file.status === 'removed') {
        const urls = files
          .filter((file) => file.status === 'done' && file.url)
          .map((file) => {
            if (
              props.withMetadata &&
              file.url?.indexOf('w=') < 0 &&
              file.width > 0 &&
              file.height > 0
            ) {
              return `${file.url}${file.url.indexOf('?') >= 0 ? '&' : '?'}w=${
                file.width
              }&h=${file.height}`;
            }
            return file.url;
          });
        state.current = urls;
        emit('update:value', urls);
        if (props.onChange) {
          props.onChange(urls);
        }
      }
    };
    return () => {
      const { value, withMetadata, onChange, ...restProps } = props;
      return (
        <ImageUploader
          {...restProps}
          directory={false}
          multiple={false}
          errorReserve={false}
          value={state.images}
          onChange={handleChange}
          v-slots={slots}
        />
      );
    };
  },
});
