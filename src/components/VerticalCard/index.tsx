import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useRef, useState } from "react";
import LazyLoad from "react-lazy-load";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants/routers";
import { WordType } from "../../types";
import * as SC from "./styled";

const { Meta } = Card;

type VerticalCardType = {
  wordDetail: WordType;
  setOpen?: (value: boolean) => void;
  deleteWord?: (_id: string, word: string) => void;
  setWordUpdate?: (word: WordType) => void;
};

export const VerticalCard = ({
  wordDetail,
  setOpen,
  deleteWord,
  setWordUpdate,
}: VerticalCardType) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [flip, setFlip] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <SC.Wrapper>
      <Card
        style={{ minWidth: 300 }}
        cover={
          <div style={{ display: "flex" }}>
            <LazyLoad threshold={0.95}>
              <img
                style={{
                  width: "150px",
                  height: "100px",
                  objectFit: "cover",
                  padding: "2px",
                }}
                alt={wordDetail.word}
                src={wordDetail.image}
                loading="lazy"
              />
            </LazyLoad>

            <div
              style={{
                padding: "12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="ant-card-meta-title">{wordDetail.word}</div>
              <>{wordDetail.phonetic}</>
              <i>{wordDetail.type}</i>
            </div>
          </div>
        }
        actions={[
          ...(pathname === ROUTES_PATH.COURSE
            ? [
                flip ? (
                  <EyeInvisibleOutlined
                    key="eyeinvisible"
                    onClick={() => {
                      setFlip(false);
                    }}
                  />
                ) : (
                  <EyeOutlined
                    key="eye"
                    onClick={() => {
                      setFlip(true);
                    }}
                  />
                ),
              ]
            : []),
          <SoundOutlined key="sound" onClick={playAudio} />,
          ...(setOpen
            ? [
                <EditOutlined
                  key="edit"
                  onClick={async () => {
                    if (setWordUpdate) await setWordUpdate(wordDetail);
                    await navigate(`${ROUTES_PATH.WORD}?action=update`);
                    await setOpen(true);
                  }}
                />,
              ]
            : []),
          ...(deleteWord
            ? [
                <DeleteOutlined
                  key="delete"
                  onClick={() => {
                    if (wordDetail._id && wordDetail.word) {
                      deleteWord(wordDetail._id, wordDetail.word);
                    }
                  }}
                />,
              ]
            : []),
        ]}
        // extra={topic}
        // title={`${word} ${phonetic}`}
      >
        <Meta
          style={{
            visibility: flip ? "visible" : "hidden",
          }}
          // avatar={<Avatar src={image} />}
          title={wordDetail.meaning}
          description={
            <>
              <div>{wordDetail.exEnglish}</div> <i>{wordDetail.exVietnamese}</i>
            </>
          }
        />
        <audio ref={audioRef} src={wordDetail.audio} />
      </Card>
    </SC.Wrapper>
  );
};
