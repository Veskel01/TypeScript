interface ISwitch<T> {
  cases: boolean[];
  conditions: (() => T)[];
  add: (condition: boolean, callback: () => T) => void;
}

class Switch<T> implements ISwitch<T> {
  public cases: boolean[];
  public conditions: (() => T)[];
  constructor() {
    this.cases = [];
    this.conditions = [];
  }

  private removeItemFromArray(array: boolean[]) {
    for (let i: number = 0; i < array.length; i++) {
      return array.pop();
    }
  }

  add(condition: boolean, callback: () => T): void {
    this.cases.push(condition.valueOf());
    if (condition === true) {
      this.conditions.push(callback);
    }
  }

  isValid() {
    this.cases.every((value: boolean) => {
      this.removeItemFromArray(this.cases);
    });
    console.log(this.cases);
  }
}

export default Switch;
