import { Modal, Button } from 'ant-design-vue';
import { onUnmounted, computed, ref, defineComponent, VNodeTypes, PropType } from 'vue';
import { ModalFuncProps } from 'ant-design-vue/es/modal/Modal';
import './index.less';

type btnType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger' | 'link';
type btnObjType = {
  btnText: VNodeTypes;
  btnType?: btnType;
  onClick?: () => any;
  props?: any;
}
interface useModalProps extends ModalFuncProps {
  cancelType?: btnType;
  btns?: btnObjType[];
  footer?: any;
  footerPosition?: 'left' | 'right' | 'center';
  autoDestroy?: boolean; // 路由变化时是否自动销毁
}
export default function useModal() {

  const ContentView = defineComponent({
    props: {
      btns: {
        type: Object as PropType<useModalProps['btns']>,
        default: []
      },
      footer: {},
      footerPosition: {
        type: String as PropType<useModalProps['footerPosition']>,
        default: 'right'
      },
      content: {},
      modalIndex: {
        type: Number,
        default: 0
      }
    },
    setup(props) {
      const submitLoading = ref(new Array(props.btns?.length || 0));
      const close = () => {
        modals[props.modalIndex].destroy();
      };
      const onClick = (index: number, item: btnObjType) => {
        submitLoading.value[index] = true;
        const activeFunc = item.onClick?.();
        if (activeFunc === false) { // onClick return false
          submitLoading.value[index] = false;
        } else if (activeFunc && activeFunc.then) { // onClick是promise
          return activeFunc.then((res: any) => {
            close();
            return res;
          })
            .finally(() => {
              submitLoading.value[index] = false;
            });
        } else  { // activeFunc == true | undefined
          close();
          submitLoading.value[index] = false;
        }
      };

      const btnDisable = computed(() => {
        // 有在loading的
        return props.btns && props.btns.length > 0
          ? props.btns.findIndex((item, index) => {
              return submitLoading.value[index];
            })
          : -1;
      });

      return () => {
        return (
          <>
            {props.content}
            {props.footer ? (
              props.footer
            ) : (
              <div class={`btn-boxs btn-boxs_${props.footerPosition}`}>
                {props.btns &&
                  props.btns.length > 0 &&
                  props.btns.map((item, index) => {
                    return (
                      <Button
                        type={item.btnType || 'default'}
                        onClick={() => {
                          onClick(index, item);
                        }}
                        disabled={
                          btnDisable.value !== -1 && btnDisable.value !== index // loding状态时禁用其他button
                        }
                        loading={submitLoading.value[index]}
                        {...item.props}
                      >
                        {item.btnText || '返回'}
                      </Button>
                    );
                  })}
              </div>
            )}
          </>
        );
      };
    },
  });

  let modals: {update: any; destroy:() => any; isDestroy: boolean}[] = [];
  onUnmounted(() => {
    for (let i = modals.length -1; i >= 0; i--) {
      const modal = modals[i];
      if (modal.isDestroy) {
        modal.destroy();
        modals.splice(i, 1)
      }
    }
    console.log('modals', modals)
  });
  const handleOptions = (options: useModalProps) => {
    const props: useModalProps = {
      btns:[
        { btnText: options.okText || '知道了',  btnType: options.okType ||  'primary', onClick: options.onOk, props: options.okButtonProps}
      ],
      footerPosition: 'right',
      closable: false,
      centered: true,
      autoDestroy: true,
      ...options
    }
    const {
      btns,
      footer,
      footerPosition,
      content
    } = props
    return {
      ...props,
      class: `openeagle_modal ${options.class}`,
      content: (
        <ContentView
          modalIndex={modals.length}
          btns={btns}
          footer={footer}
          footerPosition={footerPosition}
          content={content}
        ></ContentView>
      ),
    };
  }
  const funs = (options: useModalProps, funType: 'info' | 'success' | 'error' | 'warning' | 'confirm') => {
    const opts = handleOptions(options);
    const modal = Modal[funType](opts);
    modals.push( {
      update: modal.update,
      destroy: modal.destroy,
      isDestroy: opts.autoDestroy !== undefined ? opts.autoDestroy : true
    });
    return {
      update: modal.update,
      destroy: modal.destroy,
      options: opts,
    }
  }
  return {
    info: (options: useModalProps) => {
      return funs(options, 'info')
    },
    success: (options: useModalProps) => {
      return funs(options, 'success')
    },
    error: (options: useModalProps) => {
      return funs(options, 'error')
    },
    warning: (options: useModalProps) => {
      return funs(options, 'warning')
    },
    confirm: (options: useModalProps) => {
      return funs({
        btns:[
          { btnText: options.cancelText || '取消', btnType: options.cancelType, props: options.cancelButtonProps},
          { btnText: options.okText || '确定',  btnType: options.okType ||  'primary', onClick: options.onOk, props: options.okButtonProps}
        ],
        ...options,
      }, 'confirm')
    }
  };
}
