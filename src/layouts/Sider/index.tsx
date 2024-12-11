import type { MenuProps } from "antd";
import { Menu } from "antd";
import { size } from "../../constants/size";
import { setDocumentId, useContextController } from "../../context/context";
import * as SC from "./styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import { ROUTES_PATH } from "../../constants/routers";

export const Sider = () => {
  const { controller, dispatch } = useContextController();
  const { collapsedSider, collections, documentId } = controller;
  const navigate = useNavigate();

  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [menuItems, setMenuItems] = useState<{ key: string; label: string }[]>(
    [{
      key: 'dashboard',
      label: 'Trang chu'
    }, {
      key: 'word',
      label: 'Quan ly tu dien'
    }]
  );

  const onClick: MenuProps["onClick"] = async (e) => {
    const { key } = e;
    setDocumentId(dispatch, key);
    navigate(ROUTES_PATH.WORD);
  };



  return (
    <SC.Wrapper
      width={collapsedSider ? size.siderCollapsed : size.siderDefault}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[documentId]}
        defaultOpenKeys={["1", "2", "3", "4"]}
        items={menuItems}
        onClick={onClick}
      />
    </SC.Wrapper>
  );
};
