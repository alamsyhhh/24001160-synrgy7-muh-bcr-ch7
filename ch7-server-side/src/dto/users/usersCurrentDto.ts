export class UserCurrentDto {
  public id: string;
  public email: string;
  public username: string;
  public role: string;

  constructor(id: string, email: string, username: string, role: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.role = role;
  }
}
