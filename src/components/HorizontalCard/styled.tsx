import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  .wrapper-meta {
    cursor: pointer;
  }
  .ant-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .ant-card-body {
    flex: auto;
    padding: 12px;
  }

  .ant-avatar {
    width: 52px;
    height: 52px;
  }

  .ant-card .ant-card-meta-title {
    white-space: normal;
  }
`;
