import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EmployeeForm = ({ refresh, editData, setEditEmp }) => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: 0,
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "salary" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "x-auth-token": token } };

    if (editData) {
      await axios.put(
        `${process.env.REACT_APP_API_BASE}/employees/${editData._id}`,
        form,
        config
      );
      setEditEmp(null);
    } else {
      await axios.post(
        `${process.env.REACT_APP_API_BASE}/employees`,
        form,
        config
      );
    }

    setForm({ name: "", email: "", position: "", salary: 0 });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
      />
      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
      />
      <button type="submit">{editData ? "Update" : "Add"} Employee</button>
    </form>
  );
};

export default EmployeeForm;
