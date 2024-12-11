import { useEffect, useState } from "react";
import { useContextController } from "../../context/context";
import * as SC from "./styled";
import Api from "../../api";
import { DocumentType } from "../../types";
import { VerticalCard } from "../../components/VerticalCard";
import { Col, Row } from "antd";
import { HorizontalCard } from "../../components/HorizontalCard";
import icon4 from "../../assets/icon4.png";
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const Music = () => {
  const { controller, dispatch } = useContextController();
  const { collections, documentId } = controller;
  // console.log(collections, "333333333");
  const [childrensDoc, setChildrensDoc] = useState<DocumentType[]>([]);
  const [contentType, setContentType] = useState<number>(123);
  const [videos, setVideos] = useState<DocumentType[]>([]);
  const [audios, setAudios] = useState<DocumentType[]>([]);
  const [posts, setPosts] = useState<DocumentType[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // const res = await Api.contents({
        //   documentId: documentId,
        // });
        // const { contents, childrensDoc } = res.data;
        // setChildrensDoc(childrensDoc);
        // const { contentType, video, post, audio } = contents;
        // setContentType(contentType);
        // setVideos(video);
        // setAudios(audio);
        // setPosts(post);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, [documentId]);

  return (
    <SC.Wrapper>
      <Row gutter={[20, 20]}>
        {audios?.map((_) => {
          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={icon4}
                  alt=""
                  style={{ width: "70px", height: "70px", objectFit: "cover" }}
                />
                <div
                  style={{
                    marginLeft: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{_.name}</div>
                  <div>20/02/2024</div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <HeartOutlined />
                    <QuestionCircleOutlined />
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </SC.Wrapper>
  );
};
