import { useContextController } from "../../context/context";
import * as SC from "./styled";

export const Dashboard = () => {
  const { controller, dispatch } = useContextController();
  const { collections } = controller;
  console.log(collections, "333333333");

  return <SC.Wrapper>AAA</SC.Wrapper>;
};
