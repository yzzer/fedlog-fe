import React, { useState } from 'react';
import { Modal, Table, Button, message } from 'antd';
import { history } from 'umi';
import dayjs from 'dayjs';
import BaseLineChart from './BaseLineChart';
import { MockDataGenerator } from '../utils/mockDataGenerator';

interface KnownAnomalyChartProps {
  timeRange: string;
  serviceId: string;
}

const KnownAnomalyChart: React.FC<KnownAnomalyChartProps> = ({ timeRange, serviceId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const mockData = new MockDataGenerator(timeRange, serviceId).generateKnownAnomalies();

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
          type: 'Error',
          message: '发现异常模式日志序列',
          logs: [
            '2024-03-15 10:30:45.231 [ERROR] Connection refused: connect to [172.**.**.15:3306] failed',
            '2024-03-15 10:30:45.892 [WARN] User [id=***123] login attempt from IP [192.168.***.***] failed',
            '2024-03-15 10:30:46.123 [ERROR] Database connection timeout after 5000ms',
            '2024-03-15 10:30:46.456 [ERROR] Transaction [txid=******89ab] rollback due to deadlock',
            '2024-03-15 10:30:47.012 [WARN] Rate limit exceeded for API [/api/v1/****]: client IP [10.**.**.101]'
          ]
        },
        {
          id: `${params.value[0]}-${params.seriesName}-1`,
          time: params.value[0],
          instanceName: params.seriesName,
          type: 'Warning',
          message: '检测到性能下降',
          logs: [
            '2024-03-15 10:30:48.123 [WARN] High memory usage detected: 85% [PID=****]',
            '2024-03-15 10:30:48.456 [INFO] Slow query detected [query_id=***def]: execution time 3.5s',
            '2024-03-15 10:30:48.789 [WARN] Connection pool reaching limit: active=45/50',
            '2024-03-15 10:30:49.012 [WARN] Cache hit rate dropped to 65% [region=****]',
            '2024-03-15 10:30:49.345 [INFO] GC pause time exceeded threshold: 800ms'
          ]
        }
      ]
    };
    setSelectedPoint(pointData);
    setModalVisible(true);
  };

  // 生成模拟数据
  const generateData = () => {
    const now = dayjs();
    const data = [];
    const instances = ['实例1', '实例2', '实例3'];
    
    instances.forEach(instance => {
      for (let i = 0; i < 60; i += 5) {
        const time = now.subtract(i, 'minute').format('YYYY-MM-DD HH:mm:ss');
        const value = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
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
        title={`异常点详情 - ${selectedPoint?.instanceName}`}
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

export default KnownAnomalyChart; 