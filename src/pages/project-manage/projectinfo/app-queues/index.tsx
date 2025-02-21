import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card,
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  Typography,
  Modal,
  Popover,
  Progress,
  Divider
} from 'antd';
import {
  TeamOutlined,
  KeyOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Text } = Typography;

type ServiceType = '后端' | '基础架构' | '前端' | '模型推理' | '模型训练';
type HealthStatus = '未接入' | '良好' | '健康' | '严重';

interface QueueMember {
  name: string;
  role: 'admin' | 'user';
}

interface LogService {
  name: string;
  status: '下线' | '灰度' | '在线';
  version: string;
}

interface LogTemplate {
  name: string;
  version: string;
  updateTime: string;
}

interface ResourceUsage {
  cpu: number;  // 百分比
  memory: number;  // 百分比
}

interface ServiceResourceUsage {
  parsingServices: ResourceUsage;
  detectionServices: ResourceUsage;
  federatedLearning: ResourceUsage;
}

interface ApplicationQueue {
  id: string;
  name: string;
  serviceType: ServiceType;
  instances: {
    total: number;
    online: number;
  };
  logPatterns: string[];
  healthStatus: HealthStatus;
  members: QueueMember[];
  permission: 'admin' | 'user' | 'none';
  parsingServices: LogService[];
  detectionServices: LogService[];
  logTemplates: LogTemplate[];
  resourceUsage: ServiceResourceUsage;
}

const mockQueues: ApplicationQueue[] = [
  {
    id: '1',
    name: 'user-service-queue',
    serviceType: '后端',
    instances: {
      total: 8,
      online: 7
    },
    logPatterns: [
      '/data/logs/user-service/*.log',
      '/data/logs/user-service/*/*.log'
    ],
    healthStatus: '良好',
    members: [
      { name: '游张政', role: 'admin' },
      { name: '石家濠', role: 'user' },
      { name: '路修远', role: 'user' }
    ],
    permission: 'admin',
    parsingServices: [
      { name: 'spring-log-parser', status: '在线', version: 'v2.3.1' },
      { name: 'mysql-log-parser', status: '灰度', version: 'v1.2.0-beta' }
    ],
    detectionServices: [
      { name: 'log-latency-detector', status: '在线', version: 'v2.0.5' },
      { name: 'log-error-pattern-detector', status: '在线', version: 'v1.8.2' }
    ],
    logTemplates: [
      { name: 'spring-service-log', version: 'v2.5.0', updateTime: '2024-03-12' },
      { name: 'mysql-slow-query-log', version: 'v1.8.2', updateTime: '2024-03-15' },
      { name: 'service-error-log', version: 'v2.0.1', updateTime: '2024-03-18' }
    ],
    resourceUsage: {
      parsingServices: {
        cpu: 1.8,
        memory: 2.3
      },
      detectionServices: {
        cpu: 2.5,
        memory: 1.2
      },
      federatedLearning: {
        cpu: 2.2,
        memory: 2.7
      }
    }
  },
  {
    id: '2',
    name: 'llm-inference-queue',
    serviceType: '模型推理',
    instances: {
      total: 6,
      online: 5
    },
    logPatterns: [
      '/data/logs/inference/*.log',
      '/data/logs/inference/error/*.log'
    ],
    healthStatus: '严重',
    members: [
      { name: '郭翼天', role: 'admin' },
      { name: '路修远', role: 'user' },
      { name: '石家濠', role: 'user' }
    ],
    permission: 'none',
    parsingServices: [
      { name: 'python-parser', status: '在线', version: 'v1.5.0' },
      { name: 'cuda-parser', status: '灰度', version: 'v0.9.0-beta' },
      { name: 'torch-parser', status: '下线', version: 'v1.0.0' }
    ],
    detectionServices: [
      { name: 'gpu-anomaly-detector', status: '在线', version: 'v2.1.0' },
      { name: 'latency-detector', status: '在线', version: 'v1.8.0' }
    ],
    logTemplates: [
      { name: 'python-error', version: 'v2.0.0', updateTime: '2024-03-10' },
      { name: 'cuda-error', version: 'v1.2.1', updateTime: '2024-03-08' },
      { name: 'inference-metrics', version: 'v2.1.0', updateTime: '2024-03-15' }
    ],
    resourceUsage: {
      parsingServices: {
        cpu: 35.8,
        memory: 42.3
      },
      detectionServices: {
        cpu: 28.5,
        memory: 31.2
      },
      federatedLearning: {
        cpu: 65.2,
        memory: 58.7
      }
    }
  },  {
    id: '3',
    name: 'nginx-gateway-queue',
    serviceType: '基础架构',
    instances: {
      total: 4,
      online: 4
    },
    logPatterns: [
      '/data/logs/nginx/*.log'
    ],
    healthStatus: '健康',
    members: [
      { name: '魏亚东', role: 'admin' },
      { name: '暴浩彤', role: 'user' }
    ],
    permission: 'user',
    parsingServices: [
      { name: 'nginx-log-parser', status: '在线', version: 'v3.1.0' }
    ],
    detectionServices: [
      { name: 'log-traffic-detector', status: '在线', version: 'v2.1.3' },
      { name: 'log-status-detector', status: '下线', version: 'v1.0.0' }
    ],
    logTemplates: [
      { name: 'nginx-access-log', version: 'v3.2.1', updateTime: '2024-03-10' },
      { name: 'nginx-error-log', version: 'v2.1.0', updateTime: '2024-03-16' }
    ],
    resourceUsage: {
      parsingServices: {
        cpu: 1.3,
        memory: 1.9
      },
      detectionServices: {
        cpu: 1.7,
        memory: 2.4
      },
      federatedLearning: {
        cpu: 2.6,
        memory: 1.8
      }
    }
  },
  {
    id: '4',
    name: 'react-frontend-queue',
    serviceType: '前端',
    instances: {
      total: 3,
      online: 3
    },
    logPatterns: [
      '/data/logs/frontend/*.log'
    ],
    healthStatus: '未接入',
    members: [
      { name: '孙八', role: 'admin' }
    ],
    permission: 'none',
    parsingServices: [],
    detectionServices: [],
    logTemplates: [],
    resourceUsage: {
      parsingServices: {
        cpu: 35.8,
        memory: 42.3
      },
      detectionServices: {
        cpu: 28.5,
        memory: 31.2
      },
      federatedLearning: {
        cpu: 65.2,
        memory: 58.7
      }
    }
  }
];

