import React, { useRef, useContext, useState } from 'react';
import type { FC } from 'react';
import ProLayout, { DefaultFooter, PageContainer } from '@ant-design/pro-layout';
import { Link, history, IRouteComponentProps } from 'alita';
import { Input, Space, Tag } from 'antd';
import { Menu } from 'antd';
import ProCard from '@ant-design/pro-card';
import ProProvider from '@ant-design/pro-provider';

const TagList: React.FC<{
  value?: string[];
  onChange?: (value: string[]) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (inputValue && tempsTags.filter((tag) => tag === inputValue).length === 0) {
      tempsTags = [...tempsTags, inputValue];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};

const BasicLayout: FC<IRouteComponentProps> = ({ children, ...rest }) => {
  const values = useContext(ProProvider);
  return (
    <ProLayout
      logo="https://gw.alipayobjects.com/zos/antfincdn/bWi%26ZHzXn9/wheat.svg"
      title="Start"
      layout="top"
      navTheme="light"
      fixedHeader
      contentWidth="Fluid"
      footerRender={() => <DefaultFooter />}
      {...rest}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
    >
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            bodyStyle={{
              padding: '16px 0',
            }}
            title="项目类型"
            colSpan="300px"
          >
            <Menu
              onClick={(e) => history.push(e.key as string)}
              selectedKeys={[rest.location.pathname]}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <Menu.Item key="/umi">
                <img
                  style={{
                    width: '16px',
                    display: 'inline-flex',
                    height: '16px',
                    verticalAlign: 'middle',
                    marginRight: 8,
                  }}
                  src="https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png"
                />
                <span
                  style={{
                    display: 'inline-flex',
                  }}
                >
                  Umi
                </span>
              </Menu.Item>
              <Menu.Item key="/pro">
                <img
                  style={{
                    width: '16px',
                    height: '16px',
                    verticalAlign: 'middle',
                    display: 'inline-flex',
                    marginRight: 8,
                  }}
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                />
                <span
                  style={{
                    display: 'inline-flex',
                  }}
                >
                  Ant Design Pro
                </span>
              </Menu.Item>
            </Menu>
          </ProCard>
          <ProCard title="配置" headerBordered>
            <ProProvider.Provider
              value={{
                ...values,
                valueTypeMap: {
                  tags: {
                    render: (text) => {
                      return (
                        <>
                          {[text].flat(1).map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </>
                      );
                    },
                    renderFormItem: (text, props) => <TagList {...props} {...props?.fieldProps} />,
                  },
                },
              }}
            >
              {children}
            </ProProvider.Provider>
          </ProCard>
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
};

export default BasicLayout;
