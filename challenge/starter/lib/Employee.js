// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    if (typeof name !== "string" || !name.trim().length) {
      throw new Error("Parameter name to be a non-empty string");
    }
    if (typeof id !== "number" || isNaN(id) || id < 0) {
      throw new Error("Parameter id to be a non-negative number");
    }
    if (typeof email !== "string" || !email.trim().length) {
      throw new Error("Parameter email to be a non-empty string");
    }
    this.name = name;
    this.id = id;
    this.email = email;
  }
}
