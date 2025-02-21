import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card,
  Table,
  Tag,
  Space,
  Button,
  Progress,
  Tooltip,
  Popconfirm,
  Typography,
  Popover
} from 'antd';
import {
  DeleteOutlined,
  SettingOutlined,
  TeamOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Text } = Typography;

interface QueueMember {
  name: string;
  role: 'admin' | 'user';
}

interface GpuResource {
  type: 'NVIDIA RTX 2080Ti-11GB' | 'NVIDIA RTX 3090-24GB';
  total: number;
  used: number;
  memoryUsed: number;  // GB
  memoryTotal: number; // GB
  utilizationRate: number; // GPU利用率
}

interface QueueResource {
  cpu: {
    total: number;
    used: number;
  };
  memory: {
    total: number;
    used: number;
  };
  machines: {
    total: number;
    used: number;
  };
}

interface Queue {
  id: string;
  name: string;
  environment: 'prod' | 'test' | 'dev';
  resources: {
    cpu: {
      total: number;
      used: number;
    };
    memory: {
      total: number;
      used: number;
    };
    gpus: GpuResource[];
  };
  members: QueueMember[];
  permission: 'admin' | 'user' | 'none';
}

// 修改模拟数据，确保每个队列都有 gpus 数组
const mockQueues: Queue[] = [
  {
    id: '1',
    name: 'k8s-prod-fed-queue',
    environment: 'prod',
    resources: {
      cpu: { total: 100, used: 97.8 },      // 97.8% - 红色
      memory: { total: 256, used: 218.4 },   // 85.3% - 黄色
      gpus: [
        {
          type: 'NVIDIA RTX 3090-24GB',
          total: 4,
          used: 4,
          memoryTotal: 96,                   // 4*24GB
          memoryUsed: 92.8,                  // 96.7% - 红色
          utilizationRate: 92.7
        },
        {
          type: 'NVIDIA RTX 2080Ti-11GB',
          total: 2,
          used: 1,
          memoryTotal: 22,                   // 2*11GB
          memoryUsed: 15.2,                  // 69.1% - 绿色
          utilizationRate: 45.8
        }
      ]
    },
    members: [
      { name: '路修远', role: 'admin' },
      { name: '石家濠', role: 'user' },
      { name: '游张政', role: 'user' }
    ],
    permission: 'admin'
  },
  {
    id: '2',
    name: 'hdfs-prod-fed-queue',
    environment: 'prod',
    resources: {
      cpu: { total: 80, used: 67.2 },       // 84% - 黄色
      memory: { total: 128, used: 89.6 },    // 70% - 绿色
      gpus: [
        {
          type: 'NVIDIA RTX 3090-24GB',
          total: 2,
          used: 2,
          memoryTotal: 48,                   // 2*24GB
          memoryUsed: 44.8,                  // 93.4% - 黄色
          utilizationRate: 88.5
        },
        {
          type: 'NVIDIA RTX 2080Ti-11GB',
          total: 4,
          used: 2,
          memoryTotal: 44,                   // 4*11GB
          memoryUsed: 28.8,                  // 65.5% - 绿色
          utilizationRate: 65.2
        }
      ]
    },
    members: [
      { name: '魏亚东', role: 'admin' },
      { name: '暴浩彤', role: 'user' },
      { name: '游张政', role: 'user' },
    ],
    permission: 'user'
  },
  {
    id: '3',
    name: 'mysql-test-fed-queue',
    environment: 'test',
    resources: {
      cpu: { total: 40, used: 38.4 },       // 96% - 红色
      memory: { total: 64, used: 32.8 },     // 51.3% - 绿色
      gpus: [
        {
          type: 'NVIDIA RTX 2080Ti-11GB',
          total: 2,
          used: 1,
          memoryTotal: 22,                   // 2*11GB
          memoryUsed: 19.8,                  // 90% - 黄色
          utilizationRate: 35.8
        }
      ]
    },
    members: [
      { name: '郭翼天', role: 'admin' }
    ],
    permission: 'none'
  }
];

const ResourceGauge: React.FC<{
  value: number;
  title: string;
}> = ({ value, title }) => {
  // 根据值确定颜色
  const getColor = (val: number) => {
    if (val > 95) return '#F56C6C';
    if (val > 80) return '#E6A23C';
    return '#67C23A';
  };
  const color = getColor(value);

  const option = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 5,
      progress: {
        show: true,
        roundCap: true,
        width: 8,
        itemStyle: {
          color: color
        }
      },
      pointer: {
        show: false
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 8,
          color: [
            [1, '#E4E7ED']
          ]
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: color
        },
        length: 5
      },
      axisLabel: {
        show: true,
        distance: -25,
        fontSize: 10,
        color: color,
        formatter: (value: number) => {
          if (value === 0) return '0%';
          if (value === 100) return '100%';
          return '';
        }
      },
      anchor: {
        show: false
      },
      title: {
        show: true,
        offsetCenter: [0, '30%'],
        fontSize: 12,
        color: color
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '-15%'],
        fontSize: 14,
        formatter: (value: number) => value.toFixed(1) + '%',
        color: color
      },
      data: [{
        value: value,
        name: title
      }]
    }]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '140px', width: '160px' }}
    />
  );
};

