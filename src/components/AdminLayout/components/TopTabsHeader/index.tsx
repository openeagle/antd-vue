import { defineComponent, isVNode, VNode } from 'vue';
import { Tabs } from 'ant-design-vue'
import { useLayoutContext } from '../../Context';
import Header from '../Header';
import { TopTabs } from '../../typings';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import isUrl from '../../utils/isUrl';
import isImg from '../../utils/isImg';

export default defineComponent({
  name: 'GlobalHeader',
  inheritAttrs: false,
  setup(props, { attrs }) {
    const context = useLayoutContext();
    return () => {
      const { class: attrClass, style, ...restAttrs } = attrs as any;
      const { prefixCls, topTabs = [], activeTabsKey, tapItemContentRender, rightContentRender, onTopTabsClick } = context;
      const { topTabsIcon, iconScriptUrl } = context.settings
      const baseClassName = `${prefixCls}-global-header`;
      const tabClassName = `${prefixCls}-global-top-tabs-header`
      const tabPaneClassName = `${prefixCls}-global-top-tabs-pane`;

      const IconFont = createFromIconfontCN({
        scriptUrl: iconScriptUrl,
      });

      const getIcon = (icon?: string | VNode, iconPrefixes = 'icon-'): VNode | null => {
        if (typeof icon === 'string' && icon !== '') {
          if (isUrl(icon) || isImg(icon)) {
            return (
              <img
                src={icon}
                alt="icon"
                class={`${prefixCls}-sider-menu-icon`}
              />
            ) as VNode;
          }
          if (icon.startsWith(iconPrefixes)) {
            return (<IconFont type={icon} />) as VNode;
          }
        }
        if (isVNode(icon)) {
          return icon;
        }
        return null;
      };

      const renderTabContent = (item: TopTabs) => {
        return <div class={[tabPaneClassName]}>
          {item.icon && topTabsIcon ? getIcon(item.icon) : null}
          {item.text}
        </div>
      }

      const renderTabItem = (item: TopTabs) => {
        return <Tabs.TabPane key={item.key}>
          {{
            tab: () => {
              return typeof tapItemContentRender === 'function' ? tapItemContentRender(context, item) : renderTabContent(item)
            }
          }}
        </Tabs.TabPane>
      }
      return (
        <Header>
          <div {...restAttrs} class={[baseClassName, attrClass]} style={style}>
            <Tabs class={[tabClassName]} activeKey={activeTabsKey} onTabClick={(key: any) => {
              const clickIndex = topTabs.findIndex(item => item.key === key)
              onTopTabsClick(topTabs[clickIndex] || {})
            }}>
              {{
                default: () => topTabs.map(item => renderTabItem(item)),
                rightExtra: () => {
                  return typeof rightContentRender === 'function'
                    ? rightContentRender(context)
                    : null
                }
              }}
            </Tabs>
          </div>
        </Header>
      );
    };
  },
});
