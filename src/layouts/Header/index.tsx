import { Input, Popover } from "antd";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { setCollapsedSider, useContextController } from "../../context/context";
import * as SC from "./styled";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants/routers";
import { CollectionsType, DocumentType } from "../../types";

export const Header = () => {
  const { controller, dispatch } = useContextController();
  const { collections, collapsedSider } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    const getCollections = async () => {
      try {
        // const folders = await Api.getFolder();
        // const words = await Api.getWords();
        // console.log(words);
        // await setCollections(dispatch, res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCollections();
  }, []);

  const onSelectDocument = (
    collection: CollectionsType,
    document: DocumentType
  ) => {
    const url = `${ROUTES_PATH.CONTENT}?cid=${
      collection.id
    }&cname=${encodeURIComponent(collection.name)}&did=${
      document.id
    }&dname=${encodeURIComponent(document.name)}`;

    navigate(url);
  };

  const onSelectCollection = (collection: CollectionsType) => {
    const url = `${ROUTES_PATH.DOCUMENT}?cid=${collection.id}`;
    navigate(url);
  };

  return (
    <SC.Wrapper>
      <BrowserView>
        <SC.LeftWrapper>
          <img className="logo" src={logo} alt="" />
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
        <div className="right-bottom">
          {collections?.map((_) => {
            return (
              <Popover
                placement="bottom"
                // trigger={"click"}
                content={
                  <div className="header-menu-popover">
                    {_.document?.map((item) => {
                      return (
                        <div
                          className="header-menu-popover-item"
                          onClick={() => onSelectDocument(_, item)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                }
                arrow={false}
              >
                <div
                  className="right-bottom__menu"
                  onClick={() => onSelectCollection(_)}
                >
                  {_.name}
                </div>
              </Popover>
            );
          })}
        </div>
      </SC.RightWrapper>
    </SC.Wrapper>
  );
};
