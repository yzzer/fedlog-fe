import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Upload,
  Modal,
  Descriptions,
  Tooltip,
  Typography,
  Tabs,
  message,
  Dropdown
} from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  BookOutlined,
  GithubOutlined,
  BranchesOutlined,
  CloudUploadOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  CodeOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import CodeViewer from './components/CodeViewer';

const { Text, Link } = Typography;
const { TabPane } = Tabs;

interface ModelVersion {
  version: string;
  commitId: string;
  publishTime: string;
  publisher: string;
  description: string;
  environment: {
    python: string;
    cuda: string;
    dependencies: string[];
  };
}

interface ModelCode {
  id: string;
  name: string;
  description: string;
  type: 'anomaly' | 'clustering' | 'classification';
  framework: 'pytorch' | 'tensorflow' | 'sklearn';
  currentVersion: string;
  status: 'online' | 'offline' | 'deprecated';
  creator: string;
  createTime: string;
  updateTime: string;
  versions: ModelVersion[];
}

// 模拟数据
const mockModels: ModelCode[] = [
  {
    id: 'model-001',
    name: 'LogAnomaly',
    description: '基于LSTM的日志异常检测模型',
    type: 'anomaly',
    framework: 'pytorch',
    currentVersion: 'v1.2.0',
    status: 'online',
    creator: '游张政',
    createTime: '2024-01-15 10:00:00',
    updateTime: '2024-03-10 15:30:00',
    versions: [
      {
        version: 'v1.2.0',
        commitId: 'a1b2c3d4',
        publishTime: '2024-03-10 15:30:00',
        publisher: '游张政',
        description: '优化模型训练性能，支持增量学习',
        environment: {
          python: '3.8',
          cuda: '11.7',
          dependencies: ['torch==1.12.0', 'numpy==1.21.0', 'pandas==1.4.0']
        }
      },
      {
        version: 'v1.1.0',
        commitId: 'e5f6g7h8',
        publishTime: '2024-02-15 09:20:00',
        publisher: '游张政',
        description: '添加模型可解释性模块',
        environment: {
          python: '3.8',
          cuda: '11.7',
          dependencies: ['torch==1.12.0', 'numpy==1.21.0', 'pandas==1.4.0']
        }
      }
    ]
  },
  // ... 可以添加更多模型
];

