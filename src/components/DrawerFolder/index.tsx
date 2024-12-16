import type { FormProps } from "antd";
import { Button, Drawer, Form, Input, notification, Space } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import Api from "../../api";
import { ROUTES_PATH } from "../../constants/routers";
import { FolderType } from "../../types";
import * as SC from "./styled";
import { useEffect } from "react";

type DrawerFolderType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  folderUpdate: FolderType | null;
  getFolders: () => void;
};

export const DrawerFolder = ({
  open,
  setOpen,
  folderUpdate,
  getFolders,
}: DrawerFolderType) => {
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get("id");
  const [form] = Form.useForm();
  const action = searchParams.get("action");
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "update" && folderUpdate) {
      form.setFieldsValue({
        name: folderUpdate?.name,
        topic: folderUpdate?.topic,
        image: folderUpdate?.image,
      });
    }
  }, [folderUpdate,open]);
 
  const onFinish: FormProps<FolderType>["onFinish"] = async (values) => {
    try {
      console.log(values);
      if (action === "create") {
        await Api.createFolder(values);
      } else {
        await Api.updateFolder({ id: folderUpdate?._id, ...values });
      }

      await onClose();

      const message =
        action === "create"
          ? "Thêm mới thư mục thành công"
          : "Cập nhật thư mục thành công";
      await notification.success({
        message: "THÀNH CÔNG",
        description: message,
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

  const onClose = async () => {
    await form.resetFields();
    await setOpen(false);
    await navigate(ROUTES_PATH.FOLDER);
  };

  return (
    <SC.Wrapper>
      <Drawer
        title={`${action === "create" ? "Thêm mới" : "Cập nhật"} thư mục`}
        placement="right"
        size={"large"}
        width={"100%"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" form="input-folder">
              Đồng ý
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
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
            <Input size="large" placeholder="Ví dụ: https://image.png" />
          </Form.Item>
        </Form>
      </Drawer>
    </SC.Wrapper>
  );
};
