import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { regType } from "@/utils/types";
import { registerUser } from "@/redux/slices/authSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  handleFormStepChange: (step: "login") => void;
  onClose: any;
};

const Register = ({ handleFormStepChange, onClose }: Props) => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [registerForm] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleSignUp = async (value: any) => {
    const _values = value as regType;
    try {
      await dispatch(registerUser(_values));
      onClose();
      registerForm.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      layout='vertical'
      form={registerForm}
      className='custom-form'
      onFinish={handleSignUp}>
      <Row gutter={18}>
        <Col xs={24} md={12}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: "Please input your name" }]}>
            <Input type='text' className='custom-input' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: "Please input your email" }]}>
            <Input type='email' className='custom-input' />
          </Form.Item>
        </Col>
        {/* 
        <Col span={24}>
          <Form.Item name='phone' label='Phone Number' className='custom-phone'>
            <PhoneInput
              country={"ng"}
              inputClass='phone-input'
              countryCodeEditable={false}
              autoFormat={false}
            />
          </Form.Item>
        </Col> */}
        <Col xs={24} md={12}>
          <Form.Item
            label='Password'
            name='password'
            className='custom-pass'
            rules={[{ required: true, message: "Please input password" }]}>
            <Input.Password type='password' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label='Confirm Password'
            name='confirm_password'
            className='custom-pass'
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }: any) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}>
            <Input.Password
              type={"password"}
              className='custom-input p-3'
              placeholder='Enter your password'
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button
            // @ts-ignore
            type='   '
            htmlType='submit'
            disabled={isLoading}
            loading={isLoading}
            className='w-full flex items-center justify-center bg-primary h-11 text-white text-lg font-medium font-pop'>
            {isLoading ? "Creating..." : "Create an Account"}
          </Button>
        </Col>

        <span
          onClick={() => handleFormStepChange("login")}
          className='flex justify-center gap-[4px] text-dark-200 mx-auto mt-5 text-base'>
          Already have an account?
          <a className='hover:text-primary text-dark-100'>Login</a>
        </span>
      </Row>
    </Form>
  );
};

export default Register;