const ResourceGauge: React.FC<{
  value: number;
  title: string;
}> = ({ value, title }) => {
  const getColor = (val: number) => val > 2 ? '#E6A23C' : '#67C23A';
  const color = getColor(value);

  const option = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 3,
      splitNumber: 3,
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
          if (value === 3) return '3%';
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
        formatter: (value: number) => value.toFixed(2) + '%',
        color: color
      },
      data: [{
        value: value,
        name: title + '\n(阈值上限: 3%)'
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

const ResourceUsageContent: React.FC<{ 
  usage: ServiceResourceUsage;
  permission: ApplicationQueue['permission'];
}> = ({ usage, permission }) => {
  if (permission === 'none') {
    return <Text type="secondary">无权限查看资源使用情况</Text>;
  }

  const renderServiceUsage = (title: string, data: ResourceUsage) => (
    <div>
      <Text strong>{title}</Text>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginTop: 12,
        marginBottom: 12 
      }}>
        <ResourceGauge value={data.cpu} title="CPU使用率" />
        <ResourceGauge value={data.memory} title="内存占用率" />
      </div>
    </div>
  );

  return (
    <div style={{ width: 400 }}>
      {renderServiceUsage('日志解析服务', usage.parsingServices)}
      <Divider style={{ margin: '12px 0' }} />
      {renderServiceUsage('日志异常检测服务', usage.detectionServices)}
      <Divider style={{ margin: '12px 0' }} />
      {renderServiceUsage('联邦学习训练任务', usage.federatedLearning)}
    </div>
  );
};

