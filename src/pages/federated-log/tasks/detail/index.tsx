import React from 'react';
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import {
  Card,
  Descriptions,
  Tag,
  Table,
  Space,
  Button,
  Tooltip,
  Typography,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  FileTextOutlined,
  ReloadOutlined,
  StopOutlined,
  CheckCircleOutlined,
  EditOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// 模拟任务详情数据
const taskDetail = {
  id: 'task-001',
  name: 'Nginx日志联邦解析任务',
  federatedQueue: 'fed-queue-001',
  appQueue: 'nginx-gateway-queue',
  status: '上线',
  onlineTime: '2024-03-01 10:00:00',
  owner: '游张政',
  templateName: 'nginx-log-template',
  latestVersion: 'v1.2.5',
  algorithm: {
    name: 'FedDrain+Brain',
    value: 'feddrain_brain',
    description: '联邦Drain与Brain混合解析算法'
  },
  statistics: {
    totalInstances: 30,
    successInstances: 25,
    failedInstances: 3,
    runningInstances: 2,
    avgDuration: '45分钟',
    totalLogs: 1000000,
    parsedLogs: 980000,
    errorLogs: 20000
  },
  desensitizeRules: [
    {
      pattern: '\\d{16,19}',
      description: '银行卡号脱敏'
    },
    {
      pattern: '\\d{11}',
      description: '手机号码脱敏'
    }
  ],
  matchRules: [
    {
      pattern: '.*ERROR.*',
      description: '匹配错误日志'
    },
    {
      pattern: '.*Exception.*',
      description: '匹配异常日志'
    }
  ],
  triggers: [
    {
      type: 'mismatch',
      threshold: 100,
      thresholdType: 'count',
      description: '模板失配数量超过100条触发'
    },
    {
      type: 'backlog',
      threshold: 10000,
      description: '日志积压超过10000条触发'
    }
  ]
};

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const renderStatus = (status: string) => {
    const colorMap = {
      '上线': 'success',
      '下线': 'default',
      '未发布': 'warning'
    };
    return <Tag color={colorMap[status]}>{status}</Tag>;
  };

  return (
    <PageContainer
      title={taskDetail.name}
      tags={[renderStatus(taskDetail.status)]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card title="基本信息">
          <Descriptions column={3}>
            <Descriptions.Item label="任务ID">{taskDetail.id}</Descriptions.Item>
            <Descriptions.Item label="联邦队列">{taskDetail.federatedQueue}</Descriptions.Item>
            <Descriptions.Item label="应用队列">{taskDetail.appQueue}</Descriptions.Item>
            <Descriptions.Item label="负责人">{taskDetail.owner}</Descriptions.Item>
            <Descriptions.Item label="上线时间">{taskDetail.onlineTime}</Descriptions.Item>
            <Descriptions.Item label="解析算法">
              <Space>
                {taskDetail.algorithm.name}
                {taskDetail.algorithm.value === 'feddrain_brain' && (
                  <Tag color="success">推荐</Tag>
                )}
                <Tooltip title={taskDetail.algorithm.description}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="运行统计">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Statistic 
                title="总实例数" 
                value={taskDetail.statistics.totalInstances} 
                suffix="个"
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="成功实例" 
                value={taskDetail.statistics.successInstances}
                valueStyle={{ color: '#52c41a' }}
                suffix="个"
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="失败实例" 
                value={taskDetail.statistics.failedInstances}
                valueStyle={{ color: '#ff4d4f' }}
                suffix="个"
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="运行中实例" 
                value={taskDetail.statistics.runningInstances}
                valueStyle={{ color: '#1890ff' }}
                suffix="个"
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="平均执行时长" 
                value={taskDetail.statistics.avgDuration}
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="总日志量" 
                value={taskDetail.statistics.totalLogs}
                suffix="条"
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="已解析日志" 
                value={taskDetail.statistics.parsedLogs}
                suffix="条"
              />
            </Col>
            <Col span={6}>
              <Statistic 
                title="异常日志" 
                value={taskDetail.statistics.errorLogs}
                valueStyle={{ color: '#ff4d4f' }}
                suffix="条"
              />
            </Col>
          </Row>
        </Card>

        <Card 
          title="规则配置"
          extra={
            <Button type="primary" icon={<EditOutlined />}>
              编辑规则
            </Button>
          }
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card type="inner" title="去敏规则">
              <Table
                dataSource={taskDetail.desensitizeRules}
                columns={[
                  {
                    title: '正则表达式',
                    dataIndex: 'pattern',
                    key: 'pattern',
                  },
                  {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>
            <Card type="inner" title="匹配规则">
              <Table
                dataSource={taskDetail.matchRules}
                columns={[
                  {
                    title: '正则表达式',
                    dataIndex: 'pattern',
                    key: 'pattern',
                  },
                  {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>
            <Card type="inner" title="触发规则">
              <Table
                dataSource={taskDetail.triggers}
                columns={[
                  {
                    title: '触发类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type) => (
                      <Tag color={type === 'mismatch' ? 'orange' : 'purple'}>
                        {type === 'mismatch' ? '模板失配' : '日志积压'}
                      </Tag>
                    )
                  },
                  {
                    title: '阈值',
                    dataIndex: 'threshold',
                    key: 'threshold',
                  },
                  {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>
          </Space>
        </Card>
      </Space>
    </PageContainer>
  );
};

export default TaskDetail; 