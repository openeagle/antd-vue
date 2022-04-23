import { defineComponent, ref } from 'vue';
import { useLayoutContext } from '../../Context';
import LogoAndTitle from '../LogoAndTitle';
import BaseMenu from '../BaseMenu';
import Header from '../Header';

// TODO: 移植 rc-resize-observer
const RightContent = defineComponent({
  name: 'RightContent',
  setup(props, { slots }) {
    const rightSize = ref<number | string>('auto');
    return () => {
      return (
        <div
          style={{
            minWidth: rightSize.value,
          }}
        >
          <div
            style={{
              paddingRight: '8px',
            }}
          >
            {slots.default?.()}
          </div>
        </div>
      );
    };
  },
});

export default defineComponent({
  name: 'TopNavHeader',
  inheritAttrs: false,
  props: {
    prefixCls: String,
  },
  setup(props, { attrs }) {
    const context = useLayoutContext();
    return () => {
      const { class: attrClass, style, ...restAttrs } = attrs as any;
      const {
        settings: { contentWidth },
        rightContentRender,
        onMenuHeaderClick,
      } = context;
      const baseClassName = `${context.prefixCls}-top-nav-header`;
      return (
        <Header>
          <div
            {...restAttrs}
            class={[
              baseClassName,
              {
                light: context.settings.navTheme === 'light',
              },
              attrClass,
            ]}
            style={style}
          >
            <div
              class={`${baseClassName}-main ${
                contentWidth === 'Fixed' ? 'wide' : ''
              }`}
            >
              <div
                class={`${baseClassName}-main-left`}
                onClick={onMenuHeaderClick}
              >
                <div class={`${baseClassName}-logo`} id="logo">
                  <LogoAndTitle />
                </div>
              </div>
              <div style={{ flex: 1 }} class={`${baseClassName}-menu`}>
                <BaseMenu />
              </div>
              {typeof rightContentRender === 'function' ? (
                <RightContent>{rightContentRender(context)}</RightContent>
              ) : null}
            </div>
          </div>
        </Header>
      );
    };
  },
});
