import { ComponentInternalInstance } from 'vue';

export function findComponentUpward(
  context: ComponentInternalInstance,
  componentName: string,
  componentNames?: any,
) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.parent;
  let name = parent?.type.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.parent;
    if (parent) name = parent.type.name;
  }
  return parent;
}

export function findComponentsDownward(
  context: ComponentInternalInstance,
  componentName: string,
): ComponentInternalInstance[] {
  const children = (context.slots?.default?.()[0]?.children as []) || [];
  return children.reduce((components, child: ComponentInternalInstance) => {
    if (child.type.name === componentName) components.push(child);
    const foundChild = findComponentsDownward(child, componentName);
    return components.concat(foundChild);
  }, [] as ComponentInternalInstance[]);
}

export function findBrothersComponents(
  context: ComponentInternalInstance,
  componentName: string,
  exceptMe = true,
) {
  const children = (context.parent?.slots?.default?.()[0].children as []) || [];
  const res: ComponentInternalInstance[] = children.filter(
    (item: ComponentInternalInstance) => {
      return item.type.name === componentName;
    },
  );
  const index = res.findIndex(
    (item: ComponentInternalInstance) => item.uid === context.uid,
  );
  if (exceptMe) res.splice(index, 1);
  return res;
}
