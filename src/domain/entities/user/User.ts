class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public resetToken?: string | null;
  public resetExpiredToken?: Date | null;

  constructor(
    name: string,
    email: string,
    password: string,
    id?: string,
    resetToken?: string | null,
    resetExpiredToken?: Date | null
  ) {
    this.name = name;
    this.email = email;
    this.password = password;

    if (id) this.id = id;
    if (resetToken !== undefined) this.resetToken = resetToken;
    if (resetExpiredToken !== undefined)
      this.resetExpiredToken = resetExpiredToken;
  }
}

export { User };
