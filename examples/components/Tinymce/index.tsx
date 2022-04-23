import { defineComponent, reactive, ref, unref } from 'vue';
import { Card } from 'ant-design-vue';
import { Tinymce } from '@/index';

export default defineComponent({
  setup() {
    const loading = ref(true);
    const content = ref(
      '<p>你好呀<img src="http://www.longstudy.club/100/img34.png" alt=""  width="100%" /><video controls src="http://www.longstudy.club/100/img34.png" width="100%" height="auto" data-mce-src="http://www.longstudy.club/100/img34.png"></video></p>',
    );

    const onChange = (content: string) => {
      console.log(content);
    };

    setTimeout(() => {
      loading.value = false;
    }, 1000);
    return () => {
      return (
        <div>
          <Card title="基础事例" loading={unref(loading)}>
            <Tinymce
              v-model={[content.value, 'value']}
              onChange={onChange}
              init={{
                height: 400,
              }}
            />
            <p>当前文本值 ：{unref(content)}</p>
          </Card>
          <br />
          <Card
            title="上传文件限制(目前只支持文件大小，个数及接收类型)"
            loading={unref(loading)}
          >
            <Tinymce
              v-model={[content.value, 'value']}
              onChange={onChange}
              init={{
                height: 400,
                openeagle_image_options: {
                  accept: '.jpg,.jpeg',
                },
                openeagle_video_options: {
                  limit: 1,
                  maxSize: 1,
                },
              }}
            />
            <p>当前文本值 ：{unref(content)}</p>
          </Card>
        </div>
      );
    };
  },
});
