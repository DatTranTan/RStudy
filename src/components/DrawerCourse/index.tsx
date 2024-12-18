import type { FormProps } from "antd";
import { Button, Drawer, Form, Input, notification, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Api from "../../api";
import { ROUTES_PATH } from "../../constants/routers";
import { CourseType, WordType } from "../../types";
import * as SC from "./styled";

type DrawerCourseType = {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  courseDetail: CourseType | null;
  getDetailFolder?: () => void;
  getDetailCourse?: () => void;
};

export const DrawerCourse = ({
  openDrawer,
  setOpenDrawer,
  courseDetail,
  getDetailFolder,
  getDetailCourse,
}: DrawerCourseType) => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [words, setWords] = useState<WordType[] | []>([]);
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const action = searchParams.get("action");
  const folderId = searchParams.get("id");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (openDrawer) getWords();
  }, [openDrawer]);

  useEffect(() => {
    console.log(courseDetail);

    if (courseDetail?.words && action === "update") {
      const wordIds = courseDetail.words.map((word: any) => word._id);

      form.setFieldsValue({
        name: courseDetail?.name,
        wordIds: wordIds,
      });
    }
  }, [courseDetail, action]);

  const onFinish: FormProps<CourseType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      if (
        pathname === ROUTES_PATH.COURSE &&
        action === "update" &&
        courseDetail
      ) {
        const payloadUpdate = { ...values, id: courseDetail._id };

        await Api.updateCourse(payloadUpdate);
        await notification.success({
          message: "THÀNH CÔNG",
          description: "Cập nhật học phần thành công",
        });
      }

      if (pathname === ROUTES_PATH.FOLDER && folderId) {
        const payloadCreate = { ...values, folderId: folderId };
        await Api.createCourse(payloadCreate);
        await notification.success({
          message: "THÀNH CÔNG",
          description: "Thêm mới học phần thành công",
        });
      }

      await form.resetFields();
      await setLoading(false);
      await onClose();
    } catch (error) {
      console.log(error);
      await notification.error({
        message: "LỖI",
        description: "Xảy ra lỗi khi thêm học phần",
      });
      await setLoading(false);
    }
  };

  const onFinishFailed: FormProps<CourseType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const getWords = async () => {
    try {
      const { data } = await Api.getWordsAvailable({}, courseDetail?._id);
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

  const onClose = async () => {
    setOpenDrawer(false);
    if (
      pathname === ROUTES_PATH.COURSE &&
      action === "update" &&
      getDetailCourse
    ) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("action");
      await navigate(`${location.pathname}?${searchParams.toString()}`);
      await getDetailCourse();
    }

    if (pathname === ROUTES_PATH.FOLDER && getDetailFolder) {
      await navigate(`${ROUTES_PATH.FOLDER}?id=${folderId}`);
      await getDetailFolder();
    }
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
            <Button onClick={onClose}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              form="input-course"
              loading={loading}
            >
              Đồng ý
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
              placeholder="Tìm kiếm để chọn"
              onChange={handleChange}
              options={words}
              labelRender={(label) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {label.label}
                </div>
              )}
              optionRender={(option) => (
                <Space>
                  <img alt="" style={{ height: 50 }} src={option.data.image} />
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
