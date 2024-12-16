import { DeleteOutlined, EditOutlined, SoundOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import { useRef, useState } from "react";
import { WordType } from "../../types";
import * as SC from "./styled";

const { Meta } = Card;

export const FlipCard = ({ wordDetail }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFlip, setIsFlip] = useState<boolean>(false);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <SC.Wrapper>
      <audio ref={audioRef} src={wordDetail.audio} />

      <List.Item
        key={wordDetail.word}
        actions={[
          <SoundOutlined key="sound" onClick={playAudio} />,
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
        <List.Item.Meta
          title={
            <>
              <div>
                {wordDetail.word}{" "}
                <span
                  style={{
                    color: "#00000073",
                  }}
                >
                  {wordDetail.phonetic}
                </span>
              </div>
              <div>{wordDetail.meaning}</div>
            </>
          }
          description={wordDetail.type}
        />
        <div>{wordDetail.exEnglish}</div>
        <div>{wordDetail.exVietnamese}</div>
      </List.Item>
    </SC.Wrapper>
  );
};
