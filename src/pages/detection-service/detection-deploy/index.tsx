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
  Tooltip,
  Typography,
  Statistic,
  Row,
  Col,
  message
} from 'antd';
import {
  PlusOutlined,
  PlayCircleOutlined,
  StopOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

interface DetectionService {
  id: string;
  name: string;
  modelName: string;
  modelVersion: string;
  encodingTaskId: string;
  encodingTaskName: string;
  appQueue: string;
  status: 'running' | 'stopped' | 'failed';
  parameters: {
    sensitivityThreshold: number;
    cacheTimeout: number;
    batchSize: number;
  };
  metrics: {
    totalProcessed: number;
    anomaliesDetected: number;
    avgLatency: number;
    accuracy: number;
  };
  createTime: string;
  creator: string;
}

// 模拟数据
const mockServices: DetectionService[] = [
  {
    id: 'detect-001',
    name: 'Nginx异常检测服务',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.2.0',
    encodingTaskId: 'encode-001',
    encodingTaskName: 'Nginx日志编码服务',
    appQueue: 'nginx-gateway-queue',
    status: 'running',
    parameters: {
      sensitivityThreshold: 0.85,
      cacheTimeout: 3600,
      batchSize: 100
    },
    metrics: {
      totalProcessed: 1000000,
      anomaliesDetected: 150,
      avgLatency: 23,
      accuracy: 0.95
    },
    createTime: '2024-03-15 10:00:00',
    creator: '游张政'
  },
  {
    id: 'detect-002',
    name: 'Spring应用异常检测服务',
    modelName: 'LogAnomaly',
    modelVersion: 'v1.1.0',
    encodingTaskId: 'encode-002',
    encodingTaskName: 'Spring应用日志编码服务',
    appQueue: 'spring-app-queue',
    status: 'running',
    parameters: {
      sensitivityThreshold: 0.80,
      cacheTimeout: 1800,
      batchSize: 50
    },
    metrics: {
      totalProcessed: 500000,
      anomaliesDetected: 85,
      avgLatency: 18,
      accuracy: 0.92
    },
    createTime: '2024-03-14 14:30:00',
    creator: '游张政'
  }
];

const DetectionDeploy: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<DetectionService | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '服务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: DetectionService) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      )
    },
    {
      title: '模型版本',
      key: 'model',
      render: (_, record: DetectionService) => (
        `${record.modelName} (${record.modelVersion})`
      )
    },
    {
      title: '编码服务',
      dataIndex: 'encodingTaskName',
      key: 'encodingTask',
    },
    {
      title: '应用队列',
      dataIndex: 'appQueue',
      key: 'appQueue',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          running: { color: 'success', text: '运行中' },
          stopped: { color: 'default', text: '已停止' },
          failed: { color: 'error', text: '异常' }
        };
        return <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>;
      }
    },
    {
      title: '检测指标',
      key: 'metrics',
      render: (_, record: DetectionService) => (
        <Space>
          <Tooltip title="准确率">
            <Tag color="blue">{(record.metrics.accuracy * 100).toFixed(1)}%</Tag>
          </Tooltip>
          <Tooltip title="平均延迟">
            <Tag color="orange">{record.metrics.avgLatency}ms</Tag>
          </Tooltip>
        </Space>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DetectionService) => (
        <Space size="middle">
          {record.status === 'running' ? (
            <Button 
              type="text" 
              danger
              icon={<StopOutlined />}
              onClick={() => handleStopService(record)}
            >
              停止
            </Button>
          ) : (
            <Button
              type="text"
              icon={<PlayCircleOutlined />}
              onClick={() => handleStartService(record)}
            >
              启动
            </Button>
          )}
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={() => handleEditService(record)}
          >
            参数
          </Button>
          <Button
            type="text"
            icon={<LineChartOutlined />}
            onClick={() => handleViewMetrics(record)}
          >
            监控
          </Button>
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: DetectionService) => {
    setSelectedService(record);
    setDetailModalVisible(true);
  };

  const handleStartService = (record: DetectionService) => {
    message.success(`启动服务: ${record.name}`);
  };

  const handleStopService = (record: DetectionService) => {
    message.success(`停止服务: ${record.name}`);
  };

  const handleEditService = (record: DetectionService) => {
    setSelectedService(record);
    form.setFieldsValue({
      ...record,
      parameters: {
        ...record.parameters
      }
    });
    setCreateModalVisible(true);
  };

  const handleViewMetrics = (record: DetectionService) => {
    message.info('查看监控指标');
  };

  return (
    <PageContainer>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedService(null);
              form.resetFields();
              setCreateModalVisible(true);
            }}
          >
            新建检测服务
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockServices}
          rowKey="id"
        />
      </Card>

      {/* 新建/编辑服务弹窗 */}
      <Modal
        title={selectedService ? '编辑检测参数' : '新建检测服务'}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => {
          form.validateFields().then(values => {
            console.log(values);
            message.success(`${selectedService ? '更新' : '创建'}成功`);
            setCreateModalVisible(false);
          });
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          {!selectedService && (
            <>
              <Form.Item
                label="服务名称"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="请输入服务名称" />
              </Form.Item>

              <Form.Item
                label="模型版本"
                name="model"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="loganomaly-v1.2.0">LogAnomaly v1.2.0</Option>
                  <Option value="loganomaly-v1.1.0">LogAnomaly v1.1.0</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="编码服务"
                name="encodingTask"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="encode-001">Nginx日志编码服务</Option>
                  <Option value="encode-002">Spring应用日志编码服务</Option>
                </Select>
              </Form.Item>
            </>
          )}

          <Form.Item
            label={
              <Space>
                <span>检测灵敏度</span>
                <Tooltip title="值越大，检测越严格">
                  <QuestionCircleOutlined />
                </Tooltip>
              </Space>
            }
            name={['parameters', 'sensitivityThreshold']}
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              max={1}
              step={0.01}
              style={{ width: 200 }}
            />
          </Form.Item>

          <Form.Item
            label="结果缓存时长(秒)"
            name={['parameters', 'cacheTimeout']}
            rules={[{ required: true }]}
          >
            <InputNumber min={60} style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            label="批处理大小"
            name={['parameters', 'batchSize']}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={1000} style={{ width: 200 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 服务详情弹窗 */}
      <Modal
        title="服务详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedService && (
          <>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="服务名称" span={2}>
                {selectedService.name}
              </Descriptions.Item>
              <Descriptions.Item label="模型版本">
                {selectedService.modelName} ({selectedService.modelVersion})
              </Descriptions.Item>
              <Descriptions.Item label="编码服务">
                {selectedService.encodingTaskName}
              </Descriptions.Item>
              <Descriptions.Item label="应用队列">
                {selectedService.appQueue}
              </Descriptions.Item>
              <Descriptions.Item label="创建信息">
                {selectedService.creator} 于 {selectedService.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="检测参数" span={2}>
                <Space direction="vertical">
                  <Text>检测灵敏度: {selectedService.parameters.sensitivityThreshold}</Text>
                  <Text>结果缓存: {selectedService.parameters.cacheTimeout}秒</Text>
                  <Text>批处理大小: {selectedService.parameters.batchSize}</Text>
                </Space>
              </Descriptions.Item>
            </Descriptions>
            
            <div style={{ marginTop: 24 }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="已处理日志"
                      value={selectedService.metrics.totalProcessed}
                      suffix="条"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="检测异常"
                      value={selectedService.metrics.anomaliesDetected}
                      suffix="条"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="平均延迟"
                      value={selectedService.metrics.avgLatency}
                      suffix="ms"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="准确率"
                      value={selectedService.metrics.accuracy * 100}
                      suffix="%"
                      precision={1}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Modal>
    </PageContainer>
  );
};

export default DetectionDeploy; 