import Router, { response } from "express";

import { employeesService } from "../services";
import { EmployeeDto } from "../models";

const getAllEmployees = async (req, res) => {
  const employees = await employeesService.getAllEmployees();
  res.send(employees);
};

const createEmployee = async (req, res) => {
  const employee = new EmployeeDto(req.body);

  const result = await employeesService.addEmployee(employee);

  if (!result) {
    response.statusCode = 400;
  }

  return res.status(200).send(result);
};

const getEmployeeById = async (req, res) => {
  const employees = await employeesService.getEmployee(Number(req.params.id));

  if (!employees) {
    res.statusCode = 404;
  }

  res.send(employees);
};

const updateEmployeeById = async (req, res) => {
  const id = Number(req.params.id);
  const employee = new EmployeeDto(req.body);
  employee.id = id;

  const result = await employeesService.updateEmployee(employee);

  if (!result) {
    response.statusCode = 400;
  }

  return res.status(200).send(result);
};

const deleteEmployeeById = async (req, res) => {
  const id = Number(req.params.id);
  await employeesService.deleteEmployee(id)

  res.status(204).send(`Employee with id ${id} has been deleted`);
};

export const employeesRouter = Router();

employeesRouter.get("/", getAllEmployees);
employeesRouter.post("/", createEmployee);
employeesRouter.route("/:id")
    .get(getEmployeeById)
    .put(updateEmployeeById)
    .delete(deleteEmployeeById);
