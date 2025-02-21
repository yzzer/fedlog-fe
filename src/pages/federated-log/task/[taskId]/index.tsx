import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import { useParams } from 'umi';

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  
  return (
    <PageContainer>
      <Card>
        <div>任务详情页面 - TaskID: {taskId}</div>
      </Card>
    </PageContainer>
  );
};

export default TaskDetail; 