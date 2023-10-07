import React, { useState } from "react";
import Login from "@/components/Authentication/Login";
import Register from "@/components/Authentication/Register";
import { Modal } from "antd";
type Props = { isModalOpen: boolean; onClose: any };
const Authentication = ({ onClose, isModalOpen }: Props) => {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const handleFormStepChange = (step: "login" | "register") => {
    switch (step) {
      case "login":
        setCurrentFormStep(0);
        break;
      case "register":
        setCurrentFormStep(1);
        break;
    }
  };

  const step = [
    <Login
      key={0}
      handleFormStepChange={handleFormStepChange}
      onClose={onClose}
    />,
    <Register
      key={1}
      handleFormStepChange={handleFormStepChange}
      onClose={onClose}
    />,
  ];
  return (
    <Modal
      className="custom-modal"
      open={isModalOpen}
      onCancel={onClose}
      footer={false}
      closable={false}
      style={{
        top: 20,
      }}
      width={600}
      title={
        <>
          <h1> {currentFormStep === 0 && "Welcome Back"}</h1>
          <h1> {currentFormStep === 1 && "Sign Up"}</h1>
          <p> {currentFormStep === 0 && "Login with your email & password"}</p>
          <p> {currentFormStep === 1 && "Create an account with email"}</p>
        </>
      }
    >
      {step[currentFormStep]}
    </Modal>
  );
};

export default Authentication;
