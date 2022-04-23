import { useModal } from '../../../src';
import { Button } from 'ant-design-vue';
import { h } from 'vue';
import mdx from './useModal.mdx';

export default {
  title: 'API/useModal',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
  },
};
export const Basic: any = (args: any) => ({
  setup() {
    const Modal = useModal();

    const showModalInfo = () => {
      Modal.info({
        title: 'This is a notification message',
        content: h('div', {}, [
          h('p', 'some messages...some messages...'),
          h('p', 'some messages...some messages...'),
        ]),
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('');
            }, 1000);
          });
        },
      });
    };
    const showModalSuccess = () => {
      Modal.success({
        title: 'This is a success message',
        content: h('div', {}, [
          h('p', 'some messages...some messages...'),
          h('p', 'some messages...some messages...'),
        ]),
      });
    };

    const showModalError = () => {
      Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...',
      });
    };

    const showModalWarning = () => {
      Modal.warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...',
      });
    };

    const showModalComfirm = () => {
      Modal.confirm({
        title: '自定义图标',
        footerPosition: 'center',
        okText: 'loading',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('点击了loading');
              resolve('点击了loading');
            }, 1000);
          });
        },
      });
    };

    const showModalBtns = () => {
      Modal.confirm({
        width: 500,
        title: 'This is a warning message',
        content: 'some messages...some messages...',
        footerPosition: 'center',
        btns: [
          {
            btnText: 'default',
          },
          {
            btnText: 'primary',
            btnType: 'primary',
          },
          {
            btnText: 'danger',
            btnType: 'danger',
          },
          {
            btnText: 'dashed',
            btnType: 'dashed',
          },
        ],
      });
    };

    const showModalNoDestroy = () => {
      Modal.warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...',
        autoDestroy: false
      });
    };

    return () => {
      return (
        <>
          <Button type={'primary'} onClick={showModalInfo}>Info</Button>
          <Button type={'primary'} onClick={showModalSuccess} style={{ marginLeft: '20px' }}>Success</Button>
          <Button type={'primary'} onClick={showModalError} style={{ marginLeft: '20px' }}>Error</Button>
          <Button type={'primary'} onClick={showModalWarning} style={{ marginLeft: '20px' }}>Warning</Button>
          <Button type={'primary'} onClick={showModalComfirm} style={{ marginLeft: '20px' }}>Comfirm</Button>
          <Button type={'primary'} onClick={showModalBtns} style={{ marginLeft: '20px' }}>多个Button</Button>
          <Button type={'primary'} onClick={showModalNoDestroy} style={{ marginLeft: '20px' }}>离开不自动销毁Modal</Button>
        </>
      );
    };
  },
});
Basic.storyName = '基础用法';
