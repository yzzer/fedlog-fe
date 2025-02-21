import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Typography,
  Tooltip,
  Popconfirm,
  Dropdown
} from 'antd';
import { history } from 'umi';
import {
  PlusOutlined,
  DownOutlined,
  StopOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CloudUploadOutlined,
  UserOutlined,
  FileTextOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import CreateTaskModal from './components/CreateTaskModal';

const { Text } = Typography;

interface FederatedInstance {
  id: number;
  startTime: string;
  triggerType: '模板失配超限' | '日志积压过多';
  duration: string;
  federatedQueue: string;
  appQueue: string;
  status: '失败' | '取消' | '运行中' | '成功';
  templateVersion: string;
}

interface FederatedTask {
  id: string;
  name: string;
  federatedQueue: string;
  appQueue: string;
  status: '上线' | '下线' | '未发布';
  onlineTime?: string;
  instanceCount: number;
  owner: string;
  templateName: string;
  latestVersion: string;
  instances: FederatedInstance[];
  algorithm: {
    name: string;
    value: 'flspell' | 'fldrain' | 'feddrain_spell' | 'feddrain_drain' | 'feddrain_brain';
  };
}

// 生成30个实例的模拟数据，并返回最新版本号
const generateInstances = (count: number, baseVersion: string): {
  instances: FederatedInstance[];
  latestVersion: string;
} => {
  // 解析基础版本号
  const [major, minor, patch] = baseVersion.replace('v', '').split('.').map(Number);
  
  const instances = Array.from({ length: count }, (_, index) => {
    // 从最新的实例开始，版本号递减
    const instancePatch = patch + count - 1 - index;
    const instanceMinor = minor + Math.floor(instancePatch / 10);
    const instanceMajor = major;
    const version = `v${instanceMajor}.${instanceMinor}.${instancePatch % 10}`;

    return {
      id: count - index,
      startTime: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleString(),
      triggerType: Math.random() > 0.5 ? '模板失配超限' : '日志积压过多',
      duration: `${Math.floor(Math.random() * 120 + 30)}分钟`,
      federatedQueue: 'fed-queue-001',
      appQueue: 'nginx-gateway-queue',
      status: ['失败', '取消', '运行中', '成功'][Math.floor(Math.random() * 4)] as FederatedInstance['status'],
      templateVersion: version
    };
  });

  // 最新版本就是第一个实例的版本
  const latestVersion = instances[0]?.templateVersion || baseVersion;

  return { instances, latestVersion };
};

const mockTasks: FederatedTask[] = [
  {
    id: 'task-001',
    name: 'Nginx日志联邦解析任务',
    federatedQueue: 'fed-queue-001',
    appQueue: 'nginx-gateway-queue',
    status: '上线',
    onlineTime: '2024-03-01 10:00:00',
    instanceCount: 30,
    owner: '游张政',
    templateName: 'nginx-log-template',
    ...generateInstances(30, 'v1.0.0'),
    algorithm: {
      name: 'FedDrain+Brain',
      value: 'feddrain_brain'
    }
  },
  {
    id: 'task-002',
    name: 'Spring应用日志联邦解析',
    federatedQueue: 'fed-queue-002',
    appQueue: 'user-service-queue',
    status: '下线',
    onlineTime: '2024-02-15 14:30:00',
    instanceCount: 5,
    owner: '路修远',
    templateName: 'spring-log-template',
    ...generateInstances(5, 'v2.0.0'),
    algorithm: {
      name: 'FLDrain',
      value: 'fldrain'
    }
  },
  {
    id: 'task-003',
    name: 'MySQL慢查询日志联邦解析',
    federatedQueue: 'fed-queue-003',
    appQueue: 'mysql-service-queue',
    status: '未发布',
    instanceCount: 0,
    owner: '石家濠',
    templateName: 'mysql-slow-query-template',
    latestVersion: 'v1.0.0',
    instances: [],
    algorithm: {
      name: 'FedDrain+Spell',
      value: 'feddrain_spell'
    }
  }
];

const Tasks: React.FC = () => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const instanceColumns = [
    {
      title: '实例ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '启动时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '触发方式',
      dataIndex: 'triggerType',
      key: 'triggerType',
      render: (type: string) => (
        <Tag color={type === '模板失配超限' ? 'orange' : 'purple'}>
          {type}
        </Tag>
      ),
    },
    {
      title: '执行耗时',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '执行状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap = {
          '失败': 'error',
          '取消': 'default',
          '运行中': 'processing',
          '成功': 'success'
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '模板版本',
      dataIndex: 'templateVersion',
      key: 'templateVersion',
      render: (version: string) => (
        <Tag color="blue">{version}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: FederatedInstance) => {
        return (
          <Space>
            <Tooltip title="查看日志">
              <Button 
                icon={<FileTextOutlined />} 
                onClick={() => {
                  // 实际应用中跳转到日志查看页面
                  console.log('查看日志', record.id);
                }}
              />
            </Tooltip>
            
            {/* 失败的实例可以重跑 */}
            {record.status === '失败' && (
              <Tooltip title="重新执行">
                <Popconfirm
                  title="确定要重新执行该实例吗？"
                  description="将重新执行此次解析任务"
                  onConfirm={() => {
                    // 实际应用中调用重跑API
                    console.log('重跑实例', record.id);
                  }}
                >
                  <Button 
                    type="primary"
                    icon={<ReloadOutlined />}
                  />
                </Popconfirm>
              </Tooltip>
            )}
            
            {/* 运行中的实例可以取消 */}
            {record.status === '运行中' && (
              <Tooltip title="取消执行">
                <Popconfirm
                  title="确定要取消该实例吗？"
                  description="取消后该实例将立即停止执行"
                  onConfirm={() => {
                    // 实际应用中调用取消API
                    console.log('取消实例', record.id);
                  }}
                >
                  <Button 
                    danger
                    icon={<StopOutlined />}
                  />
                </Popconfirm>
              </Tooltip>
            )}
          </Space>
        );
      },
    }
  ];

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FederatedTask) => (
        <Space>
          <a onClick={() => history.push(`/federated-log/task/${record.id}`)}>
            {text}
          </a>
          <Button 
            type="link" 
            icon={<DownOutlined />} 
            onClick={(e) => {
              e.stopPropagation();
              setExpandedTaskId(expandedTaskId === record.id ? null : record.id);
            }}
          >
            实例列表
          </Button>
        </Space>
      ),
    },
    {
      title: '联邦队列',
      dataIndex: 'federatedQueue',
      key: 'federatedQueue',
    },
    {
      title: '应用队列',
      dataIndex: 'appQueue',
      key: 'appQueue',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        const colorMap = {
          '上线': 'success',
          '下线': 'default',
          '未发布': 'warning'
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '上线时间',
      dataIndex: 'onlineTime',
      key: 'onlineTime',
      render: (text: string) => text || '-',
    },
    {
      title: '实例数',
      dataIndex: 'instanceCount',
      key: 'instanceCount',
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: '解析算法',
      key: 'algorithm',
      render: (_, record: FederatedTask) => (
        <Space>
          <span>{record.algorithm.name}</span>
          {record.algorithm.value === 'feddrain_brain' && (
            <Tag color="success">推荐</Tag>
          )}
          <Tooltip 
            title={
              <div>
                {record.algorithm.value === 'flspell' && '基于拼写距离的联邦日志解析算法'}
                {record.algorithm.value === 'fldrain' && '基于前缀树的联邦日志解析算法'}
                {record.algorithm.value === 'feddrain_spell' && '联邦Drain与Spell混合解析算法'}
                {record.algorithm.value === 'feddrain_drain' && '联邦双Drain混合解析算法'}
                {record.algorithm.value === 'feddrain_brain' && '联邦Drain与Brain混合解析算法'}
              </div>
            }
          >
            <QuestionCircleOutlined style={{ color: '#8c8c8c' }} />
          </Tooltip>
        </Space>
      ),
      width: 180,
    },
    {
      title: '模板集',
      key: 'template',
      render: (_, record: FederatedTask) => (
        <Space direction="vertical">
          <Text>{record.templateName}</Text>
          <Tag color="processing">
            {record.latestVersion}
            {record.instances.length > 0 && record.instances[0].templateVersion === record.latestVersion && 
              <Tooltip title="当前版本由最新实例生成">
                <CheckCircleOutlined style={{ marginLeft: 4, color: '#52c41a' }} />
              </Tooltip>
            }
          </Tag>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: FederatedTask) => {
        const isOwner = record.owner === '游张政';
        const hasPermission = true; // 这里应该根据实际权限判断

        if (isOwner) {
          return (
            <Space>
              <Tooltip title="查看详情">
                <Button icon={<EyeOutlined />} onClick={() => history.push(`/federated-log/task/${record.id}`)} />
              </Tooltip>
              {record.status !== '上线' && (
                <Tooltip title="发布">
                  <Button icon={<CloudUploadOutlined />} type="primary" />
                </Tooltip>
              )}
              {record.status === '上线' && (
                <Tooltip title="下线">
                  <Button icon={<StopOutlined />} />
                </Tooltip>
              )}
              <Tooltip title="编辑">
                <Button icon={<EditOutlined />} />
              </Tooltip>
              {record.status !== '上线' && (
                <Tooltip title="删除">
                  <Popconfirm
                    title="确定要删除该任务吗？"
                    description="删除后将无法恢复。"
                  >
                    <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Tooltip>
              )}
            </Space>
          );
        } else if (hasPermission) {
          return (
            <Tooltip title="查看详情">
              <Button icon={<EyeOutlined />} onClick={() => history.push(`/federated-log/task/${record.id}`)} />
            </Tooltip>
          );
        } else {
          return (
            <Button type="link">申请权限</Button>
          );
        }
      },
    },
  ];

  // 检查选中的任务是否都可以发布（未发布状态）
  const canPublishSelected = () => {
    return selectedTasks.length > 0 && 
      selectedTasks.every(taskId => 
        mockTasks.find(task => 
          task.id === taskId && task.status === '未发布'
        )
      );
  };

  // 检查选中的任务是否都可以删除（非上线状态）
  const canDeleteSelected = () => {
    return selectedTasks.length > 0 && 
      selectedTasks.every(taskId => 
        mockTasks.find(task => 
          task.id === taskId && task.status !== '上线'
        )
      );
  };

  // 批量发布确认
  const handleBatchPublish = () => {
    // 实际应用中这里需要调用API
    console.log('发布任务：', selectedTasks);
  };

  // 批量删除确认
  const handleBatchDelete = () => {
    // 实际应用中这里需要调用API
    console.log('删除任务：', selectedTasks);
  };

  const handleCreateTask = (values: any) => {
    console.log('创建任务：', values);
    // 这里处理创建任务的逻辑
    setCreateModalVisible(false);
  };

  return (
    <PageContainer>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              新建解析任务
            </Button>
            <Popconfirm
              title="确定要发布选中的任务吗？"
              description={`将发布 ${selectedTasks.length} 个任务`}
              onConfirm={handleBatchPublish}
              disabled={!canPublishSelected()}
            >
              <Button 
                type="primary"
                icon={<CloudUploadOutlined />}
                disabled={!canPublishSelected()}
              >
                批量发布
              </Button>
            </Popconfirm>
            <Popconfirm
              title="确定要删除选中的任务吗？"
              description={`将删除 ${selectedTasks.length} 个任务，删除后无法恢复`}
              onConfirm={handleBatchDelete}
              disabled={!canDeleteSelected()}
            >
              <Button 
                danger
                icon={<DeleteOutlined />}
                disabled={!canDeleteSelected()}
              >
                批量删除
              </Button>
            </Popconfirm>
            <Text type="secondary">
              已选择 {selectedTasks.length} 项
            </Text>
          </Space>
        </div>
        <Table 
          columns={columns} 
          dataSource={mockTasks}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedTasks,
            onChange: (selectedRowKeys) => setSelectedTasks(selectedRowKeys as string[]),
            getCheckboxProps: (record) => ({
              disabled: record.owner !== '游张政'
            })
          }}
          expandable={{
            expandedRowKeys: expandedTaskId ? [expandedTaskId] : [],
            expandedRowRender: (record) => (
              <Table
                columns={instanceColumns}
                dataSource={record.instances}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
                size="small"  // 使实例表格更紧凑
              />
            ),
          }}
        />
      </Card>

      <CreateTaskModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={handleCreateTask}
      />
    </PageContainer>
  );
};

export default Tasks; 