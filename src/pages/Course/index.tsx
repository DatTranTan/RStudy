import {
  Avatar,
  Button,
  Card,
  Carousel,
  Drawer,
  Form,
  Input,
  List,
  notification,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import Api from "../../api";
import { FolderType, WordType } from "../../types";
import * as SC from "./styled";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  SoundOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import icon_flashcard from "../../assets/icon_flashcard.png";
import icon_game from "../../assets/icon_game.png";
import icon_test from "../../assets/icon_test.png";
import icon_learn from "../../assets/icon_learn.png";
import type { FormProps } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VerticalCard } from "../../components/VerticalCard";
import { FlipCard } from "../../components/FlipCard";
import { DrawerSourse } from "../../components/DrawerSourse";
import { ROUTES_PATH } from "../../constants/routers";
import { setTitleHeader, useContextController } from "../../context/context";
const { Meta } = Card;

export const Course = () => {
  const { controller, dispatch } = useContextController();
  const { titleHeader } = controller;
  const [words, setWords] = useState<WordType[] | []>([]);
  const [folderId, setFolderId] = useState<string>("");
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const navigate = useNavigate();

  console.log("courseId", courseId);

  useEffect(() => {
    if (courseId) {
      getDetailCourse();
    }
  }, [courseId]);

  const getDetailCourse = async () => {
    try {
      if (courseId) {
        const { data } = await Api.getCourseById(courseId);
        await setFolderId(data.folder);
        await setWords(data.words);
        await setTitleHeader(dispatch, `Học phần: ${data?.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SC.Wrapper>
      <div className="wrapper-action">
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: "0.5rem" }}
          onClick={() => {
            navigate(`${ROUTES_PATH.FOLDER}?id=${folderId}`);
          }}
        ></Button>
      </div>
      <MobileView>
        <h1>{titleHeader}</h1>
      </MobileView>

      <div className="wrapper-container-card">
        <SC.WrapperCarousel>
          <Carousel arrows infinite={false}>
            {words?.map((word) => {
              return (
                <div>
                  <div
                    style={{
                      width: "100%",
                      background: "#364d79",
                      padding: isMobile ? "1.5rem" : "2rem",
                    }}
                  >
                    <VerticalCard wordDetail={word} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </SC.WrapperCarousel>
        <SC.WrapperItem>
          {[
            { text: "Thẻ ghi nhớ", image: icon_flashcard },

            { text: "Học tập", image: icon_learn },
            { text: "Kiểm tra", image: icon_test },
            { text: "Trò chơi", image: icon_game },
          ].map((_) => (
            <div>
              <Card
                hoverable
                style={{ width: 200 }}
                cover={
                  <img
                    alt=""
                    style={{
                      height: 70,
                      width: 70,
                      objectFit: "cover",
                      margin: "auto",
                      borderRadius: "1rem",
                    }}
                    src={_.image}
                  />
                }
              >
                <Meta title={_.text} />
              </Card>
            </div>
          ))}
        </SC.WrapperItem>
        <div className="wrapper-card">
          <List
            style={{ background: "#f0f0f0", padding: "1rem", width: "100%" }}
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 20,
            }}
            dataSource={words}
            renderItem={(item) => <FlipCard wordDetail={item} />}
          />
        </div>
      </div>
      {/* {!courseId ? (
        <div className="mode-card">
          <Row gutter={[12, 12]}>
            {words?.map((folder: FolderType, index) => {
              return (
                <Col
                  className="gutter-row"
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xxl={{ span: 6 }}
                >
                  <HorizontalCard
                    key={index}
                    deleteFolder={deleteFolder}
                    folderDetail={folder}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      ) : (
        <div className="mode-detail">
          <div className="wrapper-card-course">
            {folder?.courses?.map((item: any) => {
              return (
                <Card style={{ minWidth: 300 }}>
                  <Meta
                    title={item.name}
                    description={`Số lượng từ: ${
                      item.words.length
                    } | Ngày tạo: ${dayjs(new Date(item.createdAt)).format(
                      "DD/MM/YYYY"
                    )}`}
                  />
                </Card>
              );
            })}
          </div>
        </div>
      )} */}
    </SC.Wrapper>
  );
};
