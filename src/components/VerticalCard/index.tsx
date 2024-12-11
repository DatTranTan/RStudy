import { Avatar, Card } from "antd";
import { DocumentType, WordType } from "../../types";
import * as SC from "./styled";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, SoundOutlined } from '@ant-design/icons';
import { useRef } from "react";

const { Meta } = Card;

export const VerticalCard = ({
  word,
  meaning,
  phonetic,
  audio,
  image,
  type,
  topic,
  exEnglish,
  exVietnamese,
}: WordType) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <SC.Wrapper>
     <Card
    style={{ width: 300 }}
    cover={
      <img
      style={{width:'100%', height:'200px', objectFit:'cover',padding:'2px'}}
        alt={word}
        src={image}
      />
    }
    actions={[
      <SoundOutlined key='sound' onClick={playAudio}/>,
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete"/>
    ]}
    extra={type}
    title={`${word} ${phonetic}`}
  >
    <Meta
      // avatar={<Avatar src={image} />}
      title={meaning}
      description={<><div>{exEnglish}</div> <i>{exVietnamese}</i></>}
    />
     <audio ref={audioRef} src={audio} />
  </Card>
    </SC.Wrapper>
  );
};
