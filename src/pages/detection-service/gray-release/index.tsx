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
  Slider,
  Descriptions,
  Row,
  Col,
  Progress,
  Statistic,
  Tabs,
  Typography,
  message
} from 'antd';
import {
  PlusOutlined,
  RollbackOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  LineChartOutlined,
  ExpandOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Option } = Select;
const { Text } = Typography;

interface GrayRelease {
  id: string;
  name: string;
  serviceType: 'encoding' | 'detection';
  serviceName: string;
  targetVersion: string;
  currentVersion: string;
  status: 'in_progress' | 'completed' | 'rolled_back';
  strategy: {
    type: 'ip_range' | 'business_type' | 'server_group';
    value: string[];
  };
  progress: {
    grayScale: number;
    affectedServers: number;
    totalServers: number;
  };
  metrics: {
    grayGroup: {
      successRate: number;
      errorRate: number;
      avgLatency: number;
      resourceUsage: {
        cpu: number;
        memory: number;
      };
    };
    baseGroup: {
      successRate: number;
      errorRate: number;
      avgLatency: number;
      resourceUsage: {
        cpu: number;
        memory: number;
      };
    };
  };
  createTime: string;
  creator: string;
}

// 模拟数据
const mockReleases: GrayRelease[] = [
  {
    id: 'gray-001',
    name: 'Nginx日志编码服务灰度发布',
    serviceType: 'encoding',
    serviceName: 'Nginx日志编码服务',
    targetVersion: 'v1.3.0',
    currentVersion: 'v1.2.5',
    status: 'in_progress',
    strategy: {
      type: 'ip_range',
      value: ['192.168.1.1/24', '192.168.2.1/24']
    },
    progress: {
      grayScale: 30,
      affectedServers: 15,
      totalServers: 50
    },
    metrics: {
      grayGroup: {
        successRate: 99.5,
        errorRate: 0.5,
        avgLatency: 25,
        resourceUsage: {
          cpu: 15,
          memory: 256
        }
      },
      baseGroup: {
        successRate: 99.2,
        errorRate: 0.8,
        avgLatency: 28,
        resourceUsage: {
          cpu: 18,
          memory: 280
        }
      }
    },
    createTime: '2024-03-15 10:00:00',
    creator: '游张政'
  },
  {
    id: 'gray-002',
    name: 'Spring异常检测服务灰度发布',
    serviceType: 'detection',
    serviceName: 'Spring应用异常检测服务',
    targetVersion: 'v1.2.0',
    currentVersion: 'v1.1.0',
    status: 'completed',
    strategy: {
      type: 'business_type',
      value: ['order', 'payment']
    },
    progress: {
      grayScale: 100,
      affectedServers: 30,
      totalServers: 30
    },
    metrics: {
      grayGroup: {
        successRate: 99.8,
        errorRate: 0.2,
        avgLatency: 22,
        resourceUsage: {
          cpu: 20,
          memory: 512
        }
      },
      baseGroup: {
        successRate: 99.0,
        errorRate: 1.0,
        avgLatency: 25,
        resourceUsage: {
          cpu: 25,
          memory: 550
        }
      }
    },
    createTime: '2024-03-14 14:30:00',
    creator: '游张政'
  }
];

