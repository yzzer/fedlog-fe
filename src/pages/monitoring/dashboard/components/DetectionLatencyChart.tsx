import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { formatTimeAxis } from '../utils/timeFormat';
import { MockDataGenerator } from '../utils/mockDataGenerator';

interface DetectionLatencyChartProps {
  timeRange: string;
  serviceId: string;
}

const DetectionLatencyChart: React.FC<DetectionLatencyChartProps> = ({ timeRange, serviceId }) => {
  const mockData = new MockDataGenerator(timeRange, serviceId).generateDetectionLatency();

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        const time = dayjs(params[0].value[0]).format('YYYY-MM-DD HH:mm:ss');
        let result = `${time}<br/>`;
        params.forEach((param: any) => {
          const color = param.color;
          const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
          result += `${marker}${param.seriesName}: ${param.value[1].toFixed(1)}ms<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: Array.from(new Set(mockData.map(item => item.instanceName))),
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        formatter: (value: string) => formatTimeAxis(value, timeRange)
      }
    },
    yAxis: {
      type: 'value',
      name: '延迟(ms)',
      min: 0,
      max: 40,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        formatter: '{value}ms'
      }
    },
    series: Array.from(new Set(mockData.map(item => item.instanceName))).map(instance => ({
      name: instance,
      type: 'line',
      showSymbol: false,
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: mockData
        .filter(item => item.instanceName === instance)
        .map(item => [item.time, item.value])
    })),
    color: ['#1890ff', '#13c2c2', '#722ed1'],
    // 添加警戒线
    markLine: {
      silent: true,
      lineStyle: {
        color: '#ff4d4f'
      },
      data: [
        {
          yAxis: 30,
          label: {
            formatter: '警戒线: 30ms'
          }
        }
      ]
    }
  };

  return <ReactECharts option={option} style={{ height: '100%' }} />;
};

export default DetectionLatencyChart; 