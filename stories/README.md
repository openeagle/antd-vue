## 组件结构

### Canvas Tab

该页签是组件使用事例，可以通过 Controls 实时动态更改组件属性，与组件进行交互。

Storybook Controls 为我们提供了一个图形用户界面，可以动态地与一个组件的参数进行交互，而不需要编写代码。它在我们的组件实例旁边创建了一个附加面板，所以可以实时编辑它们。

那怎么生成 Canvas ？

以 AddressDetail 组件为例，分别新建 `AddressDetail.mdx` 和 `AddressDetail.stories.tsx`，

`tsx` 文件就是我们写组件事例的文件，`mdx` 文件是写对应的组件文档。

`AddressDetail.stories.tsx` 内容如下：

```typescript
import { AddressDetail } from '@/index';
import { reactive, ref } from 'vue';
import mdx from './AddressDetail.mdx';


export default {
  title: '组件/AddressDetail',
  component: AddressDetail,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      page: mdx,
    },
    actions: {
      disabled: true,
    },
  },
  argTypes: {
    value: {
      description: ' 指定选中项  ',
      control: { type: 'object' },
      table: {
        defaultValue: '',
      },
    },
    accuracy: {
      description: '精度，根据精度的不同显示不同级别的选择器 ',
      control: { type: 'select' },
      defaultValue: 'area',
      options: ['area', 'city', 'province'],
      table: {
        defaultValue: { summary: 'area' },
      },
    },
    maxlength: {
      description: '详细地址的最大长度',
      control: { type: 'number', min: 1 },
      defaultValue: 30,
    },
  },
};


export const Basic: any = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  setup(props: any) {
    const selectValue = reactive({});
    return () => {
      return (
        <div>
          <AddressDetail
            key={JSON.stringify(props)}
            v-model={[selectValue, 'value']}
            accuracy={props.accuracy}
            maxlength={props.maxlength}
          />
          填写的值：{JSON.stringify(selectValue)}
        </div>
      );
    };
  },
});

```

default 中  `parameters` 内容主要是设置 页面上的配置，`argTypes`声明组件需要哪些属性。 `argTypes`就是声明 Controls 上的内容。

![image-20210715233336396](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210715233336396.png)

Controls  配置提供了许多配置类型，具体可以看官方文档 https://storybook.js.org/docs/vue/essentials/controls

### Docs Tab

文档页，就是介绍组件的使用细节及 API，目前该页面的结构约定是这样的

1.组件说明

2.组件 API

3.组件的详细事例

该页面主要是使用 MD 语法，StoryBook 也提供了我们多个丰富 md 内容，具体内容可以看官方文档：https://storybook.js.org/docs/vue/writing-docs/doc-blocks

以` AddressDetail` 组件为例，下面是最终生成的页面：



![image-20210715234248193](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210715234248193.png)

![image-20210715234906575](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210715234906575.png)

![image-20210715234912071](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210715234912071.png)