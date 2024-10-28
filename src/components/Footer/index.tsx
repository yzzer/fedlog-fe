import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by youzhangzheng"
      links={[
        {
          key: 'FedLog',
          title: 'FedLog',
          href: 'https://github.com/yzzer/FedLog',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/yzzer/FedLog',
          blankTarget: true,
        },
        {
          key: 'CAD',
          title: 'CAD',
          href: 'https://www.bupt.edu.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
