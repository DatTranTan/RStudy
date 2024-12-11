import { useEffect, useState } from "react";
import { setCollapsedSider, useContextController } from "../../context/context";
import * as SC from "./styled";
import Api from "../../api";
import { CollectionsType, DocumentType } from "../../types";
import { VerticalCard } from "../../components/VerticalCard";
import { Col, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { space } from "../../constants/theme";
import { ROUTES_PATH } from "../../constants/routers";

export const DocumentMenu = () => {
  const { controller, dispatch } = useContextController();
  const { collections } = controller;
  const navigate = useNavigate();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [collection, setCollection] = useState<CollectionsType>();

  useEffect(() => {
    // setCollapsedSider(dispatch, true);

    collections?.map((_) => {
      if (_.id.toString() === queryParams.get("cid")) {
        setCollection(_);
      }
    });
  }, [search, collections]);

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

  return (
    <SC.Wrapper>
      <h1 style={{ textAlign: "center", marginBottom: space.xl }}>
        {collection?.name}
      </h1>
      <Row gutter={[20, 20]}>
        {collection?.document?.map((_) => {
          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 4 }}
            >
              <SC.CardWrapper
                src={_.image}
                alt={_.name}
                onClick={() => onSelectDocument(collection, _)}
              />
            </Col>
          );
        })}
      </Row>
    </SC.Wrapper>
  );
};
