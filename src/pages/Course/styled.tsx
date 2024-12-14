import styled from "styled-components";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


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

 

  

  .wrapper-card{
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  

`;


export const WrapperItem = styled.div`
 display: flex;
    gap: 1rem;
    justify-content: center;

    overflow-x: ${isMobile ? "auto" : "none"}; 


    .ant-card-body {
    text-align: center;
    padding:1rem;
  }

  
  .ant-card-cover {
    display: flex;
    padding-top: 1rem;
  }
`