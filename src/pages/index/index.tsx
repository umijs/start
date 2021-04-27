import React from "react";
import type { FC } from "react";
import { useRequest } from "alita";
import styles from "./index.less";
import { getTempsListData } from "@/services/api";

interface PageProps {}

const IndexPage: FC<PageProps> = ({}) => {
  const { data } = useRequest(getTempsListData);
  console.log(data);

  return (
    <div className={styles.center}>Index Page,Hello {JSON.stringify(data)}</div>
  );
};

export default IndexPage;
