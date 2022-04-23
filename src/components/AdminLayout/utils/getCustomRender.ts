import { Slots } from 'vue';
import { CustomRender } from '../typings';

export default function getCustomRender(
  props: any,
  slots: Slots,
  name: string,
): CustomRender | false {
  const propRender = props[name];
  if (propRender === false) {
    return false;
  }
  if (propRender) {
    return propRender;
  }
  const slotVNode = slots[name || 'default'] as any;
  return slotVNode;
}
