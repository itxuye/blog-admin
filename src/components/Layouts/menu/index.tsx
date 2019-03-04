import * as React from 'react';
import { Layout, Icon, Menu } from 'antd';

const { Sider } = Layout;

import * as styles from './index.less';

interface ImenuProps {
  collapsed: boolean;
}

const MenuSFC: React.SFC<ImenuProps> = ({ collapsed }) => {
  return (
    <Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.log} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>个人中心</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuSFC;
