import React from "react";
import type { FC } from "react";
import BlankLayout from "./BlankLayout";
import BasicLayout from "./BasicLayout";

const MenuLayout: FC = (props) => {
  const { location } = props;
  const { pathname } = location;
  const hasLayout = pathname === "/";
  if (!hasLayout) {
    return <BlankLayout {...props} />;
  }
  return <BasicLayout {...props} />;
};

export default MenuLayout;
