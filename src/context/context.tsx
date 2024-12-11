import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { CollectionsType } from "../types";

const Context = createContext<GlobalContext | null>(null);

Context.displayName = "Context";

type GlobalContext = {
  controller: GlobalState;
  dispatch: Dispatch<ActionType>;
};

type GlobalState = {
  collections: CollectionsType[];
  collapsedSider: boolean;
  searchText: string;
  documentId: string;
};

type ActionType = {
  type: string;
  value: any;
};

function reducer(state: GlobalState, action: ActionType) {
  switch (action.type) {
    case "COLLECTIONS": {
      return { ...state, collections: action.value };
    }
    case "COLLAPSED_SIDER": {
      return { ...state, collapsedSider: action.value };
    }
    case "SEARCH_TEXT": {
      return { ...state, searchText: action.value };
    }
    case "DOCUMENT_ID": {
      return { ...state, documentId: action.value };
    }
    default: {
      throw new Error(`${action.type}`);
    }
  }
}

function ContextProvider({ children }: { children: ReactNode }) {
  const initialState: GlobalState = {
    collections: [],
    collapsedSider: false,
    searchText: "",
    documentId: "dashboard",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      controller,
      dispatch,
    }),
    [controller, dispatch]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useContextController() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return context;
}

const setCollections = (
  dispatch: ({
    type,
    value,
  }: {
    type: string;
    value: CollectionsType[];
  }) => void,
  value: CollectionsType[]
) => dispatch({ type: "COLLECTIONS", value });
const setCollapsedSider = (
  dispatch: ({ type, value }: { type: string; value: boolean }) => void,
  value: boolean
) => dispatch({ type: "COLLAPSED_SIDER", value });
const setSearchText = (
  dispatch: ({ type, value }: { type: string; value: string }) => void,
  value: string
) => dispatch({ type: "SEARCH_TEXT", value });
const setDocumentId = (
  dispatch: ({ type, value }: { type: string; value: string }) => void,
  value: string
) => dispatch({ type: "DOCUMENT_ID", value });

export {
  ContextProvider,
  useContextController,
  setCollections,
  setCollapsedSider,
  setSearchText,
  setDocumentId,
};
