interface ISwitch<T> {
  cases: boolean[];
  conditions: (() => T)[];
  add: (condition: boolean, callback: () => T) => void;
  isValid: () => boolean | undefined;
}

const errorHandler = (error: string): void => {
  throw new Error(error);
};

class Switch<T> implements ISwitch<T> {
  public cases: boolean[];
  public conditions: (() => T)[];
  constructor() {
    this.cases = [];
    this.conditions = [];
  }

  public add(condition: boolean, callback: () => T): void {
    this.cases.push(condition);
    if (condition === true) {
      this.conditions.push(callback);
    }
  }

  public isValid(): boolean | undefined {
    if (this.cases.length === 0) {
      errorHandler(`Array of cases is empty`);
    } else {
      for (let i: number = 0; i < this.cases.length; i++) {
        const element: boolean = this.cases[i];
        if (element === true) {
          this.cases.splice(i);
          this.conditions.forEach((value: () => T) => value());
          return false;
        }
        return true;
      }
    }
  }
}

export default Switch;
