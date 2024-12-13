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
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  SoundOutlined,
  StarOutlined,
} from "@ant-design/icons";

import type { FormProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { VerticalCard } from "../../components/VerticalCard";
import { FlipCard } from "../../components/FlipCard";
import { DrawerSourse } from "../../components/DrawerSourse";
const { Meta } = Card;

export const Course = () => {
  const [words, setWords] = useState<WordType[] | []>([]);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");

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
        // await setFolder(data);
        setWords(data.words);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <SC.Wrapper>
      {/* <div className="wrapper-action">
        <Button onClick={()=>setOpenDrawer(true)} type="primary">
          Thêm từ
        </Button>
      </div> */}
      <div>
        <SC.WrapperItem>
          {["Thẻ ghi nhớ", "Học từ", "Kiểm tra", "Ghép thẻ"].map((_) => (
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
                    src="https://indongloi.com/wp-content/uploads/in-flashcard-02.jpg"
                  />
                }
              >
                <Meta title={_} />
              </Card>
            </div>
          ))}
        </SC.WrapperItem>
        <div className="wrapper-card">
          {/* {words?.map((word) => {
                return ( */}
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
          {/* );
              })} */}
          {/* <div style={{ maxWidth: 800, minWidth: 300 }}>
            <Carousel arrows infinite={false}>
              {words?.map((word) => {
                return (
                  <div>
                    <div
                      style={{
                        width: "100%",
                        background: "#364d79",
                        padding: "1.5rem",
                      }}
                    >
                      <VerticalCard wordDetail={word} />
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div> */}
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
