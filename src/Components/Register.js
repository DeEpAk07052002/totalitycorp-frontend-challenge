import { React, useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginPage.css";
import { adduser } from "../redux/slice/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  // const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state);
  const onFinish = async (values) => {
    // e.preventDefult();
    console.log("Received values of form: ", values);
    console.log("Received values of form: ", values);
    let email = values["email"];
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      message.error("Invalid email");
      return;
    }
    dispatch(adduser(values));
    // if(state.register.data)
  };
  useEffect(() => {
    if (state.register.data) {
      if (state.register.data?.status?.includes("success")) {
        localStorage.setItem("access_token", state.register.data.token);
        localStorage.setItem("user_id", state.register.data.user.id);
        localStorage.setItem("username", state.register.data.user.username);

        message.success("Account created successfully");
        navigate("/home", { replace: true });
      } else if (!state.register.data?.status?.includes("success")) {
        message.error(state.error);
      }
    }
  }, [state]);

  return (
    <Spin spinning={state.register.isLoading}>
      <div className="login-page">
        <Card className="login-card" title="Register  ">
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
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
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
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already Register? Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};

export default RegisterPage;
