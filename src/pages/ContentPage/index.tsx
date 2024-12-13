import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useContextController } from "../../context/context";
import { DocumentType } from "../../types";
import * as SC from "./styled";

export const ContentPage = () => {
  const { controller } = useContextController();
  const {  documentId } = controller;
  // console.log(collections, "333333333");
  const [childrensDoc, setChildrensDoc] = useState<DocumentType[]>([]);
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
        setChildrensDoc([])
        setAudios([])
        setVideos([])
        setPosts([])
      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, [documentId]);


  return (
    <SC.Wrapper>
      <Row gutter={[20, 20]}>
        {childrensDoc?.map((_) => {
          return (
            <Col
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 4 }}
            >
              {/* <VerticalCard
                name={_.name}
                image={_.image}
                description={_.description}
              /> */}
            </Col>
          );
        })}
        {videos?.map((_) => {
          return (
            <Col
              xs={{ span: 12 }}
              sm={{ span: 8 }}
              md={{ span: 6 }}
              xxl={{ span: 4 }}
            >
              {/* <VerticalCard
                name={_.name}
                image={_.thumbnail}
                videoUrl={_.videoUrl}
              /> */}
            </Col>
          );
        })}
        {audios?.map((_) => {
          return (
            <Col xs={{ span: 24 }}>
              {/* <HorizontalCard name={_.name} /> */}
            </Col>
          );
        })}
        {posts?.map((_) => {
          return (
            <Col xs={{ span: 24 }}>
              {/* <HorizontalCard name={_.name} /> */}
            </Col>
          );
        })}
      </Row>
    </SC.Wrapper>
  );
};
