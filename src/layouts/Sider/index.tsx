import { DashboardOutlined, FolderOpenOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { size } from "../../constants/size";
import { useContextController } from "../../context/context";
import * as SC from "./styled";
type MenuItem = Required<MenuProps>['items'][number];

export const Sider = () => {
  const { controller } = useContextController();
  const { collapsedSider } = controller;
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const menuItems: MenuItem[] = [
    {
      key: "/folder",
      label: "Thư mục",
      icon:<DashboardOutlined />
    },
    {
      key: "/word",
      label: "Quản lý từ điển",
      icon:<FolderOpenOutlined />
    },
  ]

  const onClick: MenuProps["onClick"] = async (e) => {
    const { key } = e;    
    navigate(key);
  };

  return (
    <SC.Wrapper
      width={collapsedSider ? size.siderCollapsed : size.siderDefault}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        // defaultOpenKeys={["1", "2", "3", "4"]}
        items={menuItems}
        onClick={onClick}
      />
    </SC.Wrapper>
  );
};
