import { Layout } from "antd";
import styled from "styled-components";
import { size } from "../../constants/size";
import { fontWeight, space } from "../../constants/theme";

const { Sider } = Layout;

export const Wrapper = styled(Sider)`
  overflow: auto;
  height: calc(100vh - ${size.header}px - ${space.normal});
  left: 0;
  top: 0;
  bottom: 0;

  .ant-menu-item {
    font-weight: ${fontWeight.bold};
  }
`;
