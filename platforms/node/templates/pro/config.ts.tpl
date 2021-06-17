// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: {{{ hash }}},
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: '{{{ history }}}',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
{{ #fastRefresh }}
  // 快速刷新功能 https://umijs.org/config#fastrefresh
  fastRefresh: {},
{{ /fastRefresh }}
{{ #ssr }}
  ssr: {},
{{ /ssr }}
{{ #webpack5 }}
  webpack5: {},
{{ /webpack5 }}
  esbuild: {},
});
