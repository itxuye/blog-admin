import * as React from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

import * as styles from './index.less';
interface IheaderProps {
  collapsed: boolean;
  toogleCollapsed: (collapsed: boolean) => void;
}

const HeaderSFC: React.SFC<IheaderProps> = ({ collapsed, toogleCollapsed }) => {

  return (
    <Header className={styles.header}>
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={()=>toogleCollapsed}
      />
    </Header>
  );
};

export default HeaderSFC;
