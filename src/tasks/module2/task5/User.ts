import is from "is_js";

// errorHandler

const errorHandler = (error: string): void => {
  throw new Error(error);
};

type TypesForIfInEmailPasswordOrName = void | boolean;

const throwErrorOnInvalidName = (name: string): void => {
  if (is.empty(name)) {
    errorHandler("First name cannot be empty");
  }
};

export const throwErrorOnInvalidPassword = (password: string): boolean => {
  const regExpForPassword: RegExp = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/;
  if (!password.match(regExpForPassword)) {
    errorHandler("Invalid password");
  }
  return true;
};

type GenderTypes = "male" | "female" | string;

const throwErrorOnInvalidGender = (gender: GenderTypes): void => {
  const genders: GenderTypes[] = ["male", "female"];
  if (!genders.includes(gender)) {
    errorHandler("Allowed genders: male,female");
  }
};

const throwErrorOnInvalidEmail = (email: string): TypesForIfInEmailPasswordOrName => {
  if (is.not.email(email)) {
    errorHandler("Invalid email");
  }
};

const throwErrorOnInvalidBirthDate = (birthDate: string): void => {
  if (Object.prototype.toString.call(new Date(birthDate)) !== "[object Date]" || Number.isNaN(new Date(birthDate).getTime())) {
    errorHandler("Invalid Date");
  } else if (is.future(new Date(birthDate))) {
    errorHandler("You can't be from the future");
  } else if (new Date(birthDate).getFullYear() <= 1880) {
    errorHandler("You can't be that old");
  }
};

interface IUser {
  firstName: string;
  surname: string;
  birthDate: string;
  password: string;
  gender: string;
  email: string;
  accessLevel: string;
  changePassword: (newPassword: string) => string;
  changeEmailAddress: (newEmail: string) => string;
}

class User implements IUser {
  firstName: string;
  surname: string;
  birthDate: string;
  password: string;
  gender: string;
  email: string;
  accessLevel: string;
  constructor(firstName: string, surname: string, birthDate: string, password: string, gender: string, email: string) {
    throwErrorOnInvalidName(firstName);
    this.firstName = firstName;
    throwErrorOnInvalidName(surname);
    this.surname = surname;
    throwErrorOnInvalidBirthDate(birthDate);
    this.birthDate = birthDate;
    throwErrorOnInvalidPassword(password);
    this.password = password;
    throwErrorOnInvalidGender(gender);
    this.gender = gender;
    throwErrorOnInvalidEmail(email);
    this.email = email;
    this.accessLevel = "user";
  }

  changePassword(newPassword: string): string {
    throwErrorOnInvalidPassword(newPassword);
    this.password = newPassword;
    return newPassword;
  }

  changeEmailAddress(newEmail: string): string {
    throwErrorOnInvalidEmail(newEmail);
    this.email = newEmail;
    return newEmail;
  }
}

export default User;
