import { PlusOutlined } from '@ant-design/icons';
import { Dropdown, Input, Button, Space, Divider } from 'antd';
import { history } from '@umijs/max';
import React, { useState } from 'react';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      height: '38px',
      marginLeft: '12px',
      marginRight: '12px',
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgContainer,
      padding: '0 12px',
    },
    prefix: {
      color: token.colorTextSecondary,
      fontSize: '16px',
      marginRight: '8px',
    },
    projectButton: {
      display: 'flex',
      height: '38px',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      width: '200px',
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    projectText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '184px',
    },
    dropdownContent: {
      padding: '12px',
      width: '320px',
      backgroundColor: token.colorBgContainer,
      boxShadow: token.boxShadowSecondary,
      borderRadius: token.borderRadius,
    },
    projectList: {
      maxHeight: '320px',
      overflow: 'auto',
      backgroundColor: token.colorBgLayout,
      borderRadius: token.borderRadius,
      padding: '4px',
      marginTop: '8px',
    },
    projectItem: {
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgContainer,
      marginBottom: '4px',
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    projectName: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: token.colorText,
    },
    projectDesc: {
      fontSize: '12px',
      color: token.colorTextSecondary,
      marginTop: '4px',
    },
    searchInput: {
      width: '100%',
    },
    footer: {
      position: 'sticky',
      bottom: 0,
      backgroundColor: token.colorBgContainer,
      paddingTop: '12px',
      marginTop: '12px',
      borderTop: `1px solid ${token.colorBorderSecondary}`,
    },
    createButton: {
      width: '100%',
    },
  };
});

// 模拟数据
const mockProjects = [
  { id: 1, name: 'K8s集群日志检测', desc: 'Kubernetes集群异常日志检测项目' },
  { id: 2, name: 'HDFS集群日志检测', desc: 'Hadoop分布式文件系统日志分析' },
  { id: 3, name: 'MySQL数据库日志检测', desc: '数据库异常行为分析' },
  { id: 4, name: 'Nginx服务器日志检测', desc: 'Web服务器访问日志分析' },
  { id: 5, name: 'Docker容器日志检测', desc: '容器运行状态监控' },
];

const ProjectSelector: React.FC = () => {
  const { styles } = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [open, setOpen] = useState(false);

  const filteredProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleProjectSelect = (project: typeof mockProjects[0]) => {
    setSelectedProject(project);
    setOpen(false);
    history.push(`/project-manage/projectinfo?id=${project.id}`);
  };

  const handleCreateProject = () => {
    setOpen(false);
    history.push('/project-manage/create');
  };

  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <Input
        placeholder="搜索项目"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className={styles.searchInput}
        allowClear
      />
      <div className={styles.projectList}>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className={styles.projectItem}
            onClick={() => handleProjectSelect(project)}
          >
            <div className={styles.projectName}>{project.name}</div>
            <div className={styles.projectDesc}>{project.desc}</div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '16px', color: '#999' }}>
            未找到相关项目
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.createButton}
          onClick={handleCreateProject}
        >
          创建新项目
        </Button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <span className={styles.prefix}>当前项目：</span>
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        dropdownRender={() => dropdownContent}
        trigger={['click']}
        placement="bottomLeft"
      >
        <div className={styles.projectButton}>
          <span className={styles.projectText}>{selectedProject?.name || '选择项目'}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default ProjectSelector; 