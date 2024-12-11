import { ROUTES_PATH, ROUTES_TYPES } from "../constants/routers";
import { Dashboard } from "../pages/Dashboard";
import { PageLayout } from "../layouts/PageLayout";
import { GroupLayout } from "../layouts/GroupLayout";
import SignIn from "../pages/SignIn";
import { ContentPage } from "../pages/ContentPage";
import { Music } from "../pages/Music";
import { DocumentMenu } from "../pages/DocumentMenu";
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
        key: 1,
        path: ROUTES_PATH.DASHBOARD,
        element: Dashboard,
        isPrivate: true,
      },
      {
        key: 2,
        path: ROUTES_PATH.CONTENT,
        element: ContentPage,
        isPrivate: true,
      },
      {
        key: 3,
        path: ROUTES_PATH.MUSIC,
        element: Music,
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
    ],
  },
];
