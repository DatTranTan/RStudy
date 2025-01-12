import { DeleteOutlined, EditOutlined, SoundOutlined } from "@ant-design/icons";
import { List } from "antd";
import { useRef } from "react";
import * as SC from "./styled";

export const FlipCard = ({ wordDetail }: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
                </span>{" "}
                ({wordDetail.type})
              </div>
              {/* <div>{wordDetail.meaning}</div> */}
            </>
          }
          description={
            <div style={{ color: "#ff0000", fontWeight: "700" }}>
              {wordDetail.meaning}
            </div>
          }
        />
        <div style={{ color: "#002bff" }}>{wordDetail.exEnglish}</div>
        <div>{wordDetail.exVietnamese}</div>
      </List.Item>
    </SC.Wrapper>
  );
};