const CodeRepo: React.FC = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelCode | null>(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const handleViewDetail = (record: ModelCode) => {
    setSelectedModel(record);
    setDetailVisible(true);
  };

  const moreActions: MenuProps['items'] = [
    {
      key: 'template',
      label: '下载模板框架',
      icon: <DownloadOutlined />,
      onClick: () => {
        message.success('开始下载模板框架');
        // 实际下载逻辑
      }
    },
    {
      key: 'sdk',
      label: '查看SDK文档',
      icon: <BookOutlined />,
      onClick: () => {
        window.open('/sdk-docs', '_blank');
      }
    },
    {
      key: 'github',
      label: '访问GitHub仓库',
      icon: <GithubOutlined />,
      onClick: () => {
        window.open('https://github.com/your-repo', '_blank');
      }
    }
  ];

  const columns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ModelCode) => (
        <Link onClick={() => handleViewDetail(record)}>
          {text}
        </Link>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colorMap = {
          anomaly: 'red',
          clustering: 'green',
          classification: 'blue'
        };
        return <Tag color={colorMap[type]}>{type.toUpperCase()}</Tag>;
      }
    },
    {
      title: '框架',
      dataIndex: 'framework',
      key: 'framework',
      render: (framework: string) => {
        const colorMap = {
          pytorch: 'volcano',
          tensorflow: 'orange',
          sklearn: 'green'
        };
        return <Tag color={colorMap[framework]}>{framework}</Tag>;
      }
    },
    {
      title: '当前版本',
      dataIndex: 'currentVersion',
      key: 'currentVersion',
      render: (version: string) => (
        <Space>
          <BranchesOutlined />
          <span>{version}</span>
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap = {
          online: 'success',
          offline: 'default',
          deprecated: 'error'
        };
        return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: ModelCode) => (
        <Space>
          <Button 
            type="link" 
            icon={<CloudUploadOutlined />}
            onClick={() => setUploadModalVisible(true)}
          >
            发布新版本
          </Button>
          <Button 
            type="link" 
            icon={<SettingOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            管理
          </Button>
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button 
              type="primary" 
              icon={<UploadOutlined />}
              onClick={() => setUploadModalVisible(true)}
            >
              上传新模型
            </Button>
            <Dropdown menu={{ items: moreActions }}>
              <Button icon={<DownloadOutlined />}>
                更多操作
              </Button>
            </Dropdown>
          </Space>
        </div>
        <Table 
          columns={columns} 
          dataSource={mockModels}
          rowKey="id"
        />
      </Card>

      {/* 模型详情弹窗 */}
      <Modal
        title={`${selectedModel?.name} 详情`}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        width={1000}
        footer={null}
      >
        {selectedModel && (
          <Tabs defaultActiveKey="info">
            <TabPane 
              tab={
                <span>
                  <CodeOutlined />
                  基本信息
                </span>
              } 
              key="info"
            >
              <Descriptions column={2}>
                <Descriptions.Item label="模型ID">{selectedModel.id}</Descriptions.Item>
                <Descriptions.Item label="模型名称">{selectedModel.name}</Descriptions.Item>
                <Descriptions.Item label="创建人">{selectedModel.creator}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{selectedModel.createTime}</Descriptions.Item>
                <Descriptions.Item label="当前版本">{selectedModel.currentVersion}</Descriptions.Item>
                <Descriptions.Item label="框架">{selectedModel.framework}</Descriptions.Item>
                <Descriptions.Item label="描述" span={2}>{selectedModel.description}</Descriptions.Item>
              </Descriptions>
            </TabPane>
            <TabPane 
              tab={
                <span>
                  <BranchesOutlined />
                  版本历史
                </span>
              } 
              key="versions"
            >
              <Table
                dataSource={selectedModel.versions}
                columns={[
                  {
                    title: '版本号',
                    dataIndex: 'version',
                    key: 'version',
                  },
                  {
                    title: 'Commit ID',
                    dataIndex: 'commitId',
                    key: 'commitId',
                  },
                  {
                    title: '发布时间',
                    dataIndex: 'publishTime',
                    key: 'publishTime',
                  },
                  {
                    title: '发布人',
                    dataIndex: 'publisher',
                    key: 'publisher',
                  },
                  {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                  }
                ]}
                rowKey="version"
                pagination={false}
              />
            </TabPane>
            <TabPane 
              tab={
                <span>
                  <EnvironmentOutlined />
                  运行环境
                </span>
              } 
              key="environment"
            >
              <Descriptions column={1}>
                <Descriptions.Item label="Python版本">
                  {selectedModel.versions[0].environment.python}
                </Descriptions.Item>
                <Descriptions.Item label="CUDA版本">
                  {selectedModel.versions[0].environment.cuda}
                </Descriptions.Item>
                <Descriptions.Item label="依赖包">
                  {selectedModel.versions[0].environment.dependencies.map(dep => (
                    <Tag key={dep} style={{ margin: '4px' }}>{dep}</Tag>
                  ))}
                </Descriptions.Item>
              </Descriptions>
            </TabPane>
            <TabPane 
              tab={
                <span>
                  <CodeOutlined />
                  代码查看
                </span>
              } 
              key="code"
            >
              <CodeViewer
                files={[
                  {
                    name: 'model.py',
                    content: `import torch
import torch.nn as nn

class LogAnomaly(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers):
        super(LogAnomaly, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers)
        self.fc = nn.Linear(hidden_size, input_size)
    
    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out)
        return out`,
                    language: 'python'
                  },
                  {
                    name: 'train.py',
                    content: `from model import LogAnomaly
import torch.optim as optim

# Initialize model
model = LogAnomaly(100, 128, 2)
optimizer = optim.Adam(model.parameters())

# Training loop
for epoch in range(num_epochs):
    for batch in dataloader:
        optimizer.zero_grad()
        output = model(batch)
        loss = criterion(output, batch)
        loss.backward()
        optimizer.step()`,
                    language: 'python'
                  }
                ]}
              />
            </TabPane>
          </Tabs>
        )}
      </Modal>

      {/* 上传模型弹窗 */}
      <Modal
        title="上传模型代码"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        onOk={() => {
          message.success('上传成功');
          setUploadModalVisible(false);
        }}
      >
        <Upload.Dragger
          accept=".zip,.tar.gz"
          multiple={false}
          beforeUpload={() => false}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
            支持 .zip 或 .tar.gz 格式的代码压缩包
          </p>
        </Upload.Dragger>
      </Modal>
    </PageContainer>
  );
};

export default CodeRepo; 