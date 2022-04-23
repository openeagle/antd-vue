### 为什么要使用Storybook？

在前端业务的开发中，我们可能会封装很多公共组件。大部分时候因为忙于业务开发，并不会为这些公共组件进行文档编写、测试。在进行复用的时候，需要在项目中查看源码去查看该组件的作用、参数和事件。这种组件开发的方式在前端项目规模不大的时候还能接受，但当项目到达一定规模后，一般会存在以下问题：

1. **重复造轮子**：因为没有统一的组件展示，其他开发者会不清楚组件已经在项目中实现，出现重复造轮子的现象。

2. **组件通用性不强**：组件和项目逻辑强耦合，导致重复利用率不高。
3. **不知道如何使用**：没有组件文档的存在，其他开发者需要去查看源码弄明白组件有哪些 `event` 和 `props`。增加了组件的使用难度

![image-20210704103349621](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210704103349621.png)



这些问题可以通过在项目中引入Storybook来解决，它是一个用于组件开发、测试和文档编写的开源工具，并支持Vue、React、Angular等主流框架。

在项目中引入Storybook可以帮助我们设计出通用性更强的组件，并轻松实现像Element、AntDesign那样的结构化组件文档。

### 自动安装

Storybook官方提供了npx的自动安装模式

```bash
npx sb init
```



上面的命令会对本地环境进行以下更改：

* 安装所需的依赖项
* 设置必要的脚本来运行和构建Storybook

*  添加默认的 Storybook 配置。

在安装完成后，项目中多出了两个文件夹 `.storybook` 和 `stories`

### 运行

```bash
npm run storybook
```

启动Storybook，默认会在localhost: 6006



### Storybook的基础知识

#### 1. 配置文件 - main.js

```javascript
module.exports = {
 stories: [
  '../stories/**/*.stories.mdx',
  '../stories/**/*.stories.@(js|jsx|ts|tsx)',
 ],
 addons: [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-viewport',
  '@storybook/addon-actions',
  '@storybook/addon-docs',
 ]}
```

`.storybook/main.js` 是Storybook的配置文件，主要的配置是`stories`和`addons`。更多的配置你可以查看文档 [https://storybook.js.org/docs/vue/configure/overview](https://storybook.js.org/docs/vue/configure/overview)

`stories` 用来描述你的故事相对于配置文件的位置。

`addons` 用来描述你需要引入的插件。官方地址：https://storybook.js.org/addons/



#### 2. 插件-Addons

![image-20210704110220096](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210704110220096.png)



上图storybook官方提供的[插件](https://link.zhihu.com/?target=https%3A//storybook.js.org/addons/)，例如`@storybook/addon-links` 用来创建storybook中的链接关系，`@storybook/addon-docs` 提供了开箱即用的组件文档。在社区里面也有很多其非官方的插件。

要使用Addons首先要进行安装，以`@storybook/addon-links`为例：

```bash
npm install -D @storybook/addon-links
```

在`.storybook/main.js`中添加插件

```javascript
module.exports = {
 addons: [
  '@storybook/addon-links'
 ]}
```

在你的stories中使用插件

```javascript
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'Button',
};

export const first = () => <button onClick={linkTo('Button', 'second')}>Go to "Second"</button>;
export const second = () => <button onClick={linkTo('Button', 'first')}>Go to "First"</button>;
```



要熟练使用新版本Storybook，一定要理解一个术语：Component Story Format(CSF)，这是Storybook在5.2版本引入的一种采用ES6 modules去编写stories的方式，在官方文档中，CSF被反复的提及。为了更好的理解story和CSF的关系，我们来看一下官方提供的 `Button.stories.js`。

```javascript
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from './MyButton';

export default {
  title: 'Button',
  component: MyButton,
};

export const Text = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') },
});

export const Jsx = () => ({
  components: { MyButton },
  render(h) {
    return <my-button onClick={this.action}>With JSX</my-button>;
  },
  methods: { action: linkTo('clicked') },
});

export const Emoji = () => ({
  components: { MyButton },
  template: '<my-button @click="action">       </my-button>',
  methods: { action: action('clicked') },
});
```

这是一个十分典型的`stories.js`，`export default`定义了这是一个名为`Button`，展示`Mybutton` 组件的 story 文件。**需要注意的是，该对象的\**`title`\** 是侧边栏中的标题，组件内`title`不能重复。**

```powershell
export default {
  title: 'Button',
  component: MyButton,
};
```

三个`export const`定了三个story，分别对应的是侧边栏中的Text、Jsx、Emoji。



![image-20210704112330298](C:\Users\86153\AppData\Roaming\Typora\typora-user-images\image-20210704112330298.png)

看到这里你大概明白到底什么是story了：**story是一个代码片段，它已特定状态呈现该组件的示例。**而CSF，就是**ES6的Modules语法去编写 \**`.stories.js`\**的一种格式**。



### 添加自定义webpack配置

如果我们在组件中使用 less、sass等css语法，在启动storybook后就会出现报错，因为storybook的并不能使用项目中的webpack配置，我们需要在`.storybook/main.js`中添加`scss-loader`的配置。

在`.storybook/main.js`中添加自定义webpack配置的字段是`webpackFinal`。下面是我们项目增加能 less 的配置：

```javascript
const path = require('path');

module.exports = {
  stories: [],
  addons: [],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      exclude: /\.module\.less$/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../stories'),
      ],
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.module\.less$/,
      include: path.resolve(__dirname, '../stories'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@stories': path.resolve(__dirname, '../stories'),
    };

    return config;
  },
};

```









