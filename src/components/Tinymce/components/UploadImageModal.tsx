import { defineComponent, ref, unref } from 'vue';
import { Modal, message } from 'ant-design-vue';
import ImageUploader, { ImageFile } from '../../ImageUploader/ImageUploader';
export default defineComponent({
  props: {
    ...Modal.props,
    onSave: Function as PropType<(value: any) => void>,
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif',
    },
    limit: {
      type: Number,
      default: 15,
    },
    maxSize: Number,
  },
  emits: ['update:visible', 'save'],
  setup(props, { emit }) {
    const files = ref([]);

    const onCancel = () => {
      emit('update:visible', false);
    };
    const onOk = () => {
      if (unref(files).length <= 0) {
        message.warning('请上传图片!');
        return;
      }
      const uploaded = unref(files).every(
        (item: any) => item.status === 'done',
      );
      if (!uploaded) {
        // 还没上传完成
        message.warning('请等待图片上传完成!');
        return;
      }
      const commitData = unref(files).map((file: ImageFile) => {
        return {
          url: file.url,
          width: file.width,
          height: file.height,
        };
      });
      emit('update:visible', false);
      files.value = [];
      props.onSave?.(commitData);
    };
    return () => {
      return (
        <Modal
          {...props}
          title="插件/编辑图片"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onOk}
        >
          <ImageUploader
            {...props}
            accept={props.accept}
            limit={props.limit}
            maxSize={props.maxSize}
            v-model={[files.value, 'value']}
          />
        </Modal>
      );
    };
  },
});
