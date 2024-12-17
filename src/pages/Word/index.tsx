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
  Empty,
  Form,
  Input,
  Modal,
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
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import type { FormProps, TableColumnsType, TablePaginationConfig } from "antd";
import { topicWord } from "../../constants/topicWord";
import { DrawerWord } from "../../components/DrawerWord";
import { ROUTES_PATH } from "../../constants/routers";
import { useNavigate } from "react-router-dom";

export const Word = () => {
  // const { controller, dispatch } = useContextController();
  // const { collections } = controller;
  const navigate = useNavigate();
  const [words, setWords] = useState<WordType[] | []>([]);
  const [wordUpdate, setWordUpdate] = useState<WordType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isModeTable, setIsModeTable] = useState<boolean>(isBrowser);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 100,
  });

  useEffect(() => {
    getWords(topic, search);
  }, [topic, search]);

  const getWords = async (topic: string, search: string) => {
    try {
      const { data } = await Api.getWords({ topic, search });
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
        description: "Xóa từ thành công",
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "THẤT BẠI",
        description: (error as any).message,
      });
    } finally {
      getWords(topic, search);
    }
  };

  const onOpen = async () => {
    await setOpen(true);
    await navigate(`${ROUTES_PATH.WORD}?action=create`);
  };

  const deleteAllWord = async () => {
    try {
      await Api.deleteAllWord();
      notification.success({
        message: "THÀNH CÔNG",
        description: "Xóa từ điển thành công",
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "THẤT BẠI",
        description: (error as any).message,
      });
    } finally {
      getWords(topic, search);
    }
  };

  const paginationChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const selectTopic = async (value: string) => {
    console.log(`selected ${value}`);
    await setTopic(value);
    await setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const columns: TableColumnsType = [
    {
      title: <center>STT</center>,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      // width: 50,
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
      // width: "10%",
    },
    {
      title: <center>PHIÊN ÂM</center>,
      dataIndex: "phonetic",
      key: "phonetic",
      // width: "10%",
    },
    {
      title: <center>NGHĨA</center>,
      dataIndex: "meaning",
      key: "meaning",
      // width: "15%",
    },
    {
      title: <center>TỪ LOẠI</center>,
      dataIndex: "type",
      key: "type",
      // width: 50,
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
      // width: 80,
      align: "center",
      render: (_: string) => (
        <img style={{ height: 50, objectFit: "cover" }} src={_} />
      ),
    },
    {
      title: <center>TÁC VỤ</center>,
      key: "action",
      // width: 100,
      align: "center",
      render: (_, _record) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            style={{ marginRight: "0.5rem", color: "#ff8600" }}
            onClick={async () => {
              await setWordUpdate(_record);
              await navigate(`${ROUTES_PATH.WORD}?action=update`);
              await setOpen(true);
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
      <DrawerWord
        wordUpdate={wordUpdate}
        open={open}
        setOpen={setOpen}
        getWords={getWords}
      />
      <div className="wrapper-action">
        <Button onClick={onOpen} type="primary">
          Thêm từ
        </Button>
        <Button
          style={{ marginLeft: "0.5rem" }}
          onClick={() => {
            Modal.confirm({
              title: "Xác nhận xóa?",
              width: 500,
              centered: true,
              content: `Đây là chức năng xóa toàn bộ từ có trong từ điển. Một khi đã xóa thì không thể khôi phục được. Đảm bảo rằng việc xóa này là hợp lý?`,
              okType: "danger",
              onOk: deleteAllWord,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
          type="primary"
        >
          Xóa tất cả
        </Button>
        <Button
          icon={isModeTable ? <AppstoreOutlined /> : <TableOutlined />}
          style={{ marginLeft: "0.5rem" }}
          onClick={() => {
            setIsModeTable(!isModeTable);
          }}
        ></Button>
        <Select
          defaultValue=""
          style={{ width: 120, marginLeft: "0.5rem" }}
          onChange={selectTopic}
          options={topicWord}
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
          {words.length === 0 ? (
            <Empty description={false} />
          ) : (
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
                      setOpen={setOpen}
                      deleteWord={deleteWord}
                      wordDetail={word}
                      setWordUpdate={setWordUpdate}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      )}
    </SC.Wrapper>
  );
};
