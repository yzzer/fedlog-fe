import React, { useState, useEffect } from 'react';
import { history, useLocation } from 'umi';
import {
  Card,
  Table,
  Space,
  Tag,
  Typography,
  Spin,
  Timeline,
  Button,
  Descriptions,
  Divider,
  Alert,
  Row,
  Col
} from 'antd';
import {
  ClockCircleOutlined,
  WarningOutlined,
  LoadingOutlined,
  RollbackOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  content: string;
  sensitive: boolean;
  maskedContent?: string;
}

interface AnomalyDetail {
  id: string;
  time: string;
  instance: string;
  type: string;
  severity: string;
  pattern?: string;
  logs: LogEntry[];
}

// 生成模拟日志数据
const generateMockLogs = (anomaly: any): LogEntry[] => {
  const baseTime = new Date(anomaly.time);
  const logTypes = {
    Error: ['ERROR', 'FATAL'],
    Warning: ['WARN'],
    Critical: ['ERROR', 'FATAL'],
  };
  
  const sensitivePatterns = [
    /(\d{18})/g,                    // 身份证号
    /(\d{11})/g,                    // 手机号
    /(1[3-9]\d{9})/g,              // 手机号
    /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g  // 邮箱
  ];

  const maskSensitiveInfo = (content: string): { masked: string, hasSensitive: boolean } => {
    let masked = content;
    let hasSensitive = false;
    
    sensitivePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        hasSensitive = true;
        masked = masked.replace(pattern, match => '*'.repeat(match.length));
      }
    });
    
    return { masked, hasSensitive };
  };

  const logs: LogEntry[] = [];
  const levels = logTypes[anomaly.type] || ['ERROR'];
  
  // 生成前后文日志
  for (let i = -5; i <= 5; i++) {
    const timestamp = new Date(baseTime.getTime() + i * 1000);
    const isError = i >= 0 && i <= 2; // 异常日志集中在0-2秒范围内
    
    const level = isError ? 
      levels[Math.floor(Math.random() * levels.length)] : 
      ['INFO', 'DEBUG'][Math.floor(Math.random() * 2)];

    let content = '';
    if (isError) {
      // 异常日志内容
      content = [
        `Connection refused: connect to [192.168.1.100:3306] failed for user 13812345678`,
        `Failed to process request from client test@example.com: Invalid token`,
        `System error occurred while processing ID 440103199001011234: Access denied`,
      ][Math.floor(Math.random() * 3)];
    } else {
      // 普通日志内容
      content = [
        `Processing request from client`,
        `Connection pool status check`,
        `Cache hit ratio: 78.5%`,
        `Memory usage: 456MB`,
      ][Math.floor(Math.random() * 4)];
    }

    const { masked, hasSensitive } = maskSensitiveInfo(content);

    logs.push({
      id: `log-${timestamp.getTime()}`,
      timestamp: timestamp.toISOString(),
      level,
      content,
      sensitive: hasSensitive,
      maskedContent: masked
    });
  }

  return logs.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

const LogInvestigation: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [anomaly, setAnomaly] = useState<AnomalyDetail | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const init = async () => {
      // 模拟加载延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (location.state?.anomaly) {
        const anomalyData = location.state.anomaly;
        setAnomaly({
          id: anomalyData.id,
          time: anomalyData.time,
          instance: anomalyData.instance,
          type: anomalyData.type || 'Unknown',
          severity: anomalyData.severity || 'High',
          pattern: anomalyData.pattern,
          logs: []
        });
        
        const generatedLogs = generateMockLogs(anomalyData);
        setLogs(generatedLogs);
      }
      
      setLoading(false);
    };

    init();
  }, [location.state]);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Space direction="vertical" align="center">
          <Spin 
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
            tip="正在加载日志数据..."
          />
        </Space>
      </div>
    );
  }

  if (!anomaly) {
    return (
      <Card>
        <Alert
          message="无法加载异常详情"
          description="未找到相关异常信息，请返回重试"
          type="error"
          action={
            <Button type="primary" onClick={() => history.goBack()}>
              返回
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>异常日志探查</Title>
          </Col>
          <Col>
            <Button 
              icon={<RollbackOutlined />} 
              onClick={() => history.goBack()}
            >
              返回监控面板
            </Button>
          </Col>
        </Row>
        
        <Divider />
        
        <Descriptions column={2} bordered>
          <Descriptions.Item label="异常ID">{anomaly.id}</Descriptions.Item>
          <Descriptions.Item label="发生时间">{anomaly.time}</Descriptions.Item>
          <Descriptions.Item label="实例">{anomaly.instance}</Descriptions.Item>
          <Descriptions.Item label="类型">
            <Tag color={anomaly.type === 'Unknown' ? 'red' : 'blue'}>
              {anomaly.type}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="严重程度">
            <Tag color={
              anomaly.severity === 'High' ? 'red' : 
              anomaly.severity === 'Medium' ? 'orange' : 'blue'
            }>
              {anomaly.severity}
            </Tag>
          </Descriptions.Item>
          {anomaly.pattern && (
            <Descriptions.Item label="匹配模式">
              {anomaly.pattern}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      <Card title="日志时间线">
        <Timeline mode="left">
          {logs.map(log => (
            <Timeline.Item
              key={log.id}
              color={
                log.level === 'ERROR' || log.level === 'FATAL' ? 'red' :
                log.level === 'WARN' ? 'orange' :
                log.level === 'INFO' ? 'blue' : 'gray'
              }
              dot={log.level === 'ERROR' || log.level === 'FATAL' ? 
                <WarningOutlined style={{ fontSize: '16px' }} /> : 
                <ClockCircleOutlined style={{ fontSize: '16px' }} />
              }
              label={new Date(log.timestamp).toLocaleTimeString()}
            >
              <Space direction="vertical">
                <Space>
                  <Tag color={
                    log.level === 'ERROR' || log.level === 'FATAL' ? 'red' :
                    log.level === 'WARN' ? 'orange' :
                    log.level === 'INFO' ? 'blue' : 'gray'
                  }>
                    {log.level}
                  </Tag>
                  {log.sensitive && (
                    <Tag color="purple">包含敏感信息</Tag>
                  )}
                </Space>
                <Text>{log.sensitive ? log.maskedContent : log.content}</Text>
              </Space>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

export default LogInvestigation; 