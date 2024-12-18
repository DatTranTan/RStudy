import {
  isMobile
} from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper-action {
    margin-bottom: 1rem;
  }

  .mode-card {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .wrapper-container-card {
    display: flex;
    flex-direction: column;
  }

  .wrapper-card {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
`;

export const WrapperItem = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: ${isMobile ? "normal" : "center"};
  overflow-x: auto;
padding-bottom:1rem;
  .ant-card-body {
    text-align: center;
    padding: 1rem;
  }

  .ant-card-cover {
    display: flex;
    padding-top: 1rem;
  }
`;

export const WrapperCarousel = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  /* max-width: 350px;
min-width: 250px; */
  width: ${isMobile ? "100%" : "400px"};
`;
