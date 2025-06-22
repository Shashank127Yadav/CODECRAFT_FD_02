import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import EmployeeForm from "./EmployeeForm";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE}/employees`, {
      headers: { "x-auth-token": token },
    });
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE}/employees/${id}`, {
      headers: { "x-auth-token": token },
    });
    fetchEmployees();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <EmployeeForm
        refresh={fetchEmployees}
        editData={editEmp}
        setEditEmp={setEditEmp}
      />
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.position}
            <button onClick={() => setEditEmp(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
