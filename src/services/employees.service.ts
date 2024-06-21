import { EmployeeDto } from "../models";
import { databaseService } from "./database.service";

class EmployeesService {
  async getAllEmployees(): Promise<EmployeeDto[]> {
    return await databaseService.query<EmployeeDto>(`SELECT * FROM employees ORDER BY id ASC`);
  }

  async getEmployee(id: number): Promise<EmployeeDto | null> {
    const result = await databaseService.query<EmployeeDto>(`SELECT * FROM employees WHERE id = ${id}`);

    if (result.length) {
      return result[0];
    }

    return null;
  }

  async addEmployee(employee: EmployeeDto): Promise<EmployeeDto | null> {
    const result = await databaseService.query<EmployeeDto>(`INSERT INTO employees (firstname, lastname) VALUES ('${employee.firstName}', '${employee.lastName}')`);

    if (result.length) {
      return result[0];
    }

    return null;
  }

  async updateEmployee(employee: EmployeeDto): Promise<EmployeeDto | null> {
    const result = await databaseService.query<EmployeeDto>(`UPDATE employees SET firstname = '${employee.firstName}', lastname = '${employee.lastName}' WHERE id = ${employee.id}`);

    if (result.length) {
      return result[0];
    }

    return null;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const result = await databaseService.query<EmployeeDto>(`DELETE FROM employees WHERE id = ${id}`);

    return !result.length;
  }
}

export const employeesService: EmployeesService = new EmployeesService();
