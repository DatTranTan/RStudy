import { DeleteOutlined, EditOutlined, SoundOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import { useRef, useState } from "react";
import { WordType } from "../../types";
import * as SC from "./styled";

const { Meta } = Card;

export const FlipCard = ({ wordDetail }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFlip, setIsFlip] = useState<boolean>(false);

  return (
    <SC.Wrapper onClick={() => setIsFlip(!isFlip)}>
      <List.Item
        key={wordDetail.word}
        actions={[
          <SoundOutlined key="sound" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" />,
        ]}
        extra={
          <img
            style={{ height: 100, objectFit: "cover" }}
            alt={wordDetail.image}
            src={wordDetail.image}
          />
        }
      >
        {isFlip ? (
          <div className="flip-card-front">
            <List.Item.Meta
              title={wordDetail.meaning}
              description={wordDetail.type}
            />
          </div>
        ) : (
          <div className="flip-card-back">
            <List.Item.Meta
              title={wordDetail.word}
              description={wordDetail.phonetic}
            />
          </div>
        )}
        <div>{wordDetail.exEnglish}</div>
        <div>{wordDetail.exVietnamese}</div>
      </List.Item>
    </SC.Wrapper>
  );
};
