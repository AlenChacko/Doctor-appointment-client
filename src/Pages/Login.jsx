import React from "react";
import { Form } from "antd";
import { Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Login</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Make a password" type="password" />
          </Form.Item>

          <Button className="primary-button mt-2" htmlType="submit">
            Login
          </Button>
          <Link to="/register" className="link">
            Click to Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
