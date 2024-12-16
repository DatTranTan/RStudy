import { Input } from "antd";
import {
  BrowserView
} from "react-device-detect";
import logo from "../../assets/logo.png";
import { setCollapsedSider, useContextController } from "../../context/context";
import * as SC from "./styled";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";


export const Header = () => {
  const { controller, dispatch } = useContextController();
  const { titleHeader, collapsedSider } = controller;

  return (
    <SC.Wrapper>
      <BrowserView>
        <SC.LeftWrapper>
          <img className="logo" src={logo} alt="" />
          <h1>{titleHeader}</h1>
        </SC.LeftWrapper>
      </BrowserView>
      {/* <MobileView>
  <h1>This is rendered only on mobile</h1>
</MobileView> */}

      <SC.RightWrapper>
        <div className="right-top">
          <Input
            // size="large"
            placeholder="Tìm kiếm"
            className="right-top__input"
          />
          {collapsedSider ? (
            <MenuUnfoldOutlined
              className="icon-style"
              onClick={() => {
                setCollapsedSider(dispatch, false);
              }}
            />
          ) : (
            <MenuFoldOutlined
              className="icon-style"
              onClick={() => {
                setCollapsedSider(dispatch, true);
              }}
            />
          )}
          {/* <UserOutlined className="icon-style" /> */}
        </div>
       
      </SC.RightWrapper>
    </SC.Wrapper>
  );
};
