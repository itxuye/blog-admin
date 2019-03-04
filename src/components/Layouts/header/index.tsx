import * as React from 'react';
import { Layout, Icon, Menu, Dropdown, Avatar } from 'antd';

const { Header } = Layout;

import * as styles from './index.less';
interface IheaderProps {
  collapsed: boolean;
  toogleCollapsed: () => void;
  signout: () => void;
}

const HeaderSFC: React.SFC<IheaderProps> = ({
  collapsed,
  toogleCollapsed,
  signout
}) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={signout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <Header className={styles.header}>
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toogleCollapsed}
      />
      <Dropdown overlay={menu} placement="bottomCenter">
        <div>
          <Avatar size="small" icon="user" style={{ margin: 5 }} />
          itxuye
        </div>
      </Dropdown>
    </Header>
  );
};

export default HeaderSFC;
