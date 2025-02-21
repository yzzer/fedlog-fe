import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card, theme } from "antd";
import React from "react";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: "8px",
        fontSize: "14px",
        color: token.colorTextSecondary,
        lineHeight: "22px",
        padding: "16px 19px",
        minWidth: "220px",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: "22px",
            backgroundSize: "100%",
            textAlign: "center",
            padding: "8px 16px 16px 12px",
            color: "#FFF",
            fontWeight: "bold",
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: "16px",
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: "14px",
          color: token.colorTextSecondary,
          textAlign: "justify",
          lineHeight: "22px",
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {">"}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel("@@initialState");
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          minHeight: "90vh",
          height: "auto",
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === "realDark"
              ? "linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)"
              : "linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)",
          padding: "32px",
        }}
      >
        <div
          style={{
            backgroundPosition: "95% 32px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "120px auto",
            backgroundImage: "url('logo.svg')",
            minHeight: "100%",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "24px",
              color: token.colorTextHeading,
              paddingInline: "32px",
            }}
          >
            欢迎使用 FedLog 联邦日志异常检测系统
          </div>
          <div
            style={{
              fontSize: "16px",
              color: token.colorTextSecondary,
              lineHeight: "1.8",
              marginBottom: "48px",
              paddingInline: "32px",
              maxWidth: "1200px",
            }}
          >
            <p style={{ marginBottom: "16px" }}>
              欢迎使用 FedLog 联邦日志异常检测系统！FedLog 
              是一个先进的基于联邦学习的日志异常检测平台，专为现代企业和组织设计。它通过独特的分布式数据处理技术，使您能够在不收集原始日志数据的情况下，深入分析和检测日志中的异常行为。
            </p>
            <p style={{ marginBottom: "16px" }}>
              FedLog 的设计理念充分考虑了数据隐私。通过在本地设备上进行数据处理，FedLog 
              能够确保敏感信息不被泄露，同时依然提供高效的异常检测功能。
            </p>
            <p>
              FedLog 能够帮助您及时发现和应对异常情况，从而减少系统故障和服务中断的风险，确保您的用户体验始终如一。
              无论您是从事 IT 运营、网络安全、还是数据分析，FedLog 都将为您提供一套强大的工具，帮助您在快速变化的环境中保持竞争优势。
              立即加入我们，体验 FedLog 如何帮助您优化日志管理、增强数据安全和提升整体业务效率！
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              paddingInline: "32px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            <InfoCard
              index={1}
              href="https://github.com/yzzer/FedDrain"
              title="了解 FedDrain 联邦日志解析框架"
              desc="FedDrain 是一种新型的联邦日志解析框架，它致力于在保护用户数据隐私的前提下，对分布式设备上的日志数据进行高效的解析和分析。联邦学习（Federated Learning, FL）作为一种分布式机器学习方法，通过在设备本地训练模型并聚合局部模型参数的方式，避免了数据的集中存储，从而保护了用户的隐私。而 FedDrain 则在此基础上应用联邦学习的理念，以实现对日志数据的解析。"
            />
            <InfoCard
              index={2}
              title="了解 FedLog 联邦学习框架"
              href="https://github.com/yzzer/FedLog"
              desc="FedLog 是一种专为日志分析设计的联邦学习框架，旨在在分布式环境中保护用户隐私的前提下，实现高效的日志数据建模与分析。与传统的集中式日志分析方法不同，FedLog 利用联邦学习（Federated Learning, FL）来处理不同设备上生成的日志数据，从而避免了日志数据的集中存储和传输需求，有效减少了数据泄露的风险。"
            />
            <InfoCard
              index={3}
              title="了解 FedLog 异常检测平台"
              href="https://github.com/yzzer/fedlog-fe"
              desc="FedLog 异常检测平台是一种基于联邦学习的创新系统，专注于在分布式和隐私保护的环境下进行高效的异常检测，特别是日志数据的异常分析。FedLog 通过整合联邦学习技术，旨在利用分散设备的计算能力，在不传输原始数据的情况下检测日志数据中的异常模式。这种方法特别适合拥有大量边缘设备、严格隐私要求和分布式数据的应用场景。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
