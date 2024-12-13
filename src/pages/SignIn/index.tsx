import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, notification } from "antd";
import * as Styled from "./styled";
import { SignInType } from "../../types";
import Cookies from "js-cookie";
import Api from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants/routers";

const SignIn = () => {
  const navigate = useNavigate();

  if (Cookies.get("accessToken")) {
    return <Navigate to={ROUTES_PATH.DASHBOARD} replace />;
  }

  const onFinish: FormProps<SignInType>["onFinish"] = async (values) => {
    try {
      const res = await Api.signIn({
        email: values.email,
        password: values.password,
      });
      if (res.status === 0) {
        Cookies.set("accessToken", res.data.accessToken);
        notification.success({
          message: "THÀNH CÔNG",
          description: (res as any).message,
        });
        navigate(ROUTES_PATH.DASHBOARD);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<SignInType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Styled.Wrapper>
      <Card className="card-wrapper">
        <div style={{ textAlign: "center", color: "#fff" }}>
          <h2>WELCOME TO</h2>
          <h1>R STUDY</h1>
        </div>
        <Form
          name="basic"
          style={{ maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<SignInType>
            label="Tên đăng nhập"
            name="email"
            rules={[{ required: true, message: "Nhập tên đăng nhập" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<SignInType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item<SignInType> name="remember" valuePropName="checked">
            <Checkbox style={{ color: "#fff" }}>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Styled.Wrapper>
  );
};

export default SignIn;
