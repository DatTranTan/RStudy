import { Layout } from "antd";
import styled from "styled-components";
import { image, size } from "../../constants/size";
import {
  borderRadius,
  color,
  fontSize,
  fontWeight,
  space,
} from "../../constants/theme";

const { Header } = Layout;

export const Wrapper = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  height: ${size.header}px;
  margin-bottom: ${space.md};
  line-height: unset;
  overflow: auto;

  .icon-style {
    font-size: ${fontSize.md};
    cursor: pointer;
    margin: 0 ${space.sm};
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;

  .logo {
    border-radius: ${borderRadius.circle};
    height: ${size.header}px;
    object-fit: cover;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .right-top {
    display: flex;
    justify-content: end;
  }

  .right-top__input {
    width: 250px;
    margin-right: ${space.md};
  }

  .right-bottom {
    display: flex;
    justify-content: center;
    gap: ${space.xl};
    margin-top: ${space.sm};
  }

  .right-bottom__item {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.bold};
    cursor: pointer;
  }

  .right-bottom__menu {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.bold};
    cursor: pointer;
  }

  .right-bottom__menu:hover {
    color: ${color.default};
  }

  .ant-popover-content {
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
    min-width: 200px;
  }

  .ant-menu .ant-menu-item {
    display: flex;
  }
`;