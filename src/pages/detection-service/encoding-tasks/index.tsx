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
  Radio,
  Descriptions,
  Tooltip,
  Typography,
  message
} from 'antd';
import {
  PlusOutlined,
  PlayCircleOutlined,
  StopOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

interface EncodingTask {
  id: string;
  name: string;
  appQueue: string;
  templateName: string;
  templateVersion: string;
  status: 'running' | 'stopped' | 'failed';
  windowStrategy: {
    type: 'time' | 'count';
    value: number;
    unit?: 'minutes' | 'hours';
  };
  cachePolicy: {
    retentionDays: number;
    cleanupTime: string;
  };
  resourceBaseline: {
    cpu: number;
    memory: number;
    disk: number;
  };
  createTime: string;
  creator: string;
}

// 模拟数据
const mockTasks: EncodingTask[] = [
  {
    id: 'encode-001',
    name: 'Nginx日志编码服务',
    appQueue: 'nginx-gateway-queue',
    templateName: 'nginx-log-template',
    templateVersion: 'v1.2.5',
    status: 'running',
    windowStrategy: {
      type: 'time',
      value: 30,
      unit: 'minutes'
    },
    cachePolicy: {
      retentionDays: 7,
      cleanupTime: '03:00'
    },
    resourceBaseline: {
      cpu: 15,
      memory: 256,
      disk: 500
    },
    createTime: '2024-03-15 10:00:00',
    creator: '游张政'
  },
  {
    id: 'encode-002',
    name: 'Spring应用日志编码服务',
    appQueue: 'spring-app-queue',
    templateName: 'spring-log-template',
    templateVersion: 'v1.1.0',
    status: 'running',
    windowStrategy: {
      type: 'count',
      value: 1000
    },
    cachePolicy: {
      retentionDays: 5,
      cleanupTime: '02:00'
    },
    resourceBaseline: {
      cpu: 20,
      memory: 512,
      disk: 800
    },
    createTime: '2024-03-14 14:30:00',
    creator: '游张政'
  }
];

const EncodingTasks: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<EncodingTask | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '服务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: EncodingTask) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      )
    },
    {
      title: '应用队列',
      dataIndex: 'appQueue',
      key: 'appQueue',
    },
    {
      title: '模板集',
      key: 'template',
      render: (_, record: EncodingTask) => (
        `${record.templateName} (${record.templateVersion})`
      )
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
      title: '窗口策略',
      key: 'window',
      render: (_, record: EncodingTask) => (
        record.windowStrategy.type === 'time' 
          ? `${record.windowStrategy.value}${record.windowStrategy.unit}`
          : `${record.windowStrategy.value}条`
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: EncodingTask) => (
        <Space size="middle">
          {record.status === 'running' ? (
            <Button 
              type="text" 
              danger
              icon={<StopOutlined />}
              onClick={() => handleStopTask(record)}
            >
              停止
            </Button>
          ) : (
            <Button
              type="text"
              icon={<PlayCircleOutlined />}
              onClick={() => handleStartTask(record)}
            >
              启动
            </Button>
          )}
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditTask(record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: EncodingTask) => {
    setSelectedTask(record);
    setDetailModalVisible(true);
  };

  const handleStartTask = (record: EncodingTask) => {
    message.success(`启动服务: ${record.name}`);
  };

  const handleStopTask = (record: EncodingTask) => {
    message.success(`停止服务: ${record.name}`);
  };

  const handleEditTask = (record: EncodingTask) => {
    setSelectedTask(record);
    form.setFieldsValue({
      ...record,
      windowStrategy: {
        ...record.windowStrategy,
        value: record.windowStrategy.value
      },
      cachePolicy: {
        ...record.cachePolicy
      }
    });
    setCreateModalVisible(true);
  };

  const handleDeleteTask = (record: EncodingTask) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除服务 "${record.name}" 吗？`,
      onOk: () => {
        message.success('删除成功');
      }
    });
  };

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
            新建编码服务
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockTasks}
          rowKey="id"
        />
      </Card>

      {/* 新建/编辑服务弹窗 */}
      <Modal
        title={selectedTask ? '编辑编码服务' : '新建编码服务'}
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
        >
          <Form.Item
            label="服务名称"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入服务名称" />
          </Form.Item>

          <Form.Item
            label="应用队列"
            name="appQueue"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="nginx-gateway-queue">nginx-gateway-queue</Option>
              <Option value="spring-app-queue">spring-app-queue</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="模板集版本"
            name={['template', 'version']}
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="nginx-v1.2.5">nginx-log-template v1.2.5</Option>
              <Option value="spring-v1.1.0">spring-log-template v1.1.0</Option>
            </Select>
          </Form.Item>

          <Form.Item label="窗口切割策略">
            <Space align="baseline">
              <Form.Item
                name={['windowStrategy', 'type']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="time">时间</Radio>
                  <Radio value="count">数量</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name={['windowStrategy', 'value']}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues?.windowStrategy?.type !== currentValues?.windowStrategy?.type
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue(['windowStrategy', 'type']) === 'time' ? (
                    <Form.Item
                      name={['windowStrategy', 'unit']}
                      rules={[{ required: true }]}
                    >
                      <Select style={{ width: 100 }}>
                        <Option value="minutes">分钟</Option>
                        <Option value="hours">小时</Option>
                      </Select>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item label="缓存策略">
            <Space>
              <Form.Item
                name={['cachePolicy', 'retentionDays']}
                label="保留天数"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={30} />
              </Form.Item>
              <Form.Item
                name={['cachePolicy', 'cleanupTime']}
                label="清理时间"
                rules={[{ required: true }]}
              >
                <Input placeholder="HH:mm" />
              </Form.Item>
            </Space>
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
        {selectedTask && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="服务名称" span={2}>
              {selectedTask.name}
            </Descriptions.Item>
            <Descriptions.Item label="应用队列">
              {selectedTask.appQueue}
            </Descriptions.Item>
            <Descriptions.Item label="模板集">
              {selectedTask.templateName} ({selectedTask.templateVersion})
            </Descriptions.Item>
            <Descriptions.Item label="窗口策略">
              {selectedTask.windowStrategy.type === 'time'
                ? `${selectedTask.windowStrategy.value}${selectedTask.windowStrategy.unit}`
                : `${selectedTask.windowStrategy.value}条`}
            </Descriptions.Item>
            <Descriptions.Item label="缓存策略">
              保留{selectedTask.cachePolicy.retentionDays}天，
              {selectedTask.cachePolicy.cleanupTime}清理
            </Descriptions.Item>
            <Descriptions.Item label="资源基线" span={2}>
              <Space direction="vertical">
                <Text>CPU使用率: {selectedTask.resourceBaseline.cpu}%</Text>
                <Text>内存占用: {selectedTask.resourceBaseline.memory}MB</Text>
                <Text>磁盘使用: {selectedTask.resourceBaseline.disk}MB</Text>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="创建人">
              {selectedTask.creator}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {selectedTask.createTime}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default EncodingTasks; 