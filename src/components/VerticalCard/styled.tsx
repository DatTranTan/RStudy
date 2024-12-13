import styled from "styled-components";

export const Wrapper = styled.div`
height: 100%;
  .ant-card .ant-card-body {
    padding: 12px;
    flex: auto;
  }

  .ant-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .ant-card .ant-card-meta-title {
    white-space: normal;
  }

  .LazyLoad {
    opacity: 0;
    transition: all 1s ease-in-out;
  }

  .is-visible {
    opacity: 1;
  }
`;
