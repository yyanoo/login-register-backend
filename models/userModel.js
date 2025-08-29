export class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
  getInfo() {
    return {
      username: this.username,
      email: this.email,
    };
  }
}

export class UserWithPassword extends User {
  constructor(username, email, password) {
    super(username, email);
    this.password = password;
  }
}

export let users = [];
