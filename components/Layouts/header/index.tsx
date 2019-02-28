import * as React from 'react';
import { Layout, Icon } from 'antd';

const { useState } = React;
const { Header } = Layout;

const HeaderSFC = () => {
  const [collapsed, toogleCollapsed] = useState(false);

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={() => toogleCollapsed(!collapsed)}
      />
    </Header>
  );
};

export default HeaderSFC;
