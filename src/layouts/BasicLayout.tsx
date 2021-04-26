import React from "react";
import type { FC } from "react";
import { Layout } from "antd";
import { SettingFilled } from "@ant-design/icons";
import styles from "./index.less";

const { Header, Content, Sider } = Layout;

interface PageProps {}

const BasicLayout: FC<PageProps> = ({ children, location, history }) => {
  return (
    <Layout className={styles.center}>
      <Header>
        <div className={styles.logo}>
          <img src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg" />
          Umi Start
        </div>
        <div className={styles.user}>
          <SettingFilled style={{ fontSize: "18px", marginRight: "15px" }} />
        </div>
      </Header>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
