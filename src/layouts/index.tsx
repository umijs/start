import React from 'react';
import type { FC } from 'react';
import { IRouteComponentProps } from 'alita';
import BasicLayout from './BasicLayout';

const MenuLayout: FC<IRouteComponentProps> = (props) => {
  return <BasicLayout {...props} />;
};

export default MenuLayout;
