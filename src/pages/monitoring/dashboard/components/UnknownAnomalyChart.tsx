import React, { useState } from 'react';
import { Modal, Table, Button, message } from 'antd';
import { history } from 'umi';
import dayjs from 'dayjs';
import BaseLineChart from './BaseLineChart';
import { MockDataGenerator } from '../utils/mockDataGenerator';

interface UnknownAnomalyChartProps {
  timeRange: string;
  serviceId: string;
}

const UnknownAnomalyChart: React.FC<UnknownAnomalyChartProps> = ({ timeRange, serviceId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const mockData = new MockDataGenerator(timeRange, serviceId).generateUnknownAnomalies();

  const handlePointClick = (params: any) => {
    const pointData = {
      time: params.value[0],
      instanceName: params.seriesName,
      value: params.value[1],
      anomalies: [
        {
          id: `${params.value[0]}-${params.seriesName}-0`,
          time: params.value[0],
          instanceName: params.seriesName,
          severity: 'High',
          pattern: '未匹配任何已知模式',
          logs: [
            '2024-03-15 10:35:12.123 [ERROR] Unexpected token in JSON at position *** [request_id=abc***]',
            '2024-03-15 10:35:12.456 [ERROR] Failed to decrypt data with key [id=***789]',
            '2024-03-15 10:35:12.789 [WARN] Invalid certificate presented by client [fingerprint=****]',
            '2024-03-15 10:35:13.012 [ERROR] Authentication service returned unexpected code: ***',
            '2024-03-15 10:35:13.345 [WARN] Unusual traffic pattern detected from subnet [10.**.**.0/24]'
          ]
        },
        {
          id: `${params.value[0]}-${params.seriesName}-1`,
          time: params.value[0],
          instanceName: params.seriesName,
          severity: 'Medium',
          pattern: '可能的新故障模式',
          logs: [
            '2024-03-15 10:35:14.123 [WARN] Multiple retry attempts for user [id=***456]',
            '2024-03-15 10:35:14.456 [ERROR] Circuit breaker opened for service [name=****-api]',
            '2024-03-15 10:35:14.789 [WARN] Cache inconsistency detected [key=user_***]',
            '2024-03-15 10:35:15.012 [ERROR] Unexpected response format from [api.*****.com]',
            '2024-03-15 10:35:15.345 [WARN] Resource quota exceeded for project [id=***]'
          ]
        }
      ]
    };
    setSelectedPoint(pointData);
    setModalVisible(true);
  };

  // 生成模拟数据，未知异常的频率更低
  const generateData = () => {
    const now = dayjs();
    const data = [];
    const instances = ['实例1', '实例2', '实例3'];
    
    instances.forEach(instance => {
      for (let i = 0; i < 60; i += 5) {
        const time = now.subtract(i, 'minute').format('YYYY-MM-DD HH:mm:ss');
        // 降低未知异常的出现频率
        const value = Math.random() > 0.95 ? Math.floor(Math.random() * 2) : 0;
        if (value > 0) {
          data.push({
            time,
            instanceName: instance,
            value
          });
        }
      }
    });
    
    return data;
  };

  const handleInvestigate = (record: any) => {
    message.success('正在跳转到日志探查页面...');
    history.push('/monitoring/log-investigation', { anomaly: record });
  };

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '实例',
      dataIndex: 'instanceName',
      key: 'instanceName'
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity'
    },
    {
      title: '日志预览',
      dataIndex: 'logs',
      key: 'logs',
      render: (logs: string[]) => (
        <div style={{ maxHeight: 100, overflow: 'auto' }}>
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleInvestigate(record)}>
          日志探查
        </Button>
      )
    }
  ];

  return (
    <>
      <BaseLineChart
        data={generateData()}
        timeRange={timeRange}
        yAxisName="个"
        onPointClick={handlePointClick}
      />
      <Modal
        title={`未知异常点详情 - ${selectedPoint?.instanceName}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1000}
      >
        {selectedPoint && (
          <Table
            dataSource={selectedPoint.anomalies}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        )}
      </Modal>
    </>
  );
};

export default UnknownAnomalyChart; 