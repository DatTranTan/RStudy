import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Card, Carousel, List, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { isMobile, MobileView } from "react-device-detect";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Api from "../../api";
import icon_flashcard from "../../assets/icon_flashcard.png";
import icon_game from "../../assets/icon_game.png";
import icon_learn from "../../assets/icon_learn.png";
import icon_test from "../../assets/icon_test.png";
import { DrawerSourse } from "../../components/DrawerSourse";
import { FlipCard } from "../../components/FlipCard";
import { VerticalCard } from "../../components/VerticalCard";
import { ROUTES_PATH } from "../../constants/routers";
import { setTitleHeader, useContextController } from "../../context/context";
import { CourseType } from "../../types";
import * as SC from "./styled";
const { Meta } = Card;

export const Course = () => {
  const { controller, dispatch } = useContextController();
  const { titleHeader } = controller;
  // const [words, setWords] = useState<WordType[] | []>([]);
  const [course, setCourse] = useState<CourseType | null>(null);
  // const [folderId, setFolderId] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname, '999999999');
    
    if (courseId) {
      getDetailCourse();
    }
  }, [courseId]);

  const getDetailCourse = async () => {
    try {
      if (courseId) {
        const { data } = await Api.getCourseById(courseId);
        await setTitleHeader(dispatch, `Học phần: ${data?.name}`);
        await setCourse(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onOpen = async () => {
    await setOpenDrawer(true);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("action", "update");
    await navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const deleteSourse = async () => {
    try {
      if (!course?._id) return;
      await Api.deleteCourse({
        id: course._id,
        name: course.name,
      });
      await notification.success({
        message: "THÀNH CÔNG",
        description: "Xóa học phần thành công",
      });

      await navigate(`${ROUTES_PATH.FOLDER}?id=${course?.folder}`);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "THẤT BẠI",
        description: (error as any).message,
      });
    }
  };

  return (
    <SC.Wrapper>
      <DrawerSourse
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        courseDetail={course}
        getDetailCourse={getDetailCourse}
      />
      <div className="wrapper-action">
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: "0.5rem" }}
          onClick={() => {
            navigate(`${ROUTES_PATH.FOLDER}?id=${course?.folder}`);
          }}
        ></Button>
        <Button
          icon={<EditOutlined />}
          style={{ marginRight: "0.5rem" }}
          onClick={onOpen}
        ></Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "Xác nhận xóa?",
              width: 500,
              centered: true,
              content: course?.name,
              okType: "danger",
              onOk: deleteSourse,

              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
        ></Button>
      </div>
      <MobileView>
        <h1>{titleHeader}</h1>
      </MobileView>

      <div className="wrapper-container-card">
        <SC.WrapperCarousel>
          <Carousel arrows infinite={false}>
            {course?.words?.map((word: any) => {
              return (
                <div>
                  <div
                    style={{
                      width: "100%",
                      background: "#364d79",
                      padding: isMobile ? "1.5rem" : "2rem",
                    }}
                  >
                    <VerticalCard wordDetail={word} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </SC.WrapperCarousel>
        <SC.WrapperItem>
          {[
            { text: "Thẻ ghi nhớ", image: icon_flashcard },

            { text: "Học tập", image: icon_learn },
            { text: "Kiểm tra", image: icon_test },
            { text: "Trò chơi", image: icon_game },
          ].map((_) => (
            <div>
              <Card
                hoverable
                style={{ width: 200 }}
                cover={
                  <img
                    alt=""
                    style={{
                      height: 70,
                      width: 70,
                      objectFit: "cover",
                      margin: "auto",
                      borderRadius: "1rem",
                    }}
                    src={_.image}
                  />
                }
              >
                <Meta title={_.text} />
              </Card>
            </div>
          ))}
        </SC.WrapperItem>
        <div className="wrapper-card">
          <List
            style={{ background: "#f0f0f0", padding: "1rem", width: "100%" }}
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 20,
            }}
            dataSource={course?.words}
            renderItem={(item) => <FlipCard wordDetail={item} />}
          />
        </div>
      </div>
    </SC.Wrapper>
  );
};
