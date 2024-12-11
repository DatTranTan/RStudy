import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import * as SC from "./styled";
import Cookies from "js-cookie";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sider } from "../Sider";
import { useContextController } from "../../context/context";
import { size } from "../../constants/size";

export const GroupLayout = () => {
  const { controller, dispatch } = useContextController();
  const { collections, collapsedSider, documentId } = controller;

  useEffect(() => {
    Cookies.set("testCookie", "testValue", { expires: 10 / 86400 });
  }, []);

  return (
    <SC.Wrapper>
      <Header />
      <SC.Wrapper>
        <Sider />
        <SC.ContentWrapper>
          <Outlet />
        </SC.ContentWrapper>
      </SC.Wrapper>
      {/* <Footer /> */}
    </SC.Wrapper>
  );
};
