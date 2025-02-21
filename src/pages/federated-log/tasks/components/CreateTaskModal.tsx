import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Table,
  InputNumber,
  Radio,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

const { Option } = Select;
const { Text } = Typography;

interface TriggerRule {
  key: string;
  type: 'mismatch' | 'backlog';
  threshold: number;
  thresholdType?: 'count' | 'percentage';
}

interface RegexRule {
  key: string;
  pattern: string;
  description: string;
}

interface EditingState {
  key: string;
  field: 'pattern' | 'description';
}

interface AlgorithmOption {
  value: string;
  label: string;
  description: string;
  recommended?: boolean;
}

interface CreateTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const ALGORITHM_OPTIONS: AlgorithmOption[] = [

  {
    value: 'feddrain_brain',
    label: 'FedDrain+Brain',
    description: '联邦Drain与Brain混合解析算法',
    recommended: true
  },
  {
    value: 'fldrain',
    label: 'FLDrain',
    description: '基于前缀树的联邦日志解析算法'
  },
  {
    value: 'feddrain_drain',
    label: 'FedDrain+Drain',
    description: '联邦双Drain混合解析算法'
  },

  {
    value: 'feddrain_spell',
    label: 'FedDrain+Spell',
    description: '联邦Drain与Spell混合解析算法'
  },
  {
    value: 'flspell',
    label: 'FLSpell',
    description: '基于拼写距离的联邦日志解析算法'
  },
 
];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [desensitizeRules, setDesensitizeRules] = useState<RegexRule[]>([]);
  const [matchRules, setMatchRules] = useState<RegexRule[]>([]);
  const [triggers, setTriggers] = useState<TriggerRule[]>([]);
  const [editingState, setEditingState] = useState<EditingState | null>(null);

  // 队列选项模拟数据
  const queueOptions = [
    { label: 'fed-queue-001', value: 'fed-queue-001' },
    { label: 'fed-queue-002', value: 'fed-queue-002' },
    { label: 'app-queue-001', value: 'app-queue-001' },
    { label: 'app-queue-002', value: 'app-queue-002' },
  ];

  // 用户选项模拟数据
  const userOptions = [
    { label: '游张政', value: 'youzhangzheng' },
    { label: '路修远', value: 'luxiuyuan' },
    { label: '石家濠', value: 'shijiahao' },
  ];

  const handleAddRegexRule = (type: 'desensitize' | 'match') => {
    const newRule = {
      key: `${type}-${Date.now()}`,
      pattern: '',
      description: '',
    };
    if (type === 'desensitize') {
      setDesensitizeRules([...desensitizeRules, newRule]);
    } else {
      setMatchRules([...matchRules, newRule]);
    }
    setEditingState({ key: newRule.key, field: 'pattern' });
  };

  const handleRegexChange = (
    key: string,
    field: 'pattern' | 'description',
    value: string
  ) => {
    const isDesensitize = key.startsWith('desensitize');
    const rules = isDesensitize ? desensitizeRules : matchRules;
    const setRules = isDesensitize ? setDesensitizeRules : setMatchRules;

    const newRules = rules.map(rule => 
      rule.key === key ? { ...rule, [field]: value } : rule
    );
    setRules(newRules);
  };

  const handleAddTrigger = () => {
    const newTrigger = {
      key: Date.now().toString(),
      type: 'mismatch',
      threshold: 100,
      thresholdType: 'count',
    };
    setTriggers([...triggers, newTrigger]);
  };

  const regexColumns = [
    {
      title: '正则表达式',
      dataIndex: 'pattern',
      key: 'pattern',
      render: (text: string, record: RegexRule) => (
        editingState?.key === record.key && editingState?.field === 'pattern' ? (
          <Input
            defaultValue={text}
            autoFocus
            onPressEnter={(e) => {
              handleRegexChange(record.key, 'pattern', e.currentTarget.value);
              setEditingState(null);
            }}
            onBlur={(e) => {
              handleRegexChange(record.key, 'pattern', e.target.value);
              setEditingState(null);
            }}
          />
        ) : (
          <Space>
            <span>{text || '(空)'}</span>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => setEditingState({ key: record.key, field: 'pattern' })}
            />
          </Space>
        )
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: RegexRule) => (
        editingState?.key === record.key && editingState?.field === 'description' ? (
          <Input
            defaultValue={text}
            autoFocus
            onPressEnter={(e) => {
              handleRegexChange(record.key, 'description', e.currentTarget.value);
              setEditingState(null);
            }}
            onBlur={(e) => {
              handleRegexChange(record.key, 'description', e.target.value);
              setEditingState(null);
            }}
          />
        ) : (
          <Space>
            <span>{text || '(空)'}</span>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => setEditingState({ key: record.key, field: 'description' })}
            />
          </Space>
        )
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: RegexRule) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            const isDesensitize = record.key.startsWith('desensitize');
            const rules = isDesensitize ? desensitizeRules : matchRules;
            const setRules = isDesensitize ? setDesensitizeRules : setMatchRules;
            setRules(rules.filter(r => r.key !== record.key));
          }}
        />
      ),
    },
  ];

  const triggerColumns = [
    {
      title: '触发类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string, record: TriggerRule) => (
        <Radio.Group
          value={text}
          onChange={(e) => {
            const newTriggers = triggers.map(t =>
              t.key === record.key ? { ...t, type: e.target.value } : t
            );
            setTriggers(newTriggers);
          }}
        >
          <Radio.Button value="mismatch">模板失配</Radio.Button>
          <Radio.Button value="backlog">日志积压</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      title: '阈值类型',
      dataIndex: 'thresholdType',
      key: 'thresholdType',
      render: (text: string, record: TriggerRule) => (
        record.type === 'mismatch' ? (
          <Radio.Group
            value={text}
            onChange={(e) => {
              const newTriggers = triggers.map(t =>
                t.key === record.key ? { ...t, thresholdType: e.target.value } : t
              );
              setTriggers(newTriggers);
            }}
          >
            <Radio.Button value="count">数量</Radio.Button>
            <Radio.Button value="percentage">百分比</Radio.Button>
          </Radio.Group>
        ) : '-'
      ),
    },
    {
      title: '阈值',
      dataIndex: 'threshold',
      key: 'threshold',
      render: (value: number, record: TriggerRule) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(newValue) => {
            const newTriggers = triggers.map(t =>
              t.key === record.key ? { ...t, threshold: newValue } : t
            );
            setTriggers(newTriggers);
          }}
          addonAfter={record.type === 'mismatch' && record.thresholdType === 'percentage' ? '%' : '条'}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: TriggerRule) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            setTriggers(triggers.filter(t => t.key !== record.key));
          }}
        />
      ),
    },
  ];

  return (
    <Modal
      title="新建联邦解析任务"
      open={visible}
      width={800}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then(values => {
          onSubmit({
            ...values,
            desensitizeRules,
            matchRules,
            triggers,
          });
        });
      }}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="任务名称"
          name="name"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Input placeholder="请输入任务名称" />
        </Form.Item>

        <Form.Item
          label="联邦队列"
          name="federatedQueue"
          rules={[{ required: true, message: '请选择联邦队列' }]}
        >
          <Select placeholder="请选择联邦队列">
            {queueOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="应用队列"
          name="appQueue"
          rules={[{ required: true, message: '请选择应用队列' }]}
        >
          <Select placeholder="请选择应用队列">
            {queueOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <span>去敏正则表达式</span>
              <Tooltip title="匹配到的内容将在解析前被去敏处理">
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          }
        >
          <div style={{ marginBottom: 16 }}>
            <Button
              type="dashed"
              onClick={() => handleAddRegexRule('desensitize')}
              icon={<PlusOutlined />}
            >
              添加去敏规则
            </Button>
          </div>
          <Table
            columns={regexColumns}
            dataSource={desensitizeRules}
            rowKey="key"
            pagination={false}
            size="small"
          />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <span>日志匹配正则表达式</span>
              <Tooltip title="只有匹配的日志内容才会被解析">
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          }
        >
          <div style={{ marginBottom: 16 }}>
            <Button
              type="dashed"
              onClick={() => handleAddRegexRule('match')}
              icon={<PlusOutlined />}
            >
              添加匹配规则
            </Button>
          </div>
          <Table
            columns={regexColumns}
            dataSource={matchRules}
            rowKey="key"
            pagination={false}
            size="small"
          />
        </Form.Item>

        <Form.Item
          label="负责人"
          name="owner"
          rules={[{ required: true, message: '请选择负责人' }]}
        >
          <Select placeholder="请选择负责人">
            {userOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="权限用户"
          name="permissionUsers"
        >
          <Select
            mode="multiple"
            placeholder="请选择有权限的用户"
            allowClear
          >
            {userOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="模板集名称"
          name="templateName"
          rules={[{ required: true, message: '请输入模板集名称' }]}
        >
          <Input placeholder="请输入模板集名称" />
        </Form.Item>

        <Form.Item
          label="解析算法"
          name="algorithm"
          rules={[{ required: true, message: '请选择解析算法' }]}
          tooltip="选择合适的联邦日志解析算法"
        >
          <Select
            placeholder="请选择解析算法"
            optionLabelProp="label"
          >
            {ALGORITHM_OPTIONS.map(option => (
              <Option 
                key={option.value} 
                value={option.value}
                label={
                  <Space>
                    {option.label}
                    {option.recommended && <Tag color="success">推荐</Tag>}
                  </Space>
                }
              >
                <div style={{ padding: '4px 0' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <span>{option.label}</span>
                      {option.recommended && <Tag color="success">推荐</Tag>}
                    </Space>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {option.description}
                    </Text>
                  </Space>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <span>触发器配置</span>
              <Tooltip title="配置任务自动触发的条件">
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          }
        >
          <div style={{ marginBottom: 16 }}>
            <Button
              type="dashed"
              onClick={handleAddTrigger}
              icon={<PlusOutlined />}
            >
              添加触发器
            </Button>
          </div>
          <Table
            columns={triggerColumns}
            dataSource={triggers}
            rowKey="key"
            pagination={false}
            size="small"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal; 