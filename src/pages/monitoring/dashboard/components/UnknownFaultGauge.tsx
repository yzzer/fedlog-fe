import React from 'react';
import ReactECharts from 'echarts-for-react';
import { MockDataGenerator } from '../utils/mockDataGenerator';

interface UnknownFaultGaugeProps {
  timeRange: string;
  serviceId: string;
}

const UnknownFaultGauge: React.FC<UnknownFaultGaugeProps> = ({ timeRange, serviceId }) => {
  const { count, severity } = new MockDataGenerator(timeRange, serviceId).generateUnknownFaultStats();

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 8,
        radius: '90%',
        center: ['50%', '60%'],
        progress: {
          show: true,
          width: 18,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#ff4d4f' },
                { offset: 1, color: '#ffccc7' }
              ]
            }
          }
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          show: true,
          fontSize: 14,
          offsetCenter: [0, '20%'],
          color: '#666'
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-15%'],
          fontSize: 40,
          fontWeight: 'bold',
          formatter: '{value}',
          color: '#ff4d4f'
        },
        data: [
          {
            value: count,
            name: '未知故障数'
          }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default UnknownFaultGauge; 