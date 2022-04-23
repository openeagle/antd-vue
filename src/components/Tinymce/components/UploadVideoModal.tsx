import { defineComponent, ref, unref } from 'vue';
import { Modal } from 'ant-design-vue';
import VideoUploader, { VideoFile } from '../../VideoUploader';
import { Item } from 'ant-design-vue/lib/vc-menu';
import { message } from 'ant-design-vue';
export default defineComponent({
  props: {
    ...Modal.props,
    accept: {
      type: String,
      default: '.mp4',
    },
    limit: {
      type: Number,
      default: 15,
    },
    maxSize: Number,
    onSave: Function as PropType<(value: any) => void>,
  },
  emits: ['update:visible', 'save'],
  setup(props, { emit }) {
    const files = ref([]);

    const onCancel = () => {
      emit('update:visible', false);
    };
    const onOk = () => {
      const uploaded = unref(files).every(
        (item: any) => item.status === 'done',
      );
      if (!uploaded) {
        // 还没上传完成
        message.warning('请等待视频上传完成!');
        return;
      }
      const commitData = unref(files).map((file: VideoFile) => {
        return {
          url: file.url,
          width: file.width,
          height: file.height,
        };
      });
      files.value = [];
      props.onSave?.(commitData);
      emit('update:visible', false);
    };
    return () => {
      return (
        <Modal
          {...props}
          title="插入/编辑视频"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onOk}
        >
          <VideoUploader
            v-model={[files.value, 'value']}
            accept={props.accept}
            limit={props.limit}
            maxSize={props.maxSize}
          />
        </Modal>
      );
    };
  },
});
