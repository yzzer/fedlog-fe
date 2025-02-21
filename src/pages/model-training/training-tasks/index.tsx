import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Descriptions,
  message,
  Tooltip,
  Typography,
  Popover
} from 'antd';
import {
  PlayCircleOutlined,
  StopOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  LockOutlined
} from '@ant-design/icons';
import TrainingProgress from './components/TrainingProgress';

const { Text } = Typography;
const { Option } = Select;

interface TrainingTask {
  id: string;
  name: string;
  federatedQueue: string;
  appQueue: string;
  templateName: string;
  templateVersion: string;
  modelName: string;
  modelVersion: string;
  status: 'training' | 'completed' | 'failed' | 'not_converged';
  generatedModelName?: string;
  generatedModelVersion?: string;
  creator: string;
  createTime: string;
  convergenceStrategy: {
    type: 'loss' | 'accuracy' | 'custom';
    threshold: number;
    window: number;
  };
  permissionUsers: string[];
}

// 模拟数据
const mockTasks: TrainingTask[] = [
  {
    id: 'task-001',
    name: 'Nginx日志异常检测模型训练',
    federatedQueue: 'fed-queue-001',
    appQueue: 'nginx-gateway-queue',
    templateName: 'nginx-log-template',
    templateVersion: 'v1.2.5',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.2.0',
    status: 'training',
    creator: '游张政',
    createTime: '2024-03-15 10:00:00',
    convergenceStrategy: {
      type: 'loss',
      threshold: 0.01,
      window: 5
    },
    permissionUsers: ['游张政', '路修远', '石家濠']
  },
  {
    id: 'task-002',
    name: 'Spring应用日志异常检测',
    federatedQueue: 'fed-queue-002',
    appQueue: 'spring-app-queue',
    templateName: 'spring-log-template',
    templateVersion: 'v1.1.0',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.1.0',
    status: 'completed',
    generatedModelName: 'SpringLogAnomaly',
    generatedModelVersion: 'v1.0.0',
    creator: '路修远',
    createTime: '2024-03-14 14:30:00',
    convergenceStrategy: {
      type: 'accuracy',
      threshold: 0.95,
      window: 3
    },
    permissionUsers: ['路修远', '石家濠']
  },
  {
    id: 'task-003',
    name: 'MySQL慢查询日志异常检测',
    federatedQueue: 'fed-queue-003',
    appQueue: 'mysql-service-queue',
    templateName: 'mysql-slow-query-template',
    templateVersion: 'v1.0.0',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.2.0',
    status: 'failed',
    creator: '游张政',
    createTime: '2024-03-13 09:15:00',
    convergenceStrategy: {
      type: 'loss',
      threshold: 0.01,
      window: 5
    },
    permissionUsers: ['游张政', '石家濠']
  },
  {
    id: 'task-004',
    name: 'Redis操作日志异常检测',
    federatedQueue: 'fed-queue-001',
    appQueue: 'redis-service-queue',
    templateName: 'redis-log-template',
    templateVersion: 'v1.0.0',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.2.0',
    status: 'not_converged',
    creator: '石家濠',
    createTime: '2024-03-12 16:45:00',
    convergenceStrategy: {
      type: 'custom',
      threshold: 0.85,
      window: 10
    },
    permissionUsers: ['石家濠']
  },
  {
    id: 'task-005',
    name: 'Kafka消息日志异常检测',
    federatedQueue: 'fed-queue-002',
    appQueue: 'kafka-service-queue',
    templateName: 'kafka-log-template',
    templateVersion: 'v1.1.0',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.2.0',
    status: 'completed',
    generatedModelName: 'KafkaLogAnomaly',
    generatedModelVersion: 'v1.0.0',
    creator: '游张政',
    createTime: '2024-03-11 11:20:00',
    convergenceStrategy: {
      type: 'loss',
      threshold: 0.01,
      window: 5
    },
    permissionUsers: ['游张政', '路修远']
  }
];

// 添加模拟的训练进度数据
const mockTrainingProgress = {
  'task-001': {
    loss: Array.from({ length: 20 }, (_, i) => ({
      epoch: i + 1,
      value: 1.5 * Math.exp(-0.2 * i) + 0.1 * Math.random()
    })),
    accuracy: Array.from({ length: 20 }, (_, i) => ({
      epoch: i + 1,
      value: 0.5 + 0.4 * (1 - Math.exp(-0.15 * i)) + 0.05 * Math.random()
    }))
  }
};

