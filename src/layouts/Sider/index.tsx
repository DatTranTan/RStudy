import { FolderOpenOutlined, ReadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { size } from "../../constants/size";
import { setTitleHeader, useContextController } from "../../context/context";
import * as SC from "./styled";
import { useEffect } from "react";
type MenuItem = Required<MenuProps>["items"][number];

export const Sider = () => {
  const { controller, dispatch } = useContextController();

  const { collapsedSider } = controller;
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      const item = menuItems.find(
        (menuItem: MenuItem) => menuItem?.key === pathname
      );
      setTitleHeader(dispatch, (item as any)?.label);
    }
  }, [pathname]);

  const menuItems: MenuItem[] = [
    {
      key: "/folder",
      label: "Thư viện của tôi",
      icon: <FolderOpenOutlined />,
    },
    {
      key: "/word",
      label: "Quản lý từ điển",
      icon: <ReadOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = async (e) => {
    console.log(e);

    const { key } = e;
    await navigate(key);

    const item = menuItems.find((menuItem: MenuItem) => menuItem?.key === key);
    setTitleHeader(dispatch, (item as any).label);
  };

  return (
    <SC.Wrapper
      width={collapsedSider ? size.siderCollapsed : size.siderDefault}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={menuItems}
        onClick={onClick}
      />
    </SC.Wrapper>
  );
};
