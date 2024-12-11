import { Layout } from "antd";
import styled from "styled-components";

const { Footer } = Layout;

export const Wrapper = styled(Footer)`
  position: sticky;
  bottom: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;
