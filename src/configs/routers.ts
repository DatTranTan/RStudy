import { ROUTES_PATH, ROUTES_TYPES } from "../constants/routers";
import { GroupLayout } from "../layouts/GroupLayout";
import { PageLayout } from "../layouts/PageLayout";
import { Course } from "../pages/Course";
import { Folder } from "../pages/Folder";
import SignIn from "../pages/SignIn";
import { Word } from "../pages/Word";

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
      {
        key: 3,
        path: ROUTES_PATH.COURSE,
        element: Course,
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
