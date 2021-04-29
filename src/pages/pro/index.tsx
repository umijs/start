import React from 'react';
import type { FC } from 'react';
import { useRequest } from 'alita';
import { StepsForm, BetaSchemaForm } from '@ant-design/pro-form';
import { getTempsListData } from '@/services/api';

interface PageProps {}

const IndexPage: FC<PageProps> = ({}) => {
  const { data } = useRequest(getTempsListData);
  console.log(data);

  return (
    <StepsForm>
      <BetaSchemaForm
        initialValues={{
          project: {
            name: 'umi',
            version: '1.0.0',
            description: '新的独角兽在这里启航',
            keywords: ['umi'],
            license: 'MIT',
          },
        }}
        layoutType="StepForm"
        title="项目信息配置"
        columns={[
          {
            title: '项目名称',
            dataIndex: ['project', 'name'],
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          },
          {
            title: '版本号',
            width: 'sm',
            dataIndex: ['project', 'version'],
          },
          {
            title: '描述',
            dataIndex: ['project', 'description'],
            valueType: 'textarea',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          },
          {
            title: '关键字',
            dataIndex: ['project', 'keywords'],
            valueType: 'tags',
          },
          {
            title: '作者',
            dataIndex: ['project', 'author'],
            valueType: 'formList',
            columns: [
              {
                valueType: 'group',
                columns: [
                  {
                    title: '名称',
                    dataIndex: 'name',
                    width: 'xs',
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                  },
                  {
                    title: '邮箱',
                    dataIndex: 'email',
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                    width: 'm',
                  },
                ],
              },
            ],
          },
          {
            title: '协议',
            dataIndex: ['project', 'license'],
            valueType: 'select',
            valueEnum: {
              MIT: 'MIT',
              BSD: 'BSD',
              GPL: 'GPL',
              'Apache License': 'Apache',
            },
            width: 'sm',
          },
        ]}
      />
      <BetaSchemaForm
        layoutType="StepForm"
        title="开发配置"
        initialValues={{
          umi: {
            history: 'browser',
            hash: true,
            webpack5: false,
            fastRefresh: false,
            ssr: false,
          },
        }}
        columns={[
          {
            title: '项目的路由类型',
            dataIndex: ['umi', 'history'],
            valueType: 'select',
            valueEnum: {
              browser: 'browser',
              hash: 'hash',
              memory: 'memory',
            },
            width: 'sm',
          },
          {
            title: '兼容的浏览器版本',
            dataIndex: ['umi', 'targets'],
            valueType: 'select',
            valueEnum: {
              'ie 11': 'ie11',
              现代浏览器: 'default',
              '最新的 google': 'google',
            },
            width: 'sm',
          },

          {
            title: '编译的文件增加 hash 后缀',
            dataIndex: ['umi', 'hash'],
            valueType: 'switch',
          },
          {
            title: '是否使用webpack 5',
            dataIndex: ['umi', 'webpack5'],
            valueType: 'switch',
          },
          {
            title: '是否使用快速刷新',
            tooltip: '快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。',
            dataIndex: ['umi', 'fastRefresh'],
            valueType: 'switch',
          },
          {
            title: '是否打开ssr',
            dataIndex: ['umi', 'ssr'],
            valueType: 'switch',
          },
          {
            title: '设置浏览器的 meta 信息',
            dataIndex: ['umi', 'metas'],
            valueType: 'formList',
            tooltip: `
            示例：
            <meta name="description" content="🍙 插件化的企业级前端应用框架。" />
            `,
            columns: [
              {
                valueType: 'group',
                columns: [
                  {
                    title: '名称',
                    dataIndex: 'name',
                    width: 'xs',
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                  },
                  {
                    title: '内容',
                    dataIndex: 'content',
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                    width: 'm',
                  },
                ],
              },
            ],
          },
        ]}
      />
      <BetaSchemaForm
        layoutType="StepForm"
        title="Pro 的配置"
        initialValues={{
          umi: {
            history: 'browser',
            hash: true,
            webpack5: false,
            fastRefresh: false,
            ssr: false,
          },
        }}
        columns={[
          {
            title: '项目的路由类型',
            dataIndex: ['umi', 'history'],
            valueType: 'select',
            valueEnum: {
              browser: 'browser',
              hash: 'hash',
              memory: 'memory',
            },
            width: 'sm',
          },
          {
            title: '兼容的浏览器版本',
            dataIndex: ['umi', 'targets'],
            valueType: 'select',
            valueEnum: {
              'ie 11': 'ie11',
              现代浏览器: 'default',
              '最新的 google': 'google',
            },
            width: 'sm',
          },

          {
            title: '编译的文件增加 hash 后缀',
            dataIndex: ['umi', 'hash'],
            valueType: 'switch',
          },
          {
            title: '是否使用webpack 5',
            dataIndex: ['umi', 'webpack5'],
            valueType: 'switch',
          },
          {
            title: '是否使用快速刷新',
            tooltip: '快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。',
            dataIndex: ['umi', 'fastRefresh'],
            valueType: 'switch',
          },
          {
            title: '是否打开ssr',
            dataIndex: ['umi', 'ssr'],
            valueType: 'switch',
          },
          {
            title: '设置浏览器的 meta 信息',
            dataIndex: ['umi', 'metas'],
            valueType: 'formList',
            tooltip: `
            示例：
            <meta name="description" content="🍙 插件化的企业级前端应用框架。" />
            `,
            columns: [
              {
                valueType: 'group',
                columns: [
                  {
                    title: '名称',
                    dataIndex: 'name',
                    width: 'xs',
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                  },
                  {
                    title: '内容',
                    dataIndex: 'content',
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                    width: 'm',
                  },
                ],
              },
            ],
          },
        ]}
      />
    </StepsForm>
  );
};

export default IndexPage;