const GrayRelease: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<GrayRelease | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '灰度名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: GrayRelease) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      )
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: (type: string) => (
        <Tag color={type === 'encoding' ? 'blue' : 'purple'}>
          {type === 'encoding' ? '编码服务' : '检测服务'}
        </Tag>
      )
    },
    {
      title: '目标服务',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '版本变更',
      key: 'version',
      render: (_, record: GrayRelease) => (
        <Space>
          <Tag>{record.currentVersion}</Tag>
          <span>→</span>
          <Tag color="blue">{record.targetVersion}</Tag>
        </Space>
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (_, record: GrayRelease) => (
        <Space>
          <Tag color={
            record.status === 'in_progress' ? 'processing' :
            record.status === 'completed' ? 'success' : 'warning'
          }>
            {
              record.status === 'in_progress' ? '进行中' :
              record.status === 'completed' ? '已完成' : '已回滚'
            }
          </Tag>
          {record.status === 'in_progress' && (
            <Text type="secondary">{record.progress.grayScale}%</Text>
          )}
        </Space>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: GrayRelease) => (
        <Space size="middle">
          {record.status === 'in_progress' && (
            <>
              <Button
                type="text"
                icon={<ExpandOutlined />}
                onClick={() => handleExpandScale(record)}
              >
                扩大范围
              </Button>
              <Button
                type="text"
                danger
                icon={<RollbackOutlined />}
                onClick={() => handleRollback(record)}
              >
                回滚
              </Button>
            </>
          )}
          <Button
            type="text"
            icon={<LineChartOutlined />}
            onClick={() => handleViewMetrics(record)}
          >
            对比
          </Button>
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: GrayRelease) => {
    setSelectedRelease(record);
    setDetailModalVisible(true);
  };

  const handleExpandScale = (record: GrayRelease) => {
    Modal.confirm({
      title: '扩大灰度范围',
      content: (
        <div>
          <Text>当前灰度比例: {record.progress.grayScale}%</Text>
          <Slider
            defaultValue={record.progress.grayScale}
            step={10}
            marks={{
              0: '0%',
              20: '20%',
              40: '40%',
              60: '60%',
              80: '80%',
              100: '100%'
            }}
          />
        </div>
      ),
      onOk: () => {
        message.success('灰度范围已更新');
      }
    });
  };

  const handleRollback = (record: GrayRelease) => {
    Modal.confirm({
      title: '确认回滚',
      content: `确定要回滚"${record.name}"到版本 ${record.currentVersion} 吗？`,
      onOk: () => {
        message.success('已开始回滚');
      }
    });
  };

  const handleViewMetrics = (record: GrayRelease) => {
    Modal.info({
      title: '灰度效果对比',
      width: 800,
      content: (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="灰度组">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Statistic
                  title="成功率"
                  value={record.metrics.grayGroup.successRate}
                  suffix="%"
                  precision={1}
                />
                <Statistic
                  title="平均延迟"
                  value={record.metrics.grayGroup.avgLatency}
                  suffix="ms"
                />
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="CPU使用率">
                    {record.metrics.grayGroup.resourceUsage.cpu}%
                  </Descriptions.Item>
                  <Descriptions.Item label="内存占用">
                    {record.metrics.grayGroup.resourceUsage.memory}MB
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="基准组">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Statistic
                  title="成功率"
                  value={record.metrics.baseGroup.successRate}
                  suffix="%"
                  precision={1}
                />
                <Statistic
                  title="平均延迟"
                  value={record.metrics.baseGroup.avgLatency}
                  suffix="ms"
                />
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="CPU使用率">
                    {record.metrics.baseGroup.resourceUsage.cpu}%
                  </Descriptions.Item>
                  <Descriptions.Item label="内存占用">
                    {record.metrics.baseGroup.resourceUsage.memory}MB
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          </Col>
        </Row>
      )
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
              setSelectedRelease(null);
              form.resetFields();
              setCreateModalVisible(true);
            }}
          >
            新建灰度发布
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockReleases}
          rowKey="id"
        />
      </Card>

      {/* 新建灰度发布弹窗 */}
      <Modal
        title="新建灰度发布"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => {
          form.validateFields().then(values => {
            console.log(values);
            message.success('创建成功');
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
            label="灰度名称"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入灰度发布名称" />
          </Form.Item>

          <Form.Item
            label="服务类型"
            name="serviceType"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="encoding">编码服务</Option>
              <Option value="detection">检测服务</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="目标服务"
            name="serviceName"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="nginx">Nginx日志编码服务</Option>
              <Option value="spring">Spring应用异常检测服务</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="目标版本"
            name="targetVersion"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="v1.3.0">v1.3.0</Option>
              <Option value="v1.2.0">v1.2.0</Option>
            </Select>
          </Form.Item>

          <Form.Item label="灰度策略" required>
            <Space align="baseline">
              <Form.Item
                name={['strategy', 'type']}
                rules={[{ required: true }]}
              >
                <Select style={{ width: 200 }}>
                  <Option value="ip_range">IP范围</Option>
                  <Option value="business_type">业务类型</Option>
                  <Option value="server_group">服务器组</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['strategy', 'value']}
                rules={[{ required: true }]}
              >
                <Select mode="tags" style={{ width: 400 }} />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item
            label="初始灰度比例"
            name="initialScale"
            rules={[{ required: true }]}
          >
            <Slider
              marks={{
                10: '10%',
                20: '20%',
                30: '30%',
                50: '50%'
              }}
              step={10}
              max={50}
              defaultValue={10}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 灰度详情弹窗 */}
      <Modal
        title="灰度详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedRelease && (
          <>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="灰度名称" span={2}>
                {selectedRelease.name}
              </Descriptions.Item>
              <Descriptions.Item label="服务类型">
                {selectedRelease.serviceType === 'encoding' ? '编码服务' : '检测服务'}
              </Descriptions.Item>
              <Descriptions.Item label="目标服务">
                {selectedRelease.serviceName}
              </Descriptions.Item>
              <Descriptions.Item label="版本变更">
                {selectedRelease.currentVersion} → {selectedRelease.targetVersion}
              </Descriptions.Item>
              <Descriptions.Item label="创建信息">
                {selectedRelease.creator} 于 {selectedRelease.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="灰度策略" span={2}>
                <Space direction="vertical">
                  <Text>
                    策略类型: {
                      selectedRelease.strategy.type === 'ip_range' ? 'IP范围' :
                      selectedRelease.strategy.type === 'business_type' ? '业务类型' : '服务器组'
                    }
                  </Text>
                  <Text>
                    策略值: {selectedRelease.strategy.value.join(', ')}
                  </Text>
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Progress
                percent={selectedRelease.progress.grayScale}
                status={selectedRelease.status === 'in_progress' ? 'active' : undefined}
              />
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="灰度比例"
                      value={selectedRelease.progress.grayScale}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="已覆盖服务器"
                      value={selectedRelease.progress.affectedServers}
                      suffix={`/ ${selectedRelease.progress.totalServers}`}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="成功率差异"
                      value={selectedRelease.metrics.grayGroup.successRate - selectedRelease.metrics.baseGroup.successRate}
                      precision={1}
                      prefix={<CheckCircleOutlined />}
                      suffix="%"
                      valueStyle={{ color: '#3f8600' }}
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

export default GrayRelease; 