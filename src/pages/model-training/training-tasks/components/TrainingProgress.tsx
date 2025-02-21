import React from 'react';
import { Line } from '@ant-design/plots';
import { Card, Tabs } from 'antd';

interface TrainingProgressProps {
  data: {
    loss: { epoch: number; value: number }[];
    accuracy: { epoch: number; value: number }[];
  };
}

const TrainingProgress: React.FC<TrainingProgressProps> = ({ data }) => {
  const commonConfig = {
    height: 200,
    autoFit: true,
    smooth: true,
    animation: false,
    point: {
      size: 2,
      shape: 'circle',
    },
    xAxis: {
      label: {
        formatter: (v: string) => `Epoch ${v}`,
      },
    },
  };

  return (
    <Card size="small" style={{ width: 400 }}>
      <Tabs
        items={[
          {
            key: 'loss',
            label: '损失值',
            children: (
              <Line
                {...commonConfig}
                data={data.loss}
                xField="epoch"
                yField="value"
                color="#ff4d4f"
                tooltip={{
                  formatter: (datum) => {
                    return { name: '损失值', value: datum.value.toFixed(4) };
                  },
                }}
              />
            ),
          },
          {
            key: 'accuracy',
            label: '准确率',
            children: (
              <Line
                {...commonConfig}
                data={data.accuracy}
                xField="epoch"
                yField="value"
                color="#52c41a"
                tooltip={{
                  formatter: (datum) => {
                    return { name: '准确率', value: `${(datum.value * 100).toFixed(2)}%` };
                  },
                }}
              />
            ),
          },
        ]}
      />
    </Card>
  );
};

export default TrainingProgress; 