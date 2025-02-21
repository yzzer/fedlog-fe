import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Card,
  Row,
  Col,
  Select,
  Space,
  Typography,
  Button,
  Spin,
  Empty
} from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import KnownAnomalyChart from './components/KnownAnomalyChart';
import UnknownAnomalyChart from './components/UnknownAnomalyChart';
import FaultDistributionPie from './components/FaultDistributionPie';
import FaultTypeBarChart from './components/FaultTypeBarChart';
import DetectionLatencyChart from './components/DetectionLatencyChart';

const { Option, OptGroup } = Select;
const { Title } = Typography;

// 时间窗口选项
const timeRangeOptions = [
  { label: '10分钟', value: '10min' },
  { label: '20分钟', value: '20min' },
  { label: '30分钟', value: '30min' },
  { label: '1小时', value: '1h' },
  { label: '2小时', value: '2h' },
  { label: '5小时', value: '5h' },
  { label: '12小时', value: '12h' },
  { label: '1天', value: '1d' },
  { label: '3天', value: '3d' },
  { label: '7天', value: '7d' },
];

// 刷新间隔选项
const refreshIntervalOptions = [
  { label: '5秒', value: 5 },
  { label: '1分钟', value: 60 },
  { label: '5分钟', value: 300 },
  { label: '10分钟', value: 600 },
];

// 模拟应用队列数据
const mockAppQueues = [
  {
    id: 'nginx',
    name: 'Nginx应用',
    services: [
      { id: 'detect-001', name: 'Nginx日志异常检测服务' },
      { id: 'detect-002', name: 'Nginx访问日志检测服务' },
    ]
  },
  {
    id: 'spring',
    name: 'Spring应用',
    services: [
      { id: 'detect-003', name: 'Spring应用异常检测服务' },
      { id: 'detect-004', name: 'Spring性能监控服务' },
    ]
  },
  {
    id: 'mysql',
    name: 'MySQL服务',
    services: [
      { id: 'detect-005', name: 'MySQL慢查询检测服务' },
    ]
  }
];

const Dashboard: React.FC = () => {
  // 默认选中第一个应用的第一个服务
  const defaultQueue = mockAppQueues[0];
  const defaultService = defaultQueue.services[0];

  const [selectedQueue, setSelectedQueue] = useState(defaultQueue.id);
  const [selectedService, setSelectedService] = useState(defaultService.id);
  const [timeRange, setTimeRange] = useState('1h');
  const [refreshInterval, setRefreshInterval] = useState<number>(300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (refreshInterval > 0 && selectedService) {
      timer = setInterval(() => {
        setLoading(true);
        // 模拟刷新数据
        setTimeout(() => setLoading(false), 500);
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [refreshInterval, selectedService]);

  // 修改服务选择处理
  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => setLoading(false), 1000);
  };

  // 处理时间范围变化
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => setLoading(false), 1000);
  };

  // 处理应用队列变化
  const handleQueueChange = (queueId: string) => {
    setSelectedQueue(queueId);
    // 自动选中新队列的第一个服务
    const queue = mockAppQueues.find(q => q.id === queueId);
    if (queue && queue.services.length > 0) {
      setSelectedService(queue.services[0].id);
    }
  };

  const renderChart = (Component: React.FC<any>, props: any) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      console.error('Chart rendering error:', error);
      return <Empty description="图表加载失败" />;
    }
  };

  // 定义统一的图表容器样式
  const chartContainerStyle: React.CSSProperties = {
    height: '400px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <PageContainer>
      <Card bodyStyle={{ padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="large">
                <Select
                  style={{ width: 200 }}
                  placeholder="选择应用"
                  value={selectedQueue}
                  onChange={handleQueueChange}
                >
                  {mockAppQueues.map(queue => (
                    <Option key={queue.id} value={queue.id}>
                      {queue.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  style={{ width: 300 }}
                  placeholder="选择检测服务"
                  value={selectedService}
                  onChange={handleServiceChange}
                >
                  {mockAppQueues
                    .find(q => q.id === selectedQueue)
                    ?.services.map(service => (
                      <Option key={service.id} value={service.id}>
                        {service.name}
                      </Option>
                    ))}
                </Select>
              </Space>
            </Col>
            <Col>
              <Space>
                <Typography.Text>时间范围：</Typography.Text>
                <Select
                  style={{ width: 120 }}
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                >
                  {timeRangeOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <Typography.Text>自动刷新：</Typography.Text>
                <Select
                  style={{ width: 120 }}
                  value={refreshInterval}
                  onChange={setRefreshInterval}
                >
                  {refreshIntervalOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1000);
                  }}
                >
                  刷新
                </Button>
              </Space>
            </Col>
          </Row>

          <Spin spinning={loading}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card 
                  title="已知日志异常点统计" 
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={chartContainerStyle}>
                    {renderChart(KnownAnomalyChart, { timeRange, serviceId: selectedService })}
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card 
                  title="未知日志异常点统计"
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={chartContainerStyle}>
                    {renderChart(UnknownAnomalyChart, { timeRange, serviceId: selectedService })}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title="故障分布情况"
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={chartContainerStyle}>
                    {renderChart(FaultDistributionPie, { timeRange, serviceId: selectedService })}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title="故障分类统计"
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={chartContainerStyle}>
                    {renderChart(FaultTypeBarChart, { timeRange, serviceId: selectedService })}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title="客户端平均异常检测延迟"
                  bodyStyle={{ padding: 0 }}
                >
                  <div style={chartContainerStyle}>
                    {renderChart(DetectionLatencyChart, { timeRange, serviceId: selectedService })}
                  </div>
                </Card>
              </Col>
            </Row>
          </Spin>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default Dashboard; 