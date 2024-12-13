import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Sider } from "../Sider";
import * as SC from "./styled";

export const GroupLayout = () => {

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
