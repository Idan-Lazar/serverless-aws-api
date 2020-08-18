import React from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import "./LoginModal.scss";
const LoginModal = (props) => {
  const { authStore, visloginModal, setVisLoginModal } = props;
  console.log(visloginModal)
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    console.log("Received values of form: ", authStore);
    await authStore.signIn(values.email,values.password,values.remember).then(()=>{
        setVisLoginModal(false)
    })
  };
  return (
    <Modal
      title="כניסה למערכת"
      visible={visloginModal}
      footer={null}
      onCancel={() => setVisLoginModal(false)}
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
            placeholder="מייל.."
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
            placeholder="סיסמה.."
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
            התחבר
          </Button>
          או <a href="">הרשם</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default inject("authStore")(observer(LoginModal));
