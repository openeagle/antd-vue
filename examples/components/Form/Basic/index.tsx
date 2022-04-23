import { defineComponent } from 'vue';
import { BasicForm } from '@/index';
import { useForm } from '@/components/Form';
import { schemas } from './data';
import { message } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const [register, { validate, setProps }] = useForm({
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 10,
      },
      schemas: schemas,
      actionColOptions: {
        offset: 8,
      },
      submitButtonOptions: {
        text: '提交',
      },
      submitFunc: customSubmitFunc,
    });
    console.log(1111111111111111111);
    console.log(register);
    async function customSubmitFunc() {
      try {
        await validate();
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        });
        setTimeout(() => {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          message.success('提交成功！');
        }, 2000);
      } catch (error) {
        // ignore
      }
    }
    return () => {
      return (
        <BasicForm
          schemas={schemas}
          labelWidth="100"
          actionColOptions={{ span: 24 }}
        >
          basic
        </BasicForm>
      );
    };
  },
});