const TrainingTasks: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TrainingTask | null>(null);
  const [form] = Form.useForm();

  const handleViewDetail = (record: TrainingTask) => {
    setSelectedTask(record);
    setDetailModalVisible(true);
  };

  const handleStopTask = (record: TrainingTask) => {
    message.success(`已停止任务: ${record.name}`);
  };

  const handleEditTask = (record: TrainingTask) => {
    setSelectedTask(record);
    form.setFieldsValue(record);
    setCreateModalVisible(true);
  };

  const handleRequestPermission = (record: TrainingTask) => {
    message.success(`已发送权限申请给: ${record.creator}`);
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TrainingTask) => (
        <Button type="link" onClick={() => handleViewDetail(record)}>
          {text}
        </Button>
      )
    },
    {
      title: '关联模板集',
      key: 'template',
      render: (_, record: TrainingTask) => (
        <Space direction="vertical" size={0}>
          <Text>{record.templateName}</Text>
          <Tag color="blue">{record.templateVersion}</Tag>
        </Space>
      )
    },
    {
      title: '模型代码',
      key: 'model',
      render: (_, record: TrainingTask) => (
        <Space direction="vertical" size={0}>
          <Text>{record.modelName}</Text>
          <Tag color="purple">{record.modelVersion}</Tag>
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: TrainingTask) => {
        const statusMap = {
          training: { color: 'processing', text: '训练中' },
          completed: { color: 'success', text: '已完成' },
          failed: { color: 'error', text: '失败' },
          not_converged: { color: 'warning', text: '未收敛' }
        };

        const tag = (
          <Tag color={statusMap[status].color}>
            {statusMap[status].text}
          </Tag>
        );

        if (status === 'training' && mockTrainingProgress[record.id]) {
          return (
            <Popover
              content={
                <TrainingProgress data={mockTrainingProgress[record.id]} />
              }
              title="训练进度"
              trigger="hover"
              placement="right"
            >
              {tag}
            </Popover>
          );
        }

        return tag;
      }
    },
    {
      title: '生成模型',
      key: 'generatedModel',
      render: (_, record: TrainingTask) => (
        record.generatedModelName ? (
          <Space direction="vertical" size={0}>
            <Text>{record.generatedModelName}</Text>
            <Tag color="green">{record.generatedModelVersion}</Tag>
          </Space>
        ) : (
          '-'
        )
      )
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: TrainingTask) => {
        const isCreator = record.creator === '游张政';
        const hasPermission = record.permissionUsers.includes('游张政');

        if (isCreator) {
          return (
            <Space>
              <Button 
                type="link" 
                icon={<EyeOutlined />}
                onClick={() => handleViewDetail(record)}
              >
                查看
              </Button>
              {record.status === 'training' && (
                <Button 
                  type="link" 
                  danger
                  icon={<StopOutlined />}
                  onClick={() => handleStopTask(record)}
                >
                  终止
                </Button>
              )}
              <Button 
                type="link" 
                icon={<EditOutlined />}
                onClick={() => handleEditTask(record)}
              >
                编辑
              </Button>
            </Space>
          );
        } else if (hasPermission) {
          return (
            <Button 
              type="link" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            >
              查看
            </Button>
          );
        } else {
          return (
            <Button 
              type="link" 
              icon={<LockOutlined />}
              onClick={() => handleRequestPermission(record)}
            >
              申请权限
            </Button>
          );
        }
      }
    }
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedTask(null);
              form.resetFields();
              setCreateModalVisible(true);
            }}
          >
            新建训练任务
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={mockTasks}
          rowKey="id"
        />
      </Card>

      {/* 新建/编辑任务弹窗 */}
      <Modal
        title={selectedTask ? '编辑训练任务' : '新建训练任务'}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => {
          form.validateFields().then(values => {
            console.log(values);
            message.success(`${selectedTask ? '编辑' : '创建'}成功`);
            setCreateModalVisible(false);
          });
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            federatedQueue: 'fed-queue-001',
            appQueue: 'nginx-gateway-queue',
            convergenceStrategy: {
              type: 'loss',
              threshold: 0.01,
              window: 5
            }
          }}
        >
          <Form.Item
            label="任务名称"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>

          <Form.Item
            label="联邦队列"
            name="federatedQueue"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="fed-queue-001">fed-queue-001</Option>
              <Option value="fed-queue-002">fed-queue-002</Option>
              <Option value="fed-queue-003">fed-queue-003</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="应用队列"
            name="appQueue"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="nginx-gateway-queue">nginx-gateway-queue</Option>
              <Option value="spring-app-queue">spring-app-queue</Option>
              <Option value="mysql-service-queue">mysql-service-queue</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <Space>
                <span>收敛策略</span>
                <Tooltip title="设置模型训练完成和未收敛的判断条件">
                  <QuestionCircleOutlined />
                </Tooltip>
              </Space>
            }
          >
            <Form.Item
              name={['convergenceStrategy', 'type']}
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="loss">损失值策略</Option>
                <Option value="accuracy">准确率策略</Option>
                <Option value="custom">自定义指标</Option>
              </Select>
            </Form.Item>
            <Space>
              <Form.Item
                name={['convergenceStrategy', 'threshold']}
                rules={[{ required: true }]}
              >
                <InputNumber 
                  step={0.01} 
                  placeholder="阈值"
                  style={{ width: 120 }}
                />
              </Form.Item>
              <Form.Item
                name={['convergenceStrategy', 'window']}
                rules={[{ required: true }]}
              >
                <InputNumber 
                  placeholder="窗口大小"
                  style={{ width: 120 }}
                />
              </Form.Item>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 任务详情弹窗 */}
      <Modal
        title="任务详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedTask && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="任务名称" span={2}>
              {selectedTask.name}
            </Descriptions.Item>
            <Descriptions.Item label="联邦队列">
              {selectedTask.federatedQueue}
            </Descriptions.Item>
            <Descriptions.Item label="应用队列">
              {selectedTask.appQueue}
            </Descriptions.Item>
            <Descriptions.Item label="关联模板集">
              {selectedTask.templateName} ({selectedTask.templateVersion})
            </Descriptions.Item>
            <Descriptions.Item label="模型代码">
              {selectedTask.modelName} ({selectedTask.modelVersion})
            </Descriptions.Item>
            <Descriptions.Item label="收敛策略" span={2}>
              <Space direction="vertical">
                <Text>类型: {selectedTask.convergenceStrategy.type}</Text>
                <Text>阈值: {selectedTask.convergenceStrategy.threshold}</Text>
                <Text>窗口大小: {selectedTask.convergenceStrategy.window}</Text>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="创建人">
              {selectedTask.creator}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {selectedTask.createTime}
            </Descriptions.Item>
            {selectedTask.generatedModelName && (
              <>
                <Descriptions.Item label="生成模型">
                  {selectedTask.generatedModelName}
                </Descriptions.Item>
                <Descriptions.Item label="模型版本">
                  {selectedTask.generatedModelVersion}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default TrainingTasks; 