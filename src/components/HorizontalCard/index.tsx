import { Card } from "antd";
import { DocumentType } from "../../types";
import * as SC from "./styled";
import { CustomerServiceOutlined } from "@ant-design/icons";

export const HorizontalCard = ({
  name,
  description,
  audioUrl,
  postUrl,
}: DocumentType) => {
  return (
    <SC.Wrapper>
      <div>{name}</div>
      <CustomerServiceOutlined />
    </SC.Wrapper>
  );
};