const ApplicationQueues: React.FC = () => {
  const [queues] = useState<ApplicationQueue[]>(mockQueues);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getServiceTypeTag = (type: ServiceType) => {
    const config = {
      '后端': 'blue',
      '基础架构': 'purple',
      '前端': 'green',
      '模型推理': 'orange',
      '模型训练': 'geekblue'
    };
    return <Tag color={config[type]}>{type}</Tag>;
  };

  const getHealthStatusTag = (status: HealthStatus) => {
    const config = {
      '未接入': { color: 'default', icon: <MinusCircleOutlined /> },
      '良好': { color: 'success', icon: <CheckCircleOutlined /> },
      '健康': { color: 'processing', icon: <CheckCircleOutlined /> },
      '严重': { color: 'error', icon: <ExclamationCircleOutlined /> }
    };
    return (
      <Tag icon={config[status].icon} color={config[status].color}>
        {status}
      </Tag>
    );
  };

  const columns = [
    {
      title: '队列名称',
      key: 'name',
      render: (_, record: ApplicationQueue) => (
        <Space>
          {record.name}
          {getServiceTypeTag(record.serviceType)}
        </Space>
      ),
    },
    {
      title: '实例状态',
      key: 'instances',
      render: (_, record: ApplicationQueue) => (
        <Space>
          <Text>{record.instances.online} / {record.instances.total}</Text>
          {record.instances.online < record.instances.total && (
            <Tag color="warning">部分离线</Tag>
          )}
        </Space>
      ),
    },
    {
      title: '日志目录',
      key: 'logPatterns',
      render: (_, record: ApplicationQueue) => (
        <Space direction="vertical">
          {record.logPatterns.map((pattern, index) => (
            <Text key={index} style={{ fontFamily: 'monospace' }}>
              {pattern}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: '健康状态',
      key: 'healthStatus',
      render: (_, record: ApplicationQueue) => getHealthStatusTag(record.healthStatus),
    },
    {
      title: '队列成员',
      key: 'members',
      render: (_, record: ApplicationQueue) => (
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
      title: '日志解析服务',
      key: 'parsingServices',
      render: (_, record: ApplicationQueue) => (
        <Popover
          title="资源使用情况"
          content={<ResourceUsageContent 
            usage={record.resourceUsage} 
            permission={record.permission}
          />}
          trigger="hover"
          placement="bottom"
          overlayStyle={{ width: 'auto' }}
          align={{
            offset: [0, 10]
          }}
        >
          <Space direction="vertical">
            {record.parsingServices.map((service, index) => (
              <Space key={index}>
                <Text>{service.name}</Text>
                <Tag color={
                  service.status === '在线' ? 'success' :
                  service.status === '灰度' ? 'warning' : 'default'
                }>
                  {service.status}
                </Tag>
                <Text type="secondary">({service.version})</Text>
              </Space>
            ))}
          </Space>
        </Popover>
      ),
    },
    {
      title: '日志异常检测服务',
      key: 'detectionServices',
      render: (_, record: ApplicationQueue) => (
        <Popover
          title="资源使用情况"
          content={<ResourceUsageContent 
            usage={record.resourceUsage} 
            permission={record.permission}
          />}
          trigger="hover"
          placement="bottom"
          overlayStyle={{ width: 'auto' }}
          align={{
            offset: [0, 10]
          }}
        >
          <Space direction="vertical">
            {record.detectionServices.map((service, index) => (
              <Space key={index}>
                <Text>{service.name}</Text>
                <Tag color={
                  service.status === '在线' ? 'success' :
                  service.status === '灰度' ? 'warning' : 'default'
                }>
                  {service.status}
                </Tag>
                <Text type="secondary">({service.version})</Text>
              </Space>
            ))}
          </Space>
        </Popover>
      ),
    },
    {
      title: '日志模板集',
      key: 'logTemplates',
      render: (_, record: ApplicationQueue) => (
        <Space direction="vertical">
          {record.logTemplates.map((template, index) => (
            <Space key={index}>
              <Text>{template.name}</Text>
              <Tag color="processing">{template.version}</Tag>
              <Text type="secondary">({template.updateTime})</Text>
            </Space>
          ))}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: ApplicationQueue) => {
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
            <Tooltip title={isAdmin ? '生成令牌' : '无管理权限'}>
              <Button 
                icon={<KeyOutlined />} 
                disabled={!isAdmin}
              >
                令牌生成
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
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            新建应用队列
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={queues}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title="新建应用队列"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {/* 新建应用队列表单将在这里实现 */}
        <p>新建应用队列表单内容</p>
      </Modal>
    </PageContainer>
  );
};

export default ApplicationQueues;