import React from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import "./LoginModal.scss";
const RegistarModal = (props) => {
  const { authStore, visRegistarModal, setVisRegistarModal } = props;
  const onFinish = async (values) => {
    await authStore.signUp(values.email,values.password,values.remember).then(()=>{
        setVisRegistarModal(false)
    })
  };
  return (
    <Modal
      title="הרשמה למערכת"
      visible={visRegistarModal}
      footer={null}
      onCancel={() => setVisRegistarModal(false)}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "אנא הכנס מייל",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="אימייל"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "אנא הכנס סיסמה",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="סיסמא"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>זכור אותי</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            שכחתי סיסמה
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            הרשם
          </Button>
          או <a href="">התחבר</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default inject("authStore")(observer(RegistarModal));
