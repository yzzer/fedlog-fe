import React from 'react';
import ReactECharts from 'echarts-for-react';
import { MockDataGenerator } from '../utils/mockDataGenerator';

interface FaultTypeBarChartProps {
  timeRange: string;
  serviceId: string;
}

const FaultTypeBarChart: React.FC<FaultTypeBarChartProps> = ({ timeRange, serviceId }) => {
  const mockData = new MockDataGenerator(timeRange, serviceId).generateFaultTypeStats();

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['严重', '警告', '提示'],
      top: 10
    },
    grid: {
      top: '60px',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '故障数量',
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '严重',
        type: 'bar',
        stack: 'total',
        barWidth: '50%',
        emphasis: {
          focus: 'series'
        },
        data: mockData.map(item => item.critical)
      },
      {
        name: '警告',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: mockData.map(item => item.warning)
      },
      {
        name: '提示',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: mockData.map(item => item.info)
      }
    ],
    color: ['#ff4d4f', '#faad14', '#52c41a']
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default FaultTypeBarChart; 