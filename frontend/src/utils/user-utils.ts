const getStaff = async () => {
  const response = await fetch(`http://localhost:9000/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

interface IProps {
  name: string;
  email: string;
  age: number;
}
const createStaff = async ({ name, email, age }: IProps) => {
  const response = await fetch(`http://localhost:9000/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      age,
    }),
  });
  return response;
};

interface IProps2 {
  id: number;
  name: string;
  email: string;
  age: number;
}
const editStaff = async ({ id, name, email, age }: IProps2) => {
  const response = await fetch(`http://localhost:9000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      age,
    }),
  });
  return response;
};
const getStaffById = async (id: number) => {
  const response = await fetch(`http://localhost:9000/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
const deleteStaffById = async (id: number) => {
  const response = await fetch(`http://localhost:9000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { getStaff, createStaff, editStaff, getStaffById, deleteStaffById };
