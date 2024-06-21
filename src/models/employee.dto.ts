export class EmployeeDto {
  id: number | null = null;
  firstName: string = '';
  lastName: string = '';

  constructor(init?: Partial<EmployeeDto>) {
    Object.assign(this, init);
  }
}
