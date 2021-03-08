import User, { throwErrorOnInvalidPassword } from "./User";

const errorHandler = (error: string): void => {
  throw new Error(error);
};
type AccessLevelTypes = "user" | "admin";

const throwErrorOnInvalidAccessLevel = (newAccessLevel: AccessLevelTypes): void | boolean => {
  const accessLevels: AccessLevelTypes[] = ["admin", "user"];
  if (!accessLevels.includes(newAccessLevel)) {
    errorHandler("Invalid access level");
  }
};

interface IApp {
  users: User[];
  createNewAdmin: (
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string
  ) => User;
  createNewUser: (firstName: string, surname: string, birthDate: string, password: string, gender: string, email: string) => User;
  changeUserAccessLevel: (admin: User, user: User, newAccessLevel: AccessLevelTypes) => void;
  changeUserPassword: (admin: User, user: User, newPassword: string) => void;
}

class App implements IApp {
  users: User[];
  constructor() {
    this.users = [];
  }

  createNewAdmin(firstName: string, surname: string, birthDate: string, password: string, gender: string, email: string): User {
    const newAdmin: User = new User(firstName, surname, birthDate, password, gender, email);
    newAdmin.accessLevel = "admin";
    this.users.push(newAdmin);
    return newAdmin;
  }

  createNewUser(firstName: string, surname: string, birthDate: string, password: string, gender: string, email: string): User {
    const newUser = new User(firstName, surname, birthDate, password, gender, email);
    this.users.push(newUser);
    return newUser;
  }

  changeUserAccessLevel(admin: User, userToChange: User, newAccessLevel: AccessLevelTypes): void {
    if (admin.accessLevel === "admin" && this.users.includes(userToChange)) {
      if (userToChange.accessLevel === "admin") {
        errorHandler("You cannot change the access level for another admin");
      } else if (!throwErrorOnInvalidAccessLevel(newAccessLevel)) {
        userToChange.accessLevel = newAccessLevel;
      }
    } else {
      errorHandler("Access Denied!");
    }
  }

  changeUserPassword(admin: User, userToChange: User, newPassword: string): void {
    throwErrorOnInvalidPassword(newPassword);
    if (admin.accessLevel === "admin" && this.users.includes(admin)) {
      if (userToChange.accessLevel === "admin") {
        errorHandler("You cannot change the password of another admin");
      } else {
        userToChange.password = newPassword;
      }
    } else {
      errorHandler("Access denied!");
    }
  }
}

export default App;
