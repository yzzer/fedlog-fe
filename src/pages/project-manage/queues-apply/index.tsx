import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card,
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Typography,
  Modal
} from 'antd';
import {
  EditOutlined,
  RollbackOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface GpuResource {
  type: 'NVIDIA RTX 3090-24GB' | 'NVIDIA RTX 2080Ti-11GB';
  count: number;
}

interface QueueApplication {
  id: string;
  queueName: string;
  environment: 'prod' | 'test' | 'dev';
  resources: {
    cpu: number;
    memory: number;
    gpus: GpuResource[];
  };
  status: 'pending' | 'approved' | 'rejected';
  applyTime: string;
  approveTime?: string;
  reason?: string;
}

// 修改模拟数据
const mockApplications: QueueApplication[] = [
  {
    id: '1',
    queueName: 'k8s-prod-fed-queue',
    environment: 'prod',
    resources: {
      cpu: 100,
      memory: 256,
      gpus: [
        { type: 'NVIDIA RTX 3090-24GB', count: 4 },
        { type: 'NVIDIA RTX 2080Ti-11GB', count: 2 }
      ]
    },
    status: 'approved',
    applyTime: '2024-03-10 14:30:00',
    approveTime: '2024-03-11 09:15:00'
  },
  {
    id: '2',
    queueName: 'hdfs-test-fed-queue',
    environment: 'test',
    resources: {
      cpu: 40,
      memory: 128,
      gpus: [
        { type: 'NVIDIA RTX 3090-24GB', count: 2 },
        { type: 'NVIDIA RTX 2080Ti-11GB', count: 4 }
      ]
    },
    status: 'pending',
    applyTime: '2024-03-12 16:45:00'
  },
  {
    id: '3',
    queueName: 'mysql-dev-fed-queue',
    environment: 'dev',
    resources: {
      cpu: 20,
      memory: 64,
      gpus: [
        { type: 'NVIDIA RTX 2080Ti-11GB', count: 2 }
      ]
    },
    status: 'rejected',
    applyTime: '2024-03-09 11:20:00',
    approveTime: '2024-03-10 10:30:00',
    reason: '资源申请量超出限制，请调整后重新申请'
  }
];

const QueueApplications: React.FC = () => {
  const [applications] = useState<QueueApplication[]>(mockApplications);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getEnvironmentTag = (env: QueueApplication['environment']) => {
    const config = {
      prod: { color: 'success', text: '生产' },
      test: { color: 'warning', text: '测试' },
      dev: { color: 'processing', text: '开发' }
    };
    return <Tag color={config[env].color}>{config[env].text}</Tag>;
  };

  const getStatusTag = (status: QueueApplication['status']) => {
    const config = {
      pending: { color: 'processing', text: '审批中' },
      approved: { color: 'success', text: '已通过' },
      rejected: { color: 'error', text: '已拒绝' }
    };
    return <Tag color={config[status].color}>{config[status].text}</Tag>;
  };

  const columns = [
    {
      title: '队列名称',
      key: 'queueName',
      render: (_, record: QueueApplication) => (
        <Space>
          {record.queueName}
          {getEnvironmentTag(record.environment)}
        </Space>
      ),
    },
    {
      title: '申请资源',
      key: 'resources',
      render: (_, record: QueueApplication) => (
        <Space direction="vertical">
          <Text>CPU：{record.resources.cpu}核</Text>
          <Text>内存：{record.resources.memory}GB</Text>
          <Space direction="vertical">
            <Text>GPU：</Text>
            {record.resources.gpus.map((gpu, index) => (
              <Text key={index} style={{ paddingLeft: 16 }}>
                {gpu.type} × {gpu.count}卡
              </Text>
            ))}
          </Space>
        </Space>
      ),
    },
    {
      title: '申请状态',
      key: 'status',
      render: (_, record: QueueApplication) => (
        <Space direction="vertical">
          {getStatusTag(record.status)}
          <Text type="secondary" style={{ fontSize: '12px' }}>
            申请时间：{record.applyTime}
          </Text>
          {record.approveTime && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              审批时间：{record.approveTime}
            </Text>
          )}
          {record.reason && (
            <Text type="danger" style={{ fontSize: '12px' }}>
              原因：{record.reason}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: QueueApplication) => {
        if (record.status === 'approved') {
          return (
            <Space>
              <Button disabled icon={<EditOutlined />}>编辑</Button>
              <Button disabled icon={<RollbackOutlined />}>撤回</Button>
            </Space>
          );
        }

        if (record.status === 'pending') {
          return (
            <Space>
              <Button type="primary" icon={<EditOutlined />}>编辑</Button>
              <Button danger icon={<RollbackOutlined />}>撤回</Button>
            </Space>
          );
        }

        return (
          <Space>
            <Button type="primary" icon={<EditOutlined />}>重新申请</Button>
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
            申请联邦队列
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={applications}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title="申请联邦队列"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {/* 申请表单将包含 GPU 选项 */}
        <p>申请表单内容</p>
      </Modal>
    </PageContainer>
  );
};

export default QueueApplications;