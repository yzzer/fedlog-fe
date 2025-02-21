import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Space, 
  Tag, 
  Select, 
  Typography,
  Tooltip,
  message,
  Divider
} from 'antd';
import { QuestionCircleOutlined, PlusOutlined, LinkOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';

const { TextArea } = Input;
const { Title } = Typography;

// 复用 create 页面的接口和常量定义
interface Member {
  email: string;
  name: string;
  role: string;
}

// 角色定义
const roles = [
  { label: '访客', value: 'visitor', color: 'default' },
  { label: '运维', value: 'ops', color: 'blue' },
  { label: '开发', value: 'developer', color: 'green' },
  { label: '管理员', value: 'admin', color: 'purple' },
  { label: '审核员', value: 'auditor', color: 'orange' },
];

// 密级选项
const securityLevels = [
  { 
    label: (
      <Space>
        L0级
        <Tag color="success">公开</Tag>
        <Tooltip title="适用于可公开访问的非敏感数据">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>
    ), 
    value: 'L0' 
  },
  { 
    label: (
      <Space>
        L1级
        <Tag color="warning">内部</Tag>
        <Tooltip title="适用于企业内部数据，需要基本访问权限">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>
    ), 
    value: 'L1' 
  },
  { 
    label: (
      <Space>
        L2级
        <Tag color="error">保密</Tag>
        <Tooltip title="适用于高度敏感数据，需要特殊授权访问">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>
    ), 
    value: 'L2' 
  },
];

// 模拟当前项目数据
const mockProjectData = {
  name: 'K8s集群日志检测',
  description: 'Kubernetes集群异常日志检测项目，用于实时监控和分析集群日志。',
  securityLevel: 'L1',
  members: [
    { email: 'luxiuyuan@example.com', name: '路修远', role: 'admin' },
    { email: 'shijiahao@example.com', name: '石家濠', role: 'developer' },
    { email: 'youzhangzheng@example.com', name: '游张政', role: 'ops' },
    { email: 'weiyandong@example.com', name: '魏亚东', role: 'developer' },
    { email: 'baohaotong@example.com', name: '暴浩彤', role: 'auditor' },
    { email: 'guoyitian@example.com', name: '郭翼天', role: 'ops' },
  ]
};

const ProjectSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [members, setMembers] = useState<Member[]>(mockProjectData.members);
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState('visitor');

  const handleAddMember = () => {
    if (!emailInput) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      message.error('请输入有效的邮箱地址');
      return;
    }
    if (members.some(m => m.email === emailInput)) {
      message.error('该成员已添加');
      return;
    }

    const name = emailInput.split('@')[0].replace('.', ' ');
    setMembers([...members, {
      email: emailInput,
      name: name,
      role: roleInput
    }]);
    setEmailInput('');
    setRoleInput('visitor');
  };

  const handleRemoveMember = (email: string) => {
    setMembers(members.filter(m => m.email !== email));
  };

  const getRoleColor = (role: string) => {
    return roles.find(r => r.value === role)?.color || 'default';
  };

  const getRoleLabel = (role: string) => {
    return roles.find(r => r.value === role)?.label || '未知';
  };

  const onFinish = (values: any) => {
    console.log('Form values:', { ...values, members });
    message.success('项目设置更新成功！');
  };

  return (
    <PageContainer>
      <Card style={{ maxWidth: 800, margin: '0 auto' }}>
        <Title level={4}>项目设置</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: mockProjectData.name,
            description: mockProjectData.description,
            securityLevel: mockProjectData.securityLevel,
          }}
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" maxLength={50} />
          </Form.Item>

          <Form.Item
            label={
              <Space>
                项目密级
                <Tooltip title="设置项目的安全等级，不同密级有不同的访问权限要求">
                  <QuestionCircleOutlined style={{ color: '#999' }} />
                </Tooltip>
              </Space>
            }
            name="securityLevel"
            rules={[{ required: true, message: '请选择项目密级' }]}
          >
            <Select
              options={securityLevels}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="项目描述"
            name="description"
          >
            <TextArea 
              placeholder="请输入项目描述"
              maxLength={200}
              showCount
              rows={4}
              style={{ resize: 'none' }}
            />
          </Form.Item>

          <Divider />

          <Form.Item
            label={
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>项目成员</span>
                <span style={{ color: '#999' }}>已添加：{members.length}人</span>
              </div>
            }
          >
            <Space.Compact style={{ width: '100%', marginBottom: 8 }}>
              <Input
                placeholder="请输入成员邮箱"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onPressEnter={handleAddMember}
                style={{ width: '60%' }}
              />
              <Select
                value={roleInput}
                onChange={setRoleInput}
                options={roles}
                style={{ width: '30%' }}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddMember}>
                添加
              </Button>
            </Space.Compact>
            <div style={{ marginTop: 8 }}>
              {members.map(member => (
                <Tag 
                  key={member.email}
                  closable 
                  onClose={() => handleRemoveMember(member.email)}
                  style={{ marginBottom: 8, padding: '4px 8px' }}
                >
                  <Space>
                    <span>{member.name}</span>
                    <Tag color={getRoleColor(member.role)} style={{ marginRight: 0 }}>
                      {getRoleLabel(member.role)}
                    </Tag>
                  </Space>
                </Tag>
              ))}
            </div>
          </Form.Item>

          <Divider />

          <Form.Item label="队列管理">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="default" 
                icon={<LinkOutlined />}
                onClick={() => history.push('/project-manage/projectinfo/federated-queues')}
                block
              >
                联邦队列管理
              </Button>
              <Button 
                type="default" 
                icon={<LinkOutlined />}
                onClick={() => history.push('/project-manage/projectinfo/app-queues')}
                block
              >
                应用队列管理
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button type="primary" htmlType="submit">
                保存更改
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default ProjectSettings; 