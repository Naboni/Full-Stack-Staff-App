import { Form, Input, Button, notification } from "antd";
import { editStaff, getStaffById } from "../utils/user-utils";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface IProp {
  name: string;
  email: string;
  age: number;
}

function Edit() {
  let navigate = useNavigate();
  let { userId } = useParams();
  const id = parseInt(userId!);
  const [err, setErr] = useState("");
  const [complete, setComplete] = useState(false);

  const [staff, setStaff] = useState<IProp | null>(null);
  useEffect(() => {
    getStaffById(id)
      .then((res) => res.json())
      .then((data) => {
        setStaff(data.user);
      })
      .catch((_) => {
        setErr("Something went wrong");
        notification.error({
          message: `Error`,
          description: err,
          placement: "top",
        });
      });
  }, [err, id]);

  const onFinish = (values: any) => {
    setComplete(true);
    const userInfo = {
      id: id,
      name: values.name,
      email: values.email,
      age: values.age,
    };
    editStaff(userInfo)
      .then((res) => res.json())
      .then(() => {
        notification.success({
          message: `Updated User`,
          description: "Successfully updated staff memebr",
          placement: "top",
        });
        setComplete(false);
      })
      .catch(() => {
        notification.success({
          message: `Updated User`,
          description: "Successfully updated staff member.",
          placement: "top",
        });
        setComplete(false);
        navigate("/");
      });
  };

  const age = staff?.age.toString();

  return (
    <div style={{ width: "700px" }}>
      <h1 className="text-left ml-8 text-2xl ">Edit Staff</h1>
      <hr className="mb-5" />
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 15 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Username" name="name">
          <Input placeholder={staff?.name} value={staff?.name} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input placeholder={staff?.email} value={staff?.email} />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <Input placeholder={age} value={age} />
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

export default Edit;
