import { useAppSelector } from "@/redux/hook";
import { userType } from "@/utils/types";
import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { $id, name, phone, email } = currentUser || {};

  const details = {
    name,
    phone,
    email,
  };
  const [profileForm] = Form.useForm();
  const [formValues, setFormValues] = useState<userType | any>({
    phone: "",
    email: "",
    name: "",
  });
  const [editedvalues, setEditedValues] = useState<userType | any>({
    phone: "",
    email: "",
    name: "",
  });
  useEffect(() => {
    setFormValues(details);
    // setEditedValues(businessDetails);
  }, [currentUser]);
  useEffect(() => {
    profileForm.setFieldsValue({
      ...details,
    });
  }, [profileForm, currentUser]);
  const [nonNullFieldValues, setNonNullFieldValues] = useState<any | object>(
    {}
  );

  useEffect(() => {
    const _formValues = { ...formValues } as any;
    const _editValues = { ...editedvalues } as any;
    const changedValues = Object.keys(formValues).filter(
      (key: any) => _formValues[key] !== _editValues[key]
    );
    const newValues = Object.fromEntries(
      changedValues.map((value: any) => [value, _editValues[value]])
    );
    setNonNullFieldValues(newValues);
  }, [editedvalues]);

  const definePayload = () => {
    const objData: any = {};
    if (nonNullFieldValues.name) {
      objData.name = nonNullFieldValues.name;
    }
    if (nonNullFieldValues.email) {
      objData.email = nonNullFieldValues.email;
    }
    if (nonNullFieldValues.phone) {
      objData.phone = nonNullFieldValues.phone;
    }
    return objData;
  };

  return (
    <div className='flex flex-col lg:w-[978px] w-full'>
      {" "}
      <header className='felx flex-col self-stretch gap-[20px] items-start'>
        <h2 className='text-lg font-medium text-gray-950 font-workSans'>
          Edit Profile
        </h2>
        <p className='text-sm font-normal text-gray-500 font-workSans'>
          Update your details here.
        </p>
      </header>
      <span className='border-b self-stretch border-gray-200 pt-5 lg:w-[70%]' />
      <Form
        layout='vertical'
        className='pt-6 lg:w-[70%] w-full'
        form={profileForm}>
        <Form.Item label='Name' name='name' className='custom-form'>
          <Input
            type={"text"}
            className='custom-input p-3'
            // placeholder='Enter your business name'
          />
        </Form.Item>
        <Form.Item label='Email' name='email' className='custom-form'>
          <Input
            type={"text"}
            className='custom-input p-3'
            // placeholder='Enter your business name'
          />
        </Form.Item>
        <Form.Item label='Phone' name='phone' className='custom-form'>
          <Input
            type={"text"}
            className='custom-input p-3'
            // placeholder='Enter your business name'
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserDetails;
