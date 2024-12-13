import styled from "styled-components";
import bg_signin from "../../assets/bg_signin.png";
import { borderRadius, fontWeight } from "../../constants/theme";

export const Wrapper = styled.div`
  background-image: url(${bg_signin});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;

  .card-wrapper {
    margin: auto;
    width: 400px;
    border-radius: ${borderRadius.normal};
    /* background: transparent; */
    background-color: rgba(0, 0, 0, 0.2);
    border-width: 2px;
  }

  input {
    font-weight: ${fontWeight.bold};
  }

  .ant-form-item-label > label {
    color: #fff;
  }

  .ant-input,
  .ant-input-affix-wrapper {
    background: transparent;
    color: #fff;
  }

  button {
    font-weight: ${fontWeight.bold};
  }
`;
