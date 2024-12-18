import type { FormProps } from "antd";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Api from "../../api";
import { ROUTES_PATH } from "../../constants/routers";
import { topicWord } from "../../constants/topicWord";
import { WordType } from "../../types";
import * as SC from "./styled";

type FieldType = {
  inputWords: string;
  word?: string;
  meaning?: string;
  phonetic?: string;
  audio?: string;
  image?: string;
  type?: string;
  topic?: string;
  exEnglish?: string;
  exVietnamese?: string;
};

type DrawerWordType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  wordUpdate: WordType | null;
  getWords: (topic: string, search: string) => void;
};

export const DrawerWord = ({
  open,
  setOpen,
  wordUpdate,
  getWords,
}: DrawerWordType) => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const action = searchParams.get("action");
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "update" && wordUpdate) {
      form.setFieldsValue({
        word: wordUpdate.word,
        meaning: wordUpdate.meaning,
        phonetic: wordUpdate.phonetic,
        audio: wordUpdate.audio,
        image: wordUpdate.image,
        type: wordUpdate.type,
        topic: wordUpdate.topic,
        exEnglish: wordUpdate.exEnglish,
        exVietnamese: wordUpdate.exVietnamese,
      });
    }
  }, [action, open]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {

      if (action === "create") {
        const inputWords = await parseData(values.inputWords);
        inputWords.map(async (inputWord) => {
          await Api.createWord(inputWord);
        });
      } else {
        await Api.updateWord({ id: wordUpdate?._id, ...values });
      }
      
      await onClose();

      const message =
        action === "create"
          ? "Thêm mới từ thành công"
          : "Cập nhật từ thành công";

          await notification.success({
            message: "THÀNH CÔNG",
            description: message,
          });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "THẤT BẠI",
        description: (error as any).message,
      });
    } finally {
      getWords('','')
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const parseData = (data: string): WordType[] => {
    return data
      .trim()
      .split("\n")
      .map((line) => {
        const [
          word,
          meaning,
          phonetic,
          audio,
          image,
          type,
          exEnglish,
          exVietnamese,
          topic,
        ] = line.split("\t");
        return {
          word,
          meaning,
          phonetic,
          audio,
          image,
          type,
          exEnglish,
          exVietnamese,
          topic,
        };
      });
  };

  const onClose = async () => {
    await form.resetFields();
    await setOpen(false);
    await navigate(`${ROUTES_PATH.WORD}`);
  };

  return (
    <SC.Wrapper>
      <Drawer
        title={`${action === "create" ? "Thêm mới" : "Cập nhật"} từ`}
        placement="right"
        size={"large"}
        width={"100%"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" form="input-word">
              Đồng ý
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="input-word"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {action === "create" ? (
            <Form.Item<FieldType>
              label="Nhập dữ liệu vào đây (giữa các từ cách nhau bởi dấu Tab, giữa các hàng cách nhau bởi dấu Enter)"
              name="inputWords"
              rules={[{ required: true, message: "Không để trống mục này" }]}
              extra={
                <>
                  love&nbsp;&nbsp;&nbsp;&nbsp;yêu&nbsp;&nbsp;&nbsp;&nbsp;/lʌv/&nbsp;&nbsp;&nbsp;&nbsp;https://love.mp3&nbsp;&nbsp;&nbsp;&nbsp;https://love.png&nbsp;&nbsp;&nbsp;&nbsp;v.&nbsp;&nbsp;&nbsp;&nbsp;I
                  love you&nbsp;&nbsp;&nbsp;&nbsp;Tôi yêu
                  bạn&nbsp;&nbsp;&nbsp;&nbsp;intermediate
                </>
              }
              help={
                <>
                  Từ tiếng anh&nbsp;&nbsp;&nbsp;&nbsp;Nghĩa tiếng
                  Việt&nbsp;&nbsp;&nbsp;&nbsp;Phiên
                  âm&nbsp;&nbsp;&nbsp;&nbsp;Đường dẫn
                  audio&nbsp;&nbsp;&nbsp;&nbsp;Đường dẫn hình
                  ảnh&nbsp;&nbsp;&nbsp;&nbsp;Từ loại&nbsp;&nbsp;&nbsp;&nbsp;Ví
                  dụ tiếng Anh&nbsp;&nbsp;&nbsp;&nbsp;Ví dụ tiếng
                  Việt&nbsp;&nbsp;&nbsp;&nbsp;Chủ đề
                </>
              }
            >
              <Input.TextArea rows={15} />
            </Form.Item>
          ) : (
            <>
              <Row gutter={[24, 0]}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item<FieldType>
                    label="Nhập từ vựng"
                    name="word"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item<FieldType>
                    label="Nhập phiên âm"
                    name="phonetic"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item<FieldType>
                    label="Nhập nghĩa của từ"
                    name="meaning"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 6 }}>
                  <Form.Item<FieldType>
                    label="Chọn chủ đề"
                    name="topic"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Select size="large" options={topicWord.slice(1)} />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 6 }}>
                  <Form.Item<FieldType>
                    label="Nhập từ loại"
                    name="type"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item<FieldType>
                    label="Nhập đường dẫn hình ảnh"
                    name="image"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item<FieldType>
                    label="Nhập đường dẫn âm thanh"
                    name="audio"
                    rules={[
                      { required: true, message: "Không để trống mục này" },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item<FieldType>
                label="Nhập ví dụ tiếng Anh"
                name="exEnglish"
                rules={[{ required: true, message: "Không để trống mục này" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Nhập ví dụ tiếng Việt"
                name="exVietnamese"
                rules={[{ required: true, message: "Không để trống mục này" }]}
              >
                <Input size="large" />
              </Form.Item>
            </>
          )}{" "}
        </Form>
      </Drawer>
    </SC.Wrapper>
  );
};
