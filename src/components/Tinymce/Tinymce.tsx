import { defineComponent, onMounted, reactive, ref, unref, watch } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import { editorProps } from '@tinymce/tinymce-vue/lib/cjs/main/ts/components/EditorPropTypes';
import config from '../../config';
import { plugins, toolbar } from './type';
import { zhLang } from './zh.lang';
import UploadImageModal from './components/UploadImageModal';
import UploadVideoModal from './components/UploadVideoModal';

export default defineComponent({
  name: 'OpeneagleTinymce',
  props: {
    ...editorProps,
    toolbar: {
      type: Array as PropType<string[]>,
      default: toolbar,
    },
    plugins: {
      type: Array as PropType<string[]>,
      default: plugins,
    },
    value: String,

    onChange: Function as PropType<(value: any) => void>,
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const content = ref(props.value);
    const showUploadImage = ref(false);
    const showVideoImage = ref(false);
    let globalEditor = reactive<any>({});

    const defaultInit = {
      menubar: '',
      language: 'zh_CN',
      openeagle_image_options: {
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
      openeagle_video_options: {
        accept: {
          type: String,
          default: '.mp4',
        },
        limit: {
          type: Number,
          default: 15,
        },
        maxSize: Number,
      },
      // media_live_embeds: true,
    };
    const onSetup = (editor: any) => {
      props.init?.setup?.(editor);
      // @ts-ignore
      tinyMCE.addI18n('zh_CN', zhLang);

      editor.ui.registry.addButton('openeagle/image', {
        icon: 'image',
        tooltip: '插入/编辑图片',
        onAction: function() {
          showUploadImage.value = true;
          globalEditor = editor;
        },
      });
      editor.ui.registry.addButton('openeagle/video', {
        icon: 'embed',
        tooltip: '插入/编辑视频',
        onAction: function() {
          showVideoImage.value = true;
          globalEditor = editor;
        },
      });
    };

    watch(content, () => {
      emit('update:value', unref(content));
      props.onChange?.(unref(content));
    });

    watch(
      () => props.value,
      () => {
        if (props.value) {
          content.value = props.value;
        }
      },
    );

    const onFileUploadChange = (files: any = []) => {
      console.log(files);
      const _hmtl: any = [];
      files.forEach((file: any) => {
        _hmtl.push(
          `<img alt="" src="${file.url}" height="${file.height}" width="${file.width}"/>`,
        );
      });
      globalEditor.insertContent(_hmtl.join());
    };
    const onUploadVideoChange = (files: any = []) => {
      const _hmtl: any = [];
      files.forEach((file: any) => {
        _hmtl.push(
          `<video controls alt="" src="${file.url}" height="${file.height}" width="${file.width}"></video>`,
        );
      });
      globalEditor.insertContent(_hmtl.join());
    };
    return () => {
      return (
        <div>
          <Editor
            v-model={[content.value, 'modelValue']}
            {...props}
            init={{ ...defaultInit, ...props.init, setup: onSetup }}
            tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@5.8.1/tinymce.min.js"
          />

          <UploadImageModal
            {...props.init.openeagle_image_options}
            v-model={[showUploadImage.value, 'visible']}
            onSave={onFileUploadChange}
          />
          <UploadVideoModal
            {...props.init.openeagle_video_options}
            v-model={[showVideoImage.value, 'visible']}
            onSave={onUploadVideoChange}
          />
        </div>
      );
    };
  },
});
