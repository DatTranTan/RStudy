import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants/routers";
import { FolderType } from "../../types";
import * as SC from "./styled";
const { Meta } = Card;
type HorizontalCardType = {
  folderDetail: FolderType;
  deleteFolder: (_id: string, name: string) => void;
};

export const HorizontalCard = ({
  folderDetail,
  deleteFolder,
}: HorizontalCardType) => {
  const navigate = useNavigate();
  return (
    <SC.Wrapper>
      <Card
        style={{ minWidth: 300 }}
        // cover={
        //   <img
        //     alt="example"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //   />
        // }
        actions={[
          <AppstoreAddOutlined key="appstoreadd" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined
            key="delete"
            onClick={() => {
              if (folderDetail._id && folderDetail.name)
                deleteFolder(folderDetail._id, folderDetail.name);
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
            avatar={<Avatar src={folderDetail.image} />}
            title={folderDetail.name}
            description={`${folderDetail.topic} | Học phần: ${folderDetail.courses?.length}`}
          />
        </div>
      </Card>
    </SC.Wrapper>
  );
};
