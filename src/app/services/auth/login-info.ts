export class AuthLoginInfo {
    private username: string;
    private password: string;

    constructor(username: string, password: string) {
      this.username = username && username.trim();
      this.password = password && password.trim();
    }
}
