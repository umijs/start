# Contributing to umi start

## Set up

安装需要的依赖

```bash
$ yarn
```

## develop

启用开发服务，这会同时执行三个命令，分别是启动 web 端的开发服务（umi dev）、启动 node 端的编译服务(rollup)、启动 node 端的 express 服务(nodemon)。

```bash
$ yarn dev
```

## Build

1. 编译会将 web 端编译到 node 端的静态资源文件目录
2. 编译 node 端到 lib 目录

```bash
$ yarn build
```

## Deploy

只需要 `platforms/node/lib`、`platforms/node/www`、`platforms/node/serve`。启动 `platforms/node/serve` 服务即可。默认使用 `3033` 端口号，可以通过环境变量修改。

## Tip

node 端默认使用的是 3033 端口，如果有修改，开发环境下需要修改 web 端的 proxy 配置。
