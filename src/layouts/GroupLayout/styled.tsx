import { Layout } from "antd";
import styled from "styled-components";
import { scrollbar, size } from "../../constants/size";
import { space } from "../../constants/theme";

const { Content } = Layout;

export const Wrapper = styled(Layout)`
  overflow: hidden;
  .ant-layout .ant-layout-sider,
  .ant-layout-sider-children {
    background-color: #ffffff;
    ${scrollbar}
    overflow-y: auto;
  }
`;

export const ContentWrapper = styled(Content)`
  padding: ${space.normal};
  background-color: #ffffff;
  height: calc(100vh - ${size.header}px - ${space.normal});

  overflow: auto;

  /* ${scrollbar} */
`;
