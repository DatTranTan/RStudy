import { useEffect, useState } from "react";
import { useContextController } from "../../context/context";
import * as SC from "./styled";
import Api from "../../api";
import { WordType } from "../../types";
import { VerticalCard } from "../../components/VerticalCard";
import { Button } from "antd";

export const Word = () => {
  const { controller, dispatch } = useContextController();
  const { collections } = controller;

  const [words, setWords] = useState<WordType[] | []>([]);

  useEffect(() => {
    const getWords = async () => {
      try {
        const { data } = await Api.getWords();
        await setWords(data)

        console.log(words, '2222222', data);


        // await setCollections(dispatch, res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getWords();
  }, []);

  const createWord = () => {

  }

  return <SC.Wrapper>
    <div>
      <Button onClick={createWord}>Thêm từ</Button>
    </div>
    {
      words?.map((word: WordType, index) => {
        return <VerticalCard word={word.word} 
        image={word.image} 
        meaning={word.meaning} 
        phonetic={word.phonetic}
         audio={word.audio}
         type={word.type} 
         topic={word.topic} 
         exEnglish={word.exEnglish} 
         exVietnamese={word.exVietnamese} />
      })
    }
  </SC.Wrapper>;
};
