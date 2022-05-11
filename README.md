# @openeagle/antd-vue

基于 ant-design-vue 封装的中后台公共库。

## 技术栈

- 依赖管理：[yarn](https://classic.yarnpkg.com/en/)
- 开发框架：vue@3.x
- 组件库：ant-design-vue@2.x
- 工具函数

  - 数值计算：number-precision@1.x
  - 数值格式化：accounting@0.x
  - 日期格式化：moment@2.x

## 项目结构

```
.
├── examples                                # 示例代码
├── public                                  # 示例入口
├── src                                     # 源代码
│   ├── components                          # 组件
│   ├── styles                              # 样式
│   │   ├── mixins                          # 样式 mixins
│   │   ├── themes                          # 样式主题
│   │   ├── index.less                      # 基础样式（集成了 ant-design-vue 样式）
│   │   └── index.ts                        # 基础样式导出模块
│   ├── utils                               # 工具函数
│   ├── index.ts                            # 源代码模块导出
│   └── style.ts                            # 源代码样式导出
├── stories                                 # Sotrybook
├── .browserslistrc                         # 兼容配置
├── .editorconfig                           # 编辑器配置
├── .eslintrc.js                            # ESLint 配置
├── .prettierrc                             # Prettier 配置
├── README.md                               # 项目说明
├── babel.config.js                         # 编译配置
├── package.json                            # 项目配置
├── tsconfig.json                           # TS 配置
├── vue.config.js                           # Vue 配置
└── yarn.lock                               # 依赖版本锁
```

### 组件结构

```
.
└── src/components/Button                   # 组件目录
    ├── style                               # 组件样式
    │   ├── index.less                      # 组件样式源码
    │   └── index.ts                        # 组件样式导出（包含了 src/styles 下的基础样式，适用于动态加载）
    ├── Button.tsx                          # 组件源码
    └── index.ts                            # 组件导出（包含 vue 插件注册代码）
```

## 编码规范

- Git 提交规范：https://www.conventionalcommits.org/zh-hans/v1.0.0/

  ps：需要严格按照提交规范执行，最终发布版本会以提交记录里的 feat、fix 和 BREAKING CHANGE 决定要升级的版本号。

  - fix：升级 x.y.z 的小版本号 z
  - feat：升级 x.y.z 的中间版本号 y
  - BREAKING CHANGE：升级 x.y.z 的主版本号 x

- Git 分支规范：

  - master：主分支，用于发布模块的正式版本 x.x.x
  - beta：预发分支，用于发布模块的预发版本 x.x.x-beta.x
  - alpha：测试分支，用于发布模块的测试版本 x.x.x-alpha.x
  - feature/x.x.x：版本分支
  - feature/xxx：功能分支

  开发新版本的时候建立对应版本的 feature/x.x.x 分支，多人协同时需要建立各自负责功能的分支 feature/xxx，开发完成后合并到版本分支 feature/x.x.x，发布测试和预发时将版本分支合并到 alpha 或 beta，然后执行 `npm run release`。如果发布正式版本 x.x.x，需要对应项目负责人将版本分支 feature/x.x.x 合并到 master，然后执行 `npm run release`。

- 编码规范

  - JS：ESLint + Prettier
  - CSS：遵循 [BEM](http://getbem.com/) 规范命名 CSS 选择器，尽量少用后代选择器。

## 开发说明

1. 切换到当前开发的版本分支：feature/x.x.x
2. 如果有多人协同开发，建议建立对应的功能分支 feature/xxx
3. 按照编码规范和 Git 提交规范调整项目，然后合并和提交到对应的版本分支

ps：为了实现组件的动态加载，需要维护 [babel-plugin-import.js](./babel-plugin-import.js)。

### 代码示例

```shell
$ yarn run serve
```

### Storybook

```shell
$ yarn run storybook
```

## 发布说明

- 测试和预发

  1. 合并版本分支 feature/x.x.x 到 alpha 或 beta

     ps：目前只用 beta 就好。

  2. 执行发布命令 `npm run release`

- 正式发布

  1. 联系项目负责人，将版本分支 feature/x.x.x 合并到 master
  2. 执行发布命令 `npm run release`

### 工具

markdown table generate
https://www.tablesgenerator.com/markdown_tables