const GpuResourceContent: React.FC<{
  gpu: GpuResource;
}> = ({ gpu }) => {
  return (
    <div style={{ width: 400 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>{gpu.type}</Text>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          marginTop: 12,
          marginBottom: 12 
        }}>
          <ResourceGauge 
            value={(gpu.memoryUsed / gpu.memoryTotal) * 100} 
            title="显存使用率"
          />
          <ResourceGauge 
            value={gpu.utilizationRate} 
            title="GPU利用率"
          />
        </div>
      </Space>
    </div>
  );
};

const FederatedQueues: React.FC = () => {
  const [queues] = useState<Queue[]>(mockQueues);

  const getEnvironmentTag = (env: Queue['environment']) => {
    const config = {
      prod: { color: 'success', text: '生产' },
      test: { color: 'warning', text: '测试' },
      dev: { color: 'processing', text: '开发' }
    };
    return <Tag color={config[env].color}>{config[env].text}</Tag>;
  };

  const getPermissionTag = (permission: Queue['permission']) => {
    const config = {
      admin: { color: 'success', text: '管理员' },
      user: { color: 'processing', text: '使用者' },
      none: { color: 'default', text: '无权限' }
    };
    return <Tag color={config[permission].color}>{config[permission].text}</Tag>;
  };

  const renderResourceUsage = (used: number, total: number, unit: string = '') => {
    const percentage = (used / total) * 100;
    let status: 'success' | 'warning' | 'exception' = 'success';
    
    if (percentage > 95) {
      status = 'exception';
    } else if (percentage > 80) {
      status = 'warning';
    }
    
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Progress 
          percent={Math.min(percentage, 100)} 
          size="small" 
          status={status}
          format={(percent) => `${used.toFixed(1)}${unit} / ${total}${unit} (${percentage.toFixed(1)}%)`}
        />
      </Space>
    );
  };

  const columns = [
    {
      title: '队列名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Queue) => (
        <Space>
          {text}
          {getEnvironmentTag(record.environment)}
        </Space>
      ),
    },
    {
      title: '我的权限',
      key: 'permission',
      width: 100,
      render: (_, record: Queue) => getPermissionTag(record.permission),
    },
    {
      title: (
        <Space>
          资源使用情况
          <Tooltip title="展示队列的CPU、内存和GPU使用情况">
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      key: 'resources',
      render: (_, record: Queue) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text type="secondary">CPU核心：</Text>
            {renderResourceUsage(record.resources.cpu.used, record.resources.cpu.total, '核')}
          </div>
          <div>
            <Text type="secondary">内存容量：</Text>
            {renderResourceUsage(record.resources.memory.used, record.resources.memory.total, 'GB')}
          </div>
          <div>
            <Text type="secondary">GPU资源：</Text>
            {record.resources.gpus?.map((gpu, index) => (
              <Popover
                key={index}
                title="GPU资源使用情况"
                content={<GpuResourceContent gpu={gpu} />}
                trigger="hover"
                placement="bottom"
                overlayStyle={{ width: 'auto' }}
                align={{
                  offset: [0, 10]
                }}
              >
                <div style={{ cursor: 'pointer' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>{gpu.type}：{gpu.total}卡</Text>
                  </Space>
                </div>
              </Popover>
            ))}
          </div>
        </Space>
      ),
    },
    {
      title: '队列成员',
      key: 'members',
      render: (_, record: Queue) => (
        <Space wrap>
          {record.members.map(member => (
            <Tag key={member.name} color={member.role === 'admin' ? 'purple' : 'default'}>
              {member.name}
              {member.role === 'admin' && <Text type="secondary"> (管理员)</Text>}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Queue) => {
        if (record.permission === 'none') {
          return (
            <Button type="primary" icon={<PlusOutlined />}>
              申请权限
            </Button>
          );
        }

        const isAdmin = record.permission === 'admin';
        
        return (
          <Space>
            <Tooltip title={isAdmin ? '管理成员' : '无管理权限'}>
              <Button 
                icon={<TeamOutlined />} 
                disabled={!isAdmin}
              >
                成员管理
              </Button>
            </Tooltip>
            <Tooltip title={isAdmin ? '队列设置' : '无管理权限'}>
              <Button 
                icon={<SettingOutlined />} 
                disabled={!isAdmin}
              >
                扩容设置
              </Button>
            </Tooltip>
            <Tooltip title={isAdmin ? '移除队列' : '无管理权限'}>
              <Popconfirm
                title="确定要移除该队列吗？"
                description="移除后将无法恢复，请谨慎操作。"
                disabled={!isAdmin}
              >
                <Button 
                  danger 
                  icon={<DeleteOutlined />} 
                  disabled={!isAdmin}
                >
                  移除
                </Button>
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Table 
          columns={columns} 
          dataSource={queues}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </PageContainer>
  );
};

export default FederatedQueues; 