import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { color } from "./constants/theme";
import Routes from "./routers";
import { ContextProvider } from "./context/context";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <ConfigProvider
            locale={vi_VN}
            theme={{
              token: {
                colorPrimary: color.default,
                // borderRadius: borderRadius.normal,
              },
            }}
          >
            <Routes />
          </ConfigProvider>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
