import * as React from 'react';
import { Button } from 'antd';

import * as style from './index.less';
export default () => (
  <div className={style.button1}>
    <Button type="primary" loading>
      Loading
    </Button>
  </div>
);
