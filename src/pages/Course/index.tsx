import {
  Button,
  Card,
  Carousel,
  Drawer,
  Form,
  Input,
  notification,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import Api from "../../api";
import { FolderType, WordType } from "../../types";
import * as SC from "./styled";

import type { FormProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { VerticalCard } from "../../components/VerticalCard";
const { Meta } = Card;

export const Course = () => {
  const [words, setWords] = useState<WordType[] | []>([]);
  const [open, setOpen] = useState<boolean>(false);
  // const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");

  console.log("courseId", courseId);

  useEffect(() => {
    if (courseId) {
      getDetailCourse();
    }
  }, [courseId]);

  const onFinish: FormProps<FolderType>["onFinish"] = async (values) => {
    try {
      // const { message } = await Api.createFolder(values);
      await Api.createFolder(values);

      await onClose();

      await notification.success({
        message: "THÀNH CÔNG",
        description: "Thành công",
      });
    } catch (error) {
      console.log(error);
    } finally {
      getFolders();
    }
  };

  const onFinishFailed: FormProps<FolderType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  const getFolders = async () => {
    try {
      const { data } = await Api.getFolders();
      await setWords(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(words, "333333333");

  return (
    <SC.Wrapper>
      <Drawer
        title={`Thêm thư mục`}
        placement="right"
        size={"large"}
        width={"100%"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" form="input-folder">
              OK
            </Button>
          </Space>
        }
      >
        <Form
          name="input-folder"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FolderType>
            label="Nhập tên thư mục"
            name="name"
            rules={[{ required: true, message: "Không để trống mục này" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FolderType>
            label="Nhập chủ đề"
            name="topic"
            rules={[{ required: true, message: "Không để trống mục này" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FolderType> label="Nhập đường dẫn hình ảnh" name="image">
            <Input size="large" placeholder="https://image.png" />
          </Form.Item>
        </Form>
      </Drawer>
      <div className="wrapper-action">
        <Button onClick={onOpen} type="primary">
          Thêm thư mục
        </Button>
      </div>
      <div>
        <div className="wrapper-item">
          {["Flashcard", "Learn", "Test"].map((_) => (
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
        </div>
        <div className="wrapper-card">
          <div style={{ maxWidth: 800, minWidth: 300 }}>
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
          </div>
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
