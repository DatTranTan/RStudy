import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  TableOutlined,
} from "@ant-design/icons";
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
  Table,
} from "antd";
import { useEffect, useState } from "react";
import Api from "../../api";
import { VerticalCard } from "../../components/VerticalCard";
import { WordType } from "../../types";
import * as SC from "./styled";

import type { FormProps, TableColumnsType, TablePaginationConfig } from "antd";
type FieldType = {
  inputWords: string;
};

export const Word = () => {
  // const { controller, dispatch } = useContextController();
  // const { collections } = controller;

  const [words, setWords] = useState<WordType[] | []>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isModeTable, setIsModeTable] = useState<boolean>(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 100,
  });

  useEffect(() => {
    getWords();
  }, []);

  const getWords = async () => {
    try {
      const { data } = await Api.getWords();
      await setWords(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWord = async (_id: string, word: string) => {
    try {
      if (!_id) return;
      await Api.deleteWord({
        id: _id,
        word: word,
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
      getWords();
    }
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const inputWords = await parseData(values.inputWords);
      inputWords.map(async (inputWord) => {
        const resWord = await Api.createWord(inputWord);
        console.log(resWord);
      });
      await onClose();
    } catch (error) {
      console.log(error);
    } finally {
      getWords();
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

  const paginationChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const selectTopic = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns: TableColumnsType = [
    {
      title: <center>STT</center>,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 50,
      render: (_: WordType, _record: WordType, _index: number) => (
        <>
          {Number(pagination.pageSize) * (Number(pagination.current) - 1) +
            _index +
            1}
        </>
      ),
    },
    {
      title: <center>TỪ</center>,
      dataIndex: "word",
      key: "word",
      width: "10%",
    },
    {
      title: <center>PHIÊN ÂM</center>,
      dataIndex: "phonetic",
      key: "phonetic",
      width: "10%",
    },
    {
      title: <center>NGHĨA</center>,
      dataIndex: "meaning",
      key: "meaning",
      width: "15%",
    },
    {
      title: <center>TỪ LOẠI</center>,
      dataIndex: "type",
      key: "type",
      width: 50,
    },
    {
      title: <center>VÍ DỤ TIẾNG ANH</center>,
      dataIndex: "exEnglish",
      key: "exEnglish",
    },
    {
      title: <center>VÍ DỤ TIẾNG VIỆT</center>,
      dataIndex: "exVietnamese",
      key: "exVietnamese",
    },

    {
      title: <center>ẢNH</center>,
      dataIndex: "image",
      key: "image",
      width: 80,
      align: "center",
      render: (_: string) => (
        <img style={{ height: 50, objectFit: "cover" }} src={_} />
      ),
    },
    {
      title: <center>TÁC VỤ</center>,
      key: "action",
      width: 100,
      align: "center",
      render: (_, _record) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            style={{ marginRight: "0.5rem", color: "#ff8600" }}
            onClick={() => {
              // setDetail(_record);
              // setOpen(true);
              // navigate(ROUTES_PATH.GOD_WORD_EDIT.replace(":id", _record?.id));
            }}
          ></Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            style={{ marginRight: "0.5rem", color: "#ff0000" }}
            onClick={() => {
              deleteWord(_record._id, _record.word);
            }}
          ></Button>
        </>
      ),
    },
  ];

  return (
    <SC.Wrapper>
      <Drawer
        title={`Thêm từ điển`}
        placement="right"
        size={"large"}
        width={"100%"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" form="input-word">
              OK
            </Button>
          </Space>
        }
      >
        <Form
          name="input-word"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
                ảnh&nbsp;&nbsp;&nbsp;&nbsp;Từ loại&nbsp;&nbsp;&nbsp;&nbsp;Ví dụ
                tiếng Anh&nbsp;&nbsp;&nbsp;&nbsp;Ví dụ tiếng
                Việt&nbsp;&nbsp;&nbsp;&nbsp;Chủ đề
              </>
            }
          >
            <Input.TextArea rows={15} />
          </Form.Item>
        </Form>
      </Drawer>

      <div className="wrapper-action">
        <Button onClick={onOpen} type="primary">
          Thêm từ
        </Button>
        <Button
          icon={isModeTable ? <AppstoreOutlined /> : <TableOutlined />}
          style={{ marginLeft: "0.5rem" }}
          onClick={() => {
            setIsModeTable(!isModeTable);
          }}
        ></Button>
        <Select
          defaultValue="all"
          style={{ width: 150, marginLeft: "0.5rem" }}
          onChange={selectTopic}
          options={[
            { value: "all", label: "Tất cả" },
            { value: "elementary", label: "Sơ cấp" },
            { value: "intermediate", label: "Trung cấp" },
            { value: "advanced", label: "Cao cấp" },
            { value: "ielts", label: "IELTS" },
            { value: "oxford", label: "Oxford" },
            { value: "student", label: "Sinh viên" },
            { value: "communication", label: "Giao tiếp" },
            { value: "ofice", label: "Văn phòng" },
          ]}
        />
      </div>
      {isModeTable ? (
        <div className="mode-table">
          <Table
            columns={columns}
            dataSource={words}
            size="small"
            scroll={{ y: `calc(100vh - 330px)` }}
            bordered
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: words.length,
              showSizeChanger: true,
              pageSizeOptions: ["20", "50", "100", "200", "500", "1000"],
            }}
            onChange={(pagination) => paginationChange(pagination)}
          />
        </div>
      ) : (
        <div className="mode-card">
          <Row gutter={[12, 12]}>
            {words?.map((word: WordType, index) => {
              return (
                <Col
                  className="gutter-row"
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xxl={{ span: 6 }}
                >
                  <VerticalCard
                    key={index}
                    deleteWord={deleteWord}
                    wordDetail={word}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </SC.Wrapper>
  );
};
