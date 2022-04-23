import { PropType, VNode, defineComponent, inject } from 'vue';
import { Layout } from 'ant-design-vue';
import { useLayoutContext } from '../../Context';

export default defineComponent({
  name: 'OpeneagleAdminLayoutFooter',
  props: {
    links: [Array, Boolean] as PropType<
      | {
          key?: string;
          title: VNode;
          href: string;
          blankTarget?: boolean;
        }[]
      | boolean
    >,
    copyright: {
      type: Object as PropType<VNode>,
      default: 'openeagle 开源组件很努力的！',
    },
    prefixCls: String,
  },
  setup(props) {
    const context = useLayoutContext();
    return () => {
      const { prefixCls } = context;
      const baseClassName = `${prefixCls}-footer`;
      if (
        (props.links == undefined ||
          props.links === false ||
          (Array.isArray(props.links) && props.links.length === 0)) &&
        (props.copyright == null || props.copyright === undefined)
      ) {
        return null;
      }
      return (
        <Layout.Footer style={{ padding: 0 }}>
          <div class={baseClassName}>
            {Array.isArray(props.links) ? (
              <div class={`${baseClassName}-links`}>
                {props.links.map((link) => (
                  <a
                    key={link.key}
                    title={link.key}
                    target={link.blankTarget ? '_blank' : '_self'}
                    href={link.href}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            ) : null}
            {props.copyright ? (
              <div class={`${baseClassName}-copyright`}>{props.copyright}</div>
            ) : null}
          </div>
        </Layout.Footer>
      );
    };
  },
});
