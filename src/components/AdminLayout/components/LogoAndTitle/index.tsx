import { VNode, defineComponent } from 'vue';
import { useLayoutContext } from '../../Context';

export default defineComponent({
  name: 'LogoAndTitle',
  setup(props) {
    const context = useLayoutContext();
    return () => {
      const {
        logo,
        settings: { title },
      } = context;
      let logoDom: VNode | null = null;
      if (typeof logo === 'string') {
        logoDom = (<img src={logo} alt="logo" />) as VNode;
      } else if (logo !== undefined) {
        logoDom = logo as VNode;
      }
      return (
        <a>
          {logoDom}
          {!context.collapsed && title ? <h1>{title}</h1> : null}
        </a>
      );
    };
  },
});
