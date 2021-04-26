# start.umijs.org

在网页上自定义项目配置，生成 Umi 项目脚手架。

现有的 umi create 功能简单，只能选择很少的选项不能满足很多用户的需求。

![image](https://cdn.nlark.com/yuque/0/2021/png/84868/1619361125913-3b6f9e4a-c534-49b0-ab1f-ad9e4fcb099a.png?x-oss-process=image%2Fresize%2Cw_1434)

随着 umi 和 pro 的功能越来越多也需要一个更好的配置工具。类似智能想到提供更丰富的选择和预设。

## 调研

umi 现在已经提供了丰富的功能，有组件库研发，插件研发，pro 脚手架，还有海量的配置可以自定义，spring 也提供了类似的工具，[spring initializr](https://start.spring.io/) 可以帮助 java 用户快速的新建项目，并且提供各项的功能的配置。

![image](https://cdn.nlark.com/yuque/0/2021/png/84868/1619363396863-b8b8be85-e50c-4c53-89f2-a10562e21230.png?x-oss-process=image%2Fresize%2Cw_1436)

同样的在 umi 如果可以有这样的工具，将会更好的推广 umi 的功能， create-umi 有一周 1.4k 的下载量， create-react-app 有 140k，用户需求量还是蛮大的。

## Why？

1. 只做项目创建，功能需求更加聚焦。
2. Umi 用户技术可选，项目适用性更广。
3. 对于 Umi 关键性的配置能够提供良好 playground。
4. 能减轻 Umi 和 Pro 开源项目的维护成本。

## 基础功能

umi 提供了多种类型的引用开发， umi initializr 应该提供以下的功能：

- 一个极简的 umi 项目
- Pro 模板
- dumi 模板
- h5 模板
- plugin 模板

## 共有配置

| 配置名称    |   值类型   |      说明      | 默认值 |
| :---------- | :--------: | :------------: | :----: |
| name        |   string   |    项目名称    |  umi   |
| version     |   版本号   |     版本号     | 1.0.0  |
| description |   string   |    项目描述    |   -    |
| keywords    | 标签选择器 |  项目的关键字  |   -    |
| author      |   string   |   项目的作者   |   -    |
| license     |    选择    | 项目的 license |  ISC   |

待补充
