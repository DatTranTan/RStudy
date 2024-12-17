import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants/routers";
import { FolderType } from "../../types";
import * as SC from "./styled";
import Api from "../../api";
const { Meta } = Card;

type HorizontalCardType = {
  folderDetail: FolderType;
  getFolders: () => void;
  setFolderUpdate: (value: FolderType) => void;
  setOpen: (value: boolean) => void;
};

export const HorizontalCard = ({
  folderDetail,
  getFolders,
  setFolderUpdate,
  setOpen,
}: HorizontalCardType) => {
  const navigate = useNavigate();

  const deleteFolder = async () => {
    try {
      if (!folderDetail._id) return;
      await Api.deleteFolder({
        id: folderDetail._id,
        name: folderDetail.name,
      });
      notification.success({
        message: "THÀNH CÔNG",
        description: "Xóa thư mục thành công",
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
  return (
    <SC.Wrapper>
      <Card
        style={{ minWidth: 300 }}
        cover={
          <img
            alt={folderDetail.image}
            src={folderDetail.image}
            style={{ padding: "2px", cursor: "pointer" }}
            onClick={() => {
              navigate(`${ROUTES_PATH.FOLDER}?id=${folderDetail._id}`);
            }}
          />
        }
        actions={[
          <EditOutlined
            key="edit"
            onClick={async () => {
              await navigate(`${ROUTES_PATH.FOLDER}?action=update`);
              await setFolderUpdate(folderDetail);
              await setOpen(true);
            }}
          />,
          <DeleteOutlined
            key="delete"
            onClick={() => {
              Modal.confirm({
                title: "Xác nhận xóa?",
                width: 500,
                centered: true,
                content: folderDetail.name,
                okType: "danger",
                onOk: deleteFolder,
                // onOk: () => {
                //   if (folderDetail._id && folderDetail.name)
                //     deleteFolder(folderDetail._id, folderDetail.name);
                // },
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
          className="wrapper-meta"
          onClick={() => {
            navigate(`${ROUTES_PATH.FOLDER}?id=${folderDetail._id}`);
          }}
        >
          <Meta
            // avatar={<Avatar src={folderDetail.image} />}
            title={folderDetail.name}
            description={`${folderDetail.topic} | Học phần: ${folderDetail.courses?.length}`}
          />
        </div>
      </Card>
    </SC.Wrapper>
  );
};
