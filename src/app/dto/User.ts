export class User {
  public fullName: string;
  public email: string;
  public phone: string;
  public position: string;
  public department: string;

  constructor(fullName: string, email: string, phone: string, position: string, department: string) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.department = department;
  }
}
