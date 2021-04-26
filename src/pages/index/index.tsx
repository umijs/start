import React from "react";
import type { FC } from "react";
import { useRequest } from "alita";
import styles from "./index.less";
import { query } from "@/services/api";

interface PageProps {}

const IndexPage: FC<PageProps> = ({}) => {
  const { data } = useRequest(query);
  console.log(data);

  return <div className={styles.center}>Index Page,Hello {data?.text}</div>;
};

export default IndexPage;
