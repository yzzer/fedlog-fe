import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Tag,
  message,
  Popconfirm 
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

interface AlarmRule {
  id: string;
  name: string;
  type: 'anomaly' | 'fault' | 'latency';
  threshold: number;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive';
  notification: string[];
  description: string;
}

const mockRules: AlarmRule[] = [
  {
    id: '1',
    name: '异常点数量告警',
    type: 'anomaly',
    threshold: 10,
    severity: 'high',
    status: 'active',
    notification: ['email', 'sms'],
    description: '当检测到的异常点数量超过阈值时触发告警'
  },
  {
    id: '2',
    name: '故障数量告警',
    type: 'fault',
    threshold: 5,
    severity: 'medium',
    status: 'active',
    notification: ['email'],
    description: '当故障数量超过阈值时触发告警'
  },
  {
    id: '3',
    name: '检测延迟告警',
    type: 'latency',
    threshold: 30,
    severity: 'low',
    status: 'inactive',
    notification: ['email', 'sms'],
    description: '当检测延迟超过阈值时触发告警'
  }
];

const AlarmConfig: React.FC = () => {
  const [rules, setRules] = useState<AlarmRule[]>(mockRules);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<AlarmRule | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingRule(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: AlarmRule) => {
    setEditingRule(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    message.success('删除成功');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRule) {
        // 编辑现有规则
        setRules(rules.map(rule => 
          rule.id === editingRule.id ? { ...rule, ...values } : rule
        ));
        message.success('更新成功');
      } else {
        // 添加新规则
        const newRule = {
          ...values,
          id: `${Date.now()}`,
          status: 'active'
        };
        setRules([...rules, newRule]);
        message.success('添加成功');
      }
      setModalVisible(false);
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
      title: '监控类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          anomaly: '异常点',
          fault: '故障',
          latency: '延迟'
        };
        return typeMap[type as keyof typeof typeMap];
      }
    },
    {
      title: '阈值',
      dataIndex: 'threshold',
      key: 'threshold',
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const colorMap = {
          high: 'red',
          medium: 'orange',
          low: 'green'
        };
        const textMap = {
          high: '高',
          medium: '中',
          low: '低'
        };
        return (
          <Tag color={colorMap[severity as keyof typeof colorMap]}>
            {textMap[severity as keyof typeof textMap]}
          </Tag>
        );
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '通知方式',
      dataIndex: 'notification',
      key: 'notification',
      render: (notification: string[]) => (
        <Space>
          {notification.map(item => (
            <Tag key={item} color="blue">
              {item === 'email' ? '邮件' : '短信'}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlarmRule) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条规则吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加告警规则
          </Button>
          <Table 
            columns={columns} 
            dataSource={rules}
            rowKey="id"
          />
        </Space>

        <Modal
          title={editingRule ? '编辑告警规则' : '添加告警规则'}
          open={modalVisible}
          onOk={handleSubmit}
          onCancel={() => setModalVisible(false)}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="规则名称"
              rules={[{ required: true, message: '请输入规则名称' }]}
            >
              <Input placeholder="请输入规则名称" />
            </Form.Item>
            <Form.Item
              name="type"
              label="监控类型"
              rules={[{ required: true, message: '请选择监控类型' }]}
            >
              <Select placeholder="请选择监控类型">
                <Option value="anomaly">异常点</Option>
                <Option value="fault">故障</Option>
                <Option value="latency">延迟</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="threshold"
              label="阈值"
              rules={[{ required: true, message: '请输入阈值' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="请输入阈值" />
            </Form.Item>
            <Form.Item
              name="severity"
              label="严重程度"
              rules={[{ required: true, message: '请选择严重程度' }]}
            >
              <Select placeholder="请选择严重程度">
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="notification"
              label="通知方式"
              rules={[{ required: true, message: '请选择通知方式' }]}
            >
              <Select mode="multiple" placeholder="请选择通知方式">
                <Option value="email">邮件</Option>
                <Option value="sms">短信</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="规则描述"
            >
              <Input.TextArea rows={4} placeholder="请输入规则描述" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </PageContainer>
  );
};

export default AlarmConfig; 