import { Form, Input, Button, notification } from "antd";
import { createStaff } from "../utils/user-utils";
import { useRef, useState } from "react";

function Create() {
  const [err, setErr] = useState("");
  const isMounted = useRef(false);
  const [complete, setComplete] = useState(false);

  const onFinish = (values: any) => {
    setComplete(true);
    const userInfo = {
      name: values.name,
      email: values.email,
      age: values.age,
    };
    createStaff(userInfo)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notification.success({
            message: `Created User`,
            description: "Successfully created staff memebr",
            placement: "top",
          });
          setComplete(false);
        }
      })
      .catch((_) => {
        setErr("Something went wrong");
        notification.error({
          message: `Error`,
          description: err,
          placement: "top",
        });
        setComplete(false);
      })
      .finally(() => {
        if (isMounted.current) {
          // ? preserve memory leak
          // ? state is updated only if mounted
          setComplete(false);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ width: "700px" }}>
      <h1 className="text-left ml-8 text-2xl ">Create Staff</h1>
      <hr className="mb-5" />
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 20 }}>
          <Button type="primary" htmlType="submit" loading={complete}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Create;
