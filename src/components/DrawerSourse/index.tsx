import { DeleteOutlined, EditOutlined, SoundOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  List,
  notification,
  Select,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { CourseType, WordType } from "../../types";
import * as SC from "./styled";
import Api from "../../api";
import type { FormProps } from "antd";
import { useSearchParams } from "react-router-dom";

const { Meta } = Card;

type DrawerSourseType = {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  getDetailFolder: () => void;
};

export const DrawerSourse = ({
  openDrawer,
  setOpenDrawer,
  getDetailFolder
}: DrawerSourseType) => {
  const [count, setCount] = useState<number>(0);
  const [words, setWords] = useState<WordType[] | []>([]);
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get("id");
  const [form] = Form.useForm();

  useEffect(() => {
    if (openDrawer) getWords();
  }, [openDrawer]);

  const onFinish: FormProps<CourseType>["onFinish"] = async (values) => {
    try {
      if (folderId && values.name && values.wordIds) {
        const payload = { ...values, folderId };

        const { data } = await Api.createCourse(payload);
        // await Api.createFolder(values);

        await onClose();
        console.log(values, data);
await form.resetFields()
        await notification.success({
          message: "THÀNH CÔNG",
          description: "Thêm học phần thành công",
        });
      }
    } catch (error) {
      console.log(error);
      await notification.error({
        message: "LỖI",
        description: "Xảy ra lỗi khi thêm học phần",
      });
    }finally{

      getDetailFolder()
    }
  };

  const onFinishFailed: FormProps<CourseType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const getWords = async () => {
    try {
      const { data } = await Api.getWords();
      const updatedData = data.map((item: WordType) => ({
        ...item,
        value: item._id,
        label: `${item.word} - ${item.meaning}`,
      }));
      await setWords(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleChange = (value: string[]) => {
    setCount(value.length);
  };

  return (
    <SC.Wrapper>
      <Drawer
        title={`Thêm học phần`}
        placement="right"
        size={"large"}
        width={"100%"}
        onClose={onClose}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" form="input-course">
              OK
            </Button>
          </Space>
        }
      >
        <Form
        form={form}
          name="input-course"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item<CourseType>
            label="Nhập tên học phần"
            name="name"
            rules={[{ required: true, message: "Không để trống mục này" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<CourseType>
            label={`Chọn các từ cho học phần này | Số từ đã chọn: ${count}`}
            name="wordIds"
            rules={[{ required: true, message: "Không để trống mục này" }]}
          >
            <Select
              size="large"
              mode="multiple"
              // style={{ width: '100%' }}
              placeholder="Tìm kiếm để chọn"
              // defaultValue={['china']}
              onChange={handleChange}
              options={words}
              labelRender={(label) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {label.label}
                </div>
              )}
              optionRender={(option) => (
                <Space>
                  <b>{option.data.word}</b>
                  <i>{option.data.phonetic}</i>
                  <>{option.data.meaning}</>
                </Space>
              )}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </SC.Wrapper>
  );
};
