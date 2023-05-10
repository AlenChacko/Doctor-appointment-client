import React from "react";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";

const Register = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Now login to your account");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Register</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Make a password" type="password" />
          </Form.Item>
          <Button className="primary-button mt-2" htmlType="submit">
            Register
          </Button>
          <Link to="/login" className="link">
            Click to Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
