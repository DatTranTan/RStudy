import styled from "styled-components";
import { borderRadius } from "../../constants/theme";

export const Wrapper = styled.div``;

export const CardWrapper = styled.img`
  border-radius: ${borderRadius.normal};
  width: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    transition: 300ms;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
