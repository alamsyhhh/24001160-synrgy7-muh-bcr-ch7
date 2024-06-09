export class UserDto {
  public username: string;
  public role: string;

  constructor(username: string, role: string) {
    this.username = username;
    this.role = role;
  }
}
