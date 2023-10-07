import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logUserIn } from "@/redux/slices/authSlice";
import { loginType } from "@/utils/types";

type Props = {
  handleFormStepChange: (step: "register") => void;
  onClose: any;
};
const Login = ({ handleFormStepChange, onClose }: Props) => {
  const [loginForm] = Form.useForm();
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (values: any) => {
    const _values = values as loginType;
    try {
      await dispatch(logUserIn(_values));
      onClose();
      loginForm.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      layout='vertical'
      className='custom-form'
      form={loginForm}
      onFinish={handleLogin}>
      <Row gutter={18}>
        <Col span={24}>
          <Form.Item label='Email' name='email'>
            <Input type='email' className='custom-input' />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='Password' name='password' className='custom-pass'>
            <Input.Password type='password' />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button
            disabled={isLoading}
            loading={isLoading}
            htmlType='submit'
            // @ts-ignore
            type='   '
            className='w-full flex items-center justify-center bg-primary h-11 text-white text-lg font-medium font-pop'>
            {isLoading ? "Logging in..." : " Login"}
          </Button>
        </Col>
        {/* <span className='mx-auto text-xl'>or</span> */}
        {/* <Col span={24}>
          <Button
            disabled={isGoogleLoading}
            onClick={handleGoogle}
            type='primary'
            className='w-full  flex items-center bg-blue-500 justify-center h-11 text-white text-lg font-medium font-pop'>
            {isGoogleLoading ? "Signing in ..." : "Sign in with google"}
          </Button>
        </Col> */}

        <span
          onClick={() => handleFormStepChange("register")}
          className='flex justify-center gap-[4px] text-dark-200 mx-auto mt-5 text-base'>
          Don't have an account?
          <a className='hover:text-primary text-dark-100'>Sign Up</a>
        </span>
      </Row>
    </Form>
  );
};

export default Login;
