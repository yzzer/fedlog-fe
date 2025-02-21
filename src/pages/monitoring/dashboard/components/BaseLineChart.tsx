import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { formatTimeAxis } from '../utils/timeFormat';

interface BaseLineChartProps {
  data: any[];
  timeRange: string;
  yAxisName: string;
  title?: string;
  onPointClick?: (params: any) => void;
}

const BaseLineChart: React.FC<BaseLineChartProps> = ({
  data,
  timeRange,
  yAxisName,
  title,
  onPointClick
}) => {
  // 获取所有实例
  const instances = Array.from(new Set(data.map(item => item.instanceName)));
  
  // 按实例分组数据
  const seriesData = instances.map(instance => {
    const instanceData = data.filter(item => item.instanceName === instance);
    return {
      name: instance,
      type: 'line',
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 8,
      data: instanceData.map(item => [
        item.time,
        item.value
      ])
    };
  });

  const option = {
    title: title ? {
      text: title,
      left: 'center'
    } : undefined,
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        const time = dayjs(params[0].axisValue).format('YYYY-MM-DD HH:mm:ss');
        let result = `${time}<br/>`;
        params.forEach((param: any) => {
          result += `${param.seriesName}: ${param.value[1]}${yAxisName}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: instances,
      top: 25
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
      name: yAxisName,
      min: 0,
      minInterval: 1,
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: seriesData
  };

  const onEvents = {
    'click': onPointClick
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%' }}
      onEvents={onEvents}
    />
  );
};

export default BaseLineChart; 