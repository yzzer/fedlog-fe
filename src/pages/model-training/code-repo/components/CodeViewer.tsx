import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, Select, Space } from 'antd';

const { Option } = Select;

interface CodeViewerProps {
  files: {
    name: string;
    content: string;
    language: string;
  }[];
}

const CodeViewer: React.FC<CodeViewerProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = React.useState(files[0]?.name);

  const currentFile = files.find(file => file.name === selectedFile);

  return (
    <Card
      title={
        <Space>
          <span>代码查看器</span>
          <Select
            value={selectedFile}
            onChange={setSelectedFile}
            style={{ width: 200 }}
          >
            {files.map(file => (
              <Option key={file.name} value={file.name}>
                {file.name}
              </Option>
            ))}
          </Select>
        </Space>
      }
      bodyStyle={{ padding: 0 }}
    >
      {currentFile && (
        <SyntaxHighlighter
          language={currentFile.language}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            margin: 0,
            borderRadius: '0 0 8px 8px',
          }}
        >
          {currentFile.content}
        </SyntaxHighlighter>
      )}
    </Card>
  );
};

export default CodeViewer; 