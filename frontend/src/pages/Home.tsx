import { Table, Space, Button, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//backe-utils
import { deleteStaffById, getStaff } from "../utils/user-utils";

//redux
import { useDispatch } from "react-redux";
import { staffs } from "../redux/userSlice";

const { Column } = Table;

function Home() {
  let navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getStaff()
      .then((res) => res.json())
      .then((data) => {
        setStaff(data);
        dispatch(
          staffs({
            user: data,
          })
        );
      })
      .catch((_) => {
        setErr("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (record: any, e: any) => {
    deleteStaffById(record.id)
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      })
      .catch((_) => {
        setErr("Something went wrong");
        notification.success({
          message: `Success`,
          description: "Deleted user",
          placement: "top",
        });
      });
  };

  const handleEdit = (record: any, e: any) => {
    navigate("/edit/" + record.id);
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <h1 className="text-left ml-8 text-2xl ">All Staff</h1>
          <hr className="mb-5" />
          <Table dataSource={staff}>
            <Column title=" Name" dataIndex="name" key="firstName" />

            <Column title="Age" dataIndex="age" key="age" />

            <Column title="Email" dataIndex="email" key="email" />

            <Column
              title="Action"
              key="action"
              render={(text, record: any) => (
                <Space size="middle">
                  {/* <a>Invite {record.lastName}</a>
              <a>Delete</a> */}
                  <Button type="primary" onClick={(e) => handleEdit(record, e)}>
                    Edit
                  </Button>
                  <Button danger onClick={(e) => handleDelete(record, e)}>
                    Delete
                  </Button>
                </Space>
              )}
            />
          </Table>
        </>
      )}
    </div>
  );
}

export default Home;
