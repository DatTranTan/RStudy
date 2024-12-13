import { ROUTES_PATH, ROUTES_TYPES } from "../constants/routers";
import { PageLayout } from "../layouts/PageLayout";
import { GroupLayout } from "../layouts/GroupLayout";
import SignIn from "../pages/SignIn";
import { ContentPage } from "../pages/ContentPage";
import { Course } from "../pages/Course";
import { DocumentMenu } from "../pages/DocumentMenu";
import { Word } from "../pages/Word";
import { Folder } from "../pages/Folder";

export const RoutesConfig = [
  {
    type: ROUTES_TYPES.PAGE,
    layout: PageLayout,
    path: ROUTES_PATH.SIGN_IN,
    element: SignIn,
    isPrivate: false,
  },

  {
    type: ROUTES_TYPES.GROUP,
    layout: GroupLayout,
    routes: [
      // {
      //   key: 1,
      //   path: ROUTES_PATH.DASHBOARD,
      //   element: Dashboard,
      //   isPrivate: true,
      // },
      {
        key: 2,
        path: ROUTES_PATH.CONTENT,
        element: ContentPage,
        isPrivate: true,
      },
      {
        key: 3,
        path: ROUTES_PATH.COURSE,
        element: Course,
        isPrivate: true,
      },
      {
        key: 4,
        path: ROUTES_PATH.DOCUMENT,
        element: DocumentMenu,
        isPrivate: true,
      },
      {
        key: 5,
        path: ROUTES_PATH.WORD,
        element: Word,
        isPrivate: true,
      },
      {
        key: 6,
        path: ROUTES_PATH.FOLDER,
        element: Folder,
        isPrivate: true,
      },
      {
        key: 7,
        path: ROUTES_PATH.FOLDER_DETAIL,
        element: Folder,
        isPrivate: true,
      },
    ],
  },
];
