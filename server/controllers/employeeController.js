const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  const { name, email, position, salary } = req.body;
  console.log("name, email, position, salar", name, email, position, salary);
  try {
    const newEmployee = new Employee({ name, email, position, salary });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteEmployee = async (req, res) => {
  console.log("req.params.id", req.params.id);
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: "Employee removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
