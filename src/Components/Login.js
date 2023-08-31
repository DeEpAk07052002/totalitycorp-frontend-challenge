import { React, useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Spin, Skeleton } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { checkuser } from "../redux/slice/login2";
import { useDispatch, useSelector } from "react-redux";
// const history = useNavigate ();
const LoginPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const state = useSelector((state) => state);
  const [click, setClick] = useState(false);
  console.log("state", state, state.login.isLoading);

  const dispatch = useDispatch();
  // const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    let email = values["email"];
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      message.error("Invalid email");
      return;
    }
    dispatch(checkuser(values));
    setClick(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (
      state.login.isLoading === false &&
      state.login.data &&
      state.login.data.status.includes("success") &&
      click === true
    ) {
      localStorage.setItem("access_token", state.login.data.token);
      localStorage.setItem("user_id", state.login.data.user._id);
      localStorage.setItem("username", state.login.data.user.username);
      setClick(false);
      navigate("/home", { replace: true });
      console.log("succeed", state.login.data.status);
    } else if (
      state.login.isLoading === false &&
      state.login.data &&
      !state.login.data.status.includes("success") &&
      click === true
    ) {
      message.error(state.login.data.status);
      setClick(false);
    }
  }, [state]);

  return (
    // <Skeleton paragraph={{ rows: 40 }} active loading={state.login.isLoading}>
    <div className="login-page">
      <Card className="login-card" title="Login">
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Does not having account ?Signup
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    // </Skeleton>
  );
};

export default LoginPage;
