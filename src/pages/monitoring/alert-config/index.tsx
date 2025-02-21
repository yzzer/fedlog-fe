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
  Switch,
  message,
  Tooltip,
  Typography
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  BellOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

interface AlertRule {
  id: string;
  name: string;
  serviceId: string;
  serviceName: string;
  type: 'known' | 'unknown' | 'latency';
  condition: {
    metric: string;
    operator: '>' | '>=' | '<' | '<=' | '=';
    threshold: number;
    duration: number;
  };
  severity: 'critical' | 'warning' | 'info';
  notification: {
    channels: string[];
    template: string;
  };
  status: boolean;
  createTime: string;
  creator: string;
}

// 模拟数据
const mockRules: AlertRule[] = [
  {
    id: 'rule-001',
    name: 'Nginx严重错误告警',
    serviceId: 'detect-001',
    serviceName: 'Nginx日志异常检测服务',
    type: 'known',
    condition: {
      metric: 'error_count',
      operator: '>=',
      threshold: 5,
      duration: 5
    },
    severity: 'critical',
    notification: {
      channels: ['email', 'sms'],
      template: '【严重】Nginx服务在过去{duration}分钟内发生{count}次严重错误，请立即检查。'
    },
    status: true,
    createTime: '2024-03-15 10:00:00',
    creator: '游张政'
  },
  {
    id: 'rule-002',
    name: '未知异常告警',
    serviceId: 'detect-001',
    serviceName: 'Nginx日志异常检测服务',
    type: 'unknown',
    condition: {
      metric: 'unknown_count',
      operator: '>=',
      threshold: 3,
      duration: 10
    },
    severity: 'warning',
    notification: {
      channels: ['email'],
      template: '【警告】检测到{count}个未知类型的异常，请及时关注。'
    },
    status: true,
    createTime: '2024-03-15 11:00:00',
    creator: '游张政'
  },
  {
    id: 'rule-003',
    name: '检测延迟告警',
    serviceId: 'detect-001',
    serviceName: 'Nginx日志异常检测服务',
    type: 'latency',
    condition: {
      metric: 'avg_latency',
      operator: '>',
      threshold: 100,
      duration: 3
    },
    severity: 'info',
    notification: {
      channels: ['email'],
      template: '检测服务平均延迟超过{threshold}ms，持续{duration}分钟，请关注性能情况。'
    },
    status: false,
    createTime: '2024-03-15 12:00:00',
    creator: '游张政'
  }
];

const AlertConfig: React.FC = () => {
  const [rules, setRules] = useState<AlertRule[]>(mockRules);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);
  const [form] = Form.useForm();

  // 处理创建/编辑规则
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRule) {
        // 更新规则
        setRules(rules.map(rule => 
          rule.id === editingRule.id ? { ...rule, ...values } : rule
        ));
        message.success('规则更新成功');
      } else {
        // 创建新规则
        const newRule = {
          id: `rule-${Date.now()}`,
          ...values,
          createTime: new Date().toLocaleString(),
          creator: '游张政'
        };
        setRules([...rules, newRule]);
        message.success('规则创建成功');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingRule(null);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '检测服务',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          known: { color: '#108ee9', text: '已知异常' },
          unknown: { color: '#f50', text: '未知异常' },
          latency: { color: '#87d068', text: '检测延迟' }
        };
        return <Tag color={typeMap[type].color}>{typeMap[type].text}</Tag>;
      }
    },
    {
      title: '告警条件',
      key: 'condition',
      render: (_, record: AlertRule) => (
        `${record.condition.metric} ${record.condition.operator} ${record.condition.threshold} 
         持续 ${record.condition.duration} 分钟`
      )
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const severityMap = {
          critical: { color: '#f5222d', text: '严重' },
          warning: { color: '#faad14', text: '警告' },
          info: { color: '#1890ff', text: '提示' }
        };
        return <Tag color={severityMap[severity].color}>{severityMap[severity].text}</Tag>;
      }
    },
    {
      title: '通知方式',
      dataIndex: ['notification', 'channels'],
      key: 'channels',
      render: (channels: string[]) => (
        <Space>
          {channels.map(channel => (
            <Tag key={channel}>
              {channel === 'email' ? '邮件' : channel === 'sms' ? '短信' : channel}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: AlertRule) => (
        <Switch
          checked={status}
          onChange={(checked) => {
            setRules(rules.map(rule =>
              rule.id === record.id ? { ...rule, status: checked } : rule
            ));
          }}
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: AlertRule) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingRule(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: '确认删除',
                content: `确定要删除规则"${record.name}"吗？`,
                onOk: () => {
                  setRules(rules.filter(rule => rule.id !== record.id));
                  message.success('规则删除成功');
                }
              });
            }}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingRule(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            新建告警规则
          </Button>

          <Table
            columns={columns}
            dataSource={rules}
            rowKey="id"
            pagination={false}
          />
        </Space>
      </Card>

      <Modal
        title={editingRule ? '编辑告警规则' : '新建告警规则'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          setEditingRule(null);
          form.resetFields();
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="规则名称"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="检测服务"
            name="serviceId"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="detect-001">Nginx日志异常检测服务</Option>
              <Option value="detect-002">Spring应用异常检测服务</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="告警类型"
            name="type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="known">已知异常</Option>
              <Option value="unknown">未知异常</Option>
              <Option value="latency">检测延迟</Option>
            </Select>
          </Form.Item>

          <Form.Item label="告警条件" required>
            <Space align="baseline">
              <Form.Item
                name={['condition', 'metric']}
                rules={[{ required: true }]}
              >
                <Select style={{ width: 150 }}>
                  <Option value="error_count">错误数量</Option>
                  <Option value="unknown_count">未知异常数量</Option>
                  <Option value="avg_latency">平均延迟</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['condition', 'operator']}
                rules={[{ required: true }]}
              >
                <Select style={{ width: 80 }}>
                  <Option value=">">{'>'}</Option>
                  <Option value=">=">{'>='}</Option>
                  <Option value="<">{'<'}</Option>
                  <Option value="<=">{'<='}</Option>
                  <Option value="=">{'='}</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['condition', 'threshold']}
                rules={[{ required: true }]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <span>持续</span>
              <Form.Item
                name={['condition', 'duration']}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <span>分钟</span>
            </Space>
          </Form.Item>

          <Form.Item
            label="严重程度"
            name="severity"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="critical">严重</Option>
              <Option value="warning">警告</Option>
              <Option value="info">提示</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="通知方式"
            name={['notification', 'channels']}
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              <Option value="email">邮件</Option>
              <Option value="sms">短信</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="通知模板"
            name={['notification', 'template']}
            rules={[{ required: true }]}
            tooltip="支持变量：{duration}、{count}、{threshold}"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="启用状态"
            name="status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default AlertConfig; 