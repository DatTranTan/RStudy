import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  notification,
  Row,
  Space,
} from "antd";

import {
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Api from "../../api";
import { FolderType } from "../../types";
import * as SC from "./styled";

import type { FormProps } from "antd";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DrawerSourse } from "../../components/DrawerSourse";
import { HorizontalCard } from "../../components/HorizontalCard";
import { ROUTES_PATH } from "../../constants/routers";
const { Meta } = Card;

export const Folder = () => {
  const navigate = useNavigate();

  // const { controller, dispatch } = useContextController();
  // const { collections } = controller;
  const [folders, setFolders] = useState<FolderType[] | []>([]);
  const [folder, setFolder] = useState<FolderType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  // const { pathname, search } = useLocation();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const folderId = searchParams.get("id");

  useEffect(() => {
    if (folderId) {
      getDetailFolder();
    } else {
      getFolders();
    }
  }, [folderId]);

  const onFinish: FormProps<FolderType>["onFinish"] = async (values) => {
    try {
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

  const getDetailFolder = async () => {
    try {
      if (folderId) {
        const { data } = await Api.getFolderById(folderId);
        await setFolder(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFolders = async () => {
    try {
      const { data } = await Api.getFolders();
      await setFolders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFolder = async (_id: string, name: string) => {
    try {
      if (!_id) return;
      await Api.deleteFolder({
        id: _id,
        name: name,
      });
      notification.success({
        message: "THÀNH CÔNG",
        description: "Thành công",
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "THẤT BẠI",
        description: (error as any).message,
      });
    } finally {
      getFolders();
    }
  };

  console.log(folders, "333333333");

  return (
    <SC.Wrapper>
      <DrawerSourse
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        getDetailFolder={getDetailFolder}
      />

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
        {folderId ? (
          <>
            <Button
              icon={<ArrowLeftOutlined />}
              style={{ marginRight: "0.5rem" }}
              onClick={() => {
                navigate(ROUTES_PATH.FOLDER);
              }}
            ></Button>
            <Button onClick={() => setOpenDrawer(true)} type="primary">
              Thêm học phần
            </Button>
          </>
        ) : (
          <Button onClick={onOpen} type="primary">
            Thêm thư mục
          </Button>
        )}
      </div>
      {!folderId ? (
        <div className="mode-card">
          <Row gutter={[12, 12]}>
            {folders?.map((folder: FolderType, index) => {
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
                <Card
                  style={{ minWidth: 300, cursor: "pointer" }}
                  onClick={() => {
                    navigate(`${ROUTES_PATH.COURSE}?id=${item._id}`);
                  }}
                >
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
      )}
    </SC.Wrapper>
  );
};
