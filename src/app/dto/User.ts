export class User {
  /** Contains full name of current user */
  public fullName: string;
  /** Contains email addres of current user */
  public email: string;
  /** Contains phone number of current user */
  public phone: string;
  /** Contains position of current user */
  public position: string;
  /** Contains department of current user */
  public department: string;

  constructor(fullName: string, email: string, phone: string, position: string, department: string) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.department = department;
  }

}
