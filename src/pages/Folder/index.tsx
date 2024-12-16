import { Button, Card, Col, Empty, Form, Modal, notification, Row } from "antd";

import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Api from "../../api";
import { FolderType } from "../../types";
import * as SC from "./styled";

import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DrawerFolder } from "../../components/DrawerFolder";
import { DrawerSourse } from "../../components/DrawerSourse";
import { HorizontalCard } from "../../components/HorizontalCard";
import { ROUTES_PATH } from "../../constants/routers";
import { setTitleHeader, useContextController } from "../../context/context";
import { MobileView } from "react-device-detect";
const { Meta } = Card;

export const Folder = () => {
  const navigate = useNavigate();

  const { controller, dispatch } = useContextController();
  const { titleHeader } = controller;
  const [folders, setFolders] = useState<FolderType[] | []>([]);
  const [folder, setFolder] = useState<FolderType | null>(null);
  const [folderUpdate, setFolderUpdate] = useState<FolderType | null>(null);
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

  const getDetailFolder = async () => {
    try {
      if (folderId) {
        const { data } = await Api.getFolderById(folderId);
        await setFolder(data);
        await setTitleHeader(dispatch, `Thư mục: ${data?.name}`);
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

  const deleteSourse = async (id: string, name: string) => {
    try {
      if (!id) return;
      await Api.deleteCourse({
        id: id,
        name: name,
      });
      notification.success({
        message: "THÀNH CÔNG",
        description: "Xóa học phần thành công",
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "THẤT BẠI",
        description: (error as any).message,
      });
    } finally {
      getDetailFolder();
    }
  };

  return (
    <SC.Wrapper>
      <DrawerSourse
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        getDetailFolder={getDetailFolder}
      />

      <DrawerFolder
        open={open}
        setOpen={setOpen}
        folderUpdate={folderUpdate}
        getFolders={getFolders}
      />
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
            <Button
              onClick={() => {
                setOpenDrawer(true);
              }}
              type="primary"
            >
              Thêm học phần
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setOpen(true);
              navigate(`${ROUTES_PATH.FOLDER}?action=create`);
            }}
            type="primary"
          >
            Thêm thư mục
          </Button>
        )}
      </div>
      <MobileView>
        <h1>{titleHeader}</h1>
      </MobileView>
      {!folderId ? (
        <div className="mode-card">
          {folders.length === 0 ? (
            <Empty description={false} />
          ) : (
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
                      getFolders={getFolders}
                      setFolderUpdate={setFolderUpdate}
                      setOpen={setOpen}
                      folderDetail={folder}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      ) : (
        <div className="mode-detail">
          {folder?.courses?.length === 0 ? (
            <Empty description={false} />
          ) : (
            <div className="wrapper-card-course">
              <Row gutter={[12, 12]}>
                {folder?.courses?.map((item: any) => {
                  return (
                    <Col
                      className="gutter-row"
                      xs={{ span: 24 }}
                      md={{ span: 12 }}
                      lg={{ span: 8 }}
                      xxl={{ span: 6 }}
                    >
                      <Card
                        style={{ minWidth: 300, cursor: "pointer" }}
                        actions={[
                          <EditOutlined key="edit" />,
                          <DeleteOutlined
                            key="delete"
                            onClick={() => {
                              Modal.confirm({
                                title: "Xác nhận xóa?",
                                width: 500,
                                centered: true,
                                content: <>{item.name}</>,
                                okType: "danger",
                                onOk: () => deleteSourse(item._id, item.name),
                                footer: (_, { OkBtn, CancelBtn }) => (
                                  <>
                                    <CancelBtn />
                                    <OkBtn />
                                  </>
                                ),
                              });
                            }}
                          />,
                        ]}
                      >
                        <div
                          onClick={() => {
                            navigate(`${ROUTES_PATH.COURSE}?id=${item._id}`);
                          }}
                        >
                          <Meta
                            title={item.name}
                            description={`Số lượng từ: ${
                              item.words.length
                            } | Ngày tạo: ${dayjs(
                              new Date(item.createdAt)
                            ).format("DD/MM/YYYY")}`}
                          />
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </div>
      )}
    </SC.Wrapper>
  );
};
