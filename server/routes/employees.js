const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/", auth, createEmployee);
router.get("/", auth, getEmployees);
router.put("/:id", auth, updateEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
