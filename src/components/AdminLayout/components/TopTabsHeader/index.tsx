import { defineComponent, isVNode, VNode } from 'vue';
import { Tabs } from 'ant-design-vue'
import { useLayoutContext } from '../../Context';
import Header from '../Header';
import RouterTabs from '../RouterTabs';
import { LayoutContextProps, TopTabs } from '../../typings';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import isUrl from '../../utils/isUrl';
import isImg from '../../utils/isImg';


class TabsUtils {
  props: LayoutContextProps
  IconFont: any
  tabClassName: string
  tabPaneClassName: string

  constructor(props: LayoutContextProps) {
    const { prefixCls } = props;
    this.props = props;
    this.IconFont = createFromIconfontCN({
      scriptUrl: props.settings.iconScriptUrl,
    });
    this.tabClassName = `${prefixCls}-global-top-tabs-header`;
    this.tabPaneClassName = `${prefixCls}-global-top-tabs-pane`;
  }

  getIcon = (icon?: string | VNode, iconPrefixes = 'icon-'): VNode | null => {
    if (typeof icon === 'string' && icon !== '') {
      if (isUrl(icon) || isImg(icon)) {
        return (
          <img
            src={icon}
            alt="icon"
            class={`${this.props.prefixCls}-sider-menu-icon`}
          />
        ) as VNode;
      }
      if (icon.startsWith(iconPrefixes)) {
        const IconFont = this.IconFont;
        return (<IconFont type={icon} />) as VNode;
      }
    }
    if (isVNode(icon)) {
      return icon;
    }
    return null;
  };
  // onTopTabsClick
  renderTabContent(item: TopTabs) {
    const topTabsIcon = this.props.settings.topTabsIcon
    return <div class={[this.tabPaneClassName]}>
      {item.icon && topTabsIcon ? this.getIcon(item.icon) : null}
      {item.text}
    </div>
  }
  renderTabItem(item: TopTabs) {
    const { tapItemContentRender } = this.props
    return <Tabs.TabPane key={item.key}>
      {{
        tab: () => {
          return typeof tapItemContentRender === 'function' ? tapItemContentRender(this.props, item) : this.renderTabContent(item)
        }
      }}
    </Tabs.TabPane>
  }

  getTabsPan(topTabs: TopTabs[]) {
    const { rightContentRender } = this.props
    return <Tabs class={[this.tabClassName]} onTabClick={(key: any) => {
      const clickIndex = topTabs.findIndex(item => item.key === key)
      this.props.onTopTabsClick(topTabs[clickIndex] || {})
    }}>
      {{
        default: () => topTabs.map(item => this.renderTabItem(item)),
        rightExtra: () => {
          return typeof rightContentRender === 'function'
            ? rightContentRender(this.props)
            : null
        }
      }}
    </Tabs>
  }

}

export default defineComponent({
  name: 'GlobalHeader',
  inheritAttrs: false,
  setup(props, { attrs }) {
    const context = useLayoutContext();
    const tabsUtils = new TabsUtils(context);
    return () => {
      const { class: attrClass, style, ...restAttrs } = attrs as any;
      const { prefixCls, topTabs = [] } = context;
      const baseClassName = `${prefixCls}-global-header`;
      return (
        <Header>
          <div {...restAttrs} class={[baseClassName, attrClass]} style={style}>
            {tabsUtils.getTabsPan(topTabs)}
          </div>
        </Header>
      );
    };
  },
});
