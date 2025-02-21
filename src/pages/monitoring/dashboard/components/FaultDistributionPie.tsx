import React from 'react';
import ReactECharts from 'echarts-for-react';
import { MockDataGenerator } from '../utils/mockDataGenerator';

interface FaultDistributionPieProps {
  timeRange: string;
  serviceId: string;
}

const FaultDistributionPie: React.FC<FaultDistributionPieProps> = ({ timeRange, serviceId }) => {
  const mockData = new MockDataGenerator(timeRange, serviceId).generateFaultDistribution();

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: mockData.map(item => item.name)
    },
    series: [
      {
        name: '故障分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}个'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: mockData
      }
    ],
    color: ['#1890ff', '#13c2c2', '#722ed1', '#eb2f96', '#faad14']
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default FaultDistributionPie; 