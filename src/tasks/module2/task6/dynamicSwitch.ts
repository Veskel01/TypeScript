interface ISwitch {
  cases: caseTuple[];
  add: (condition: boolean, onErrorCallback: () => void) => void;
  isValid: () => boolean | undefined;
}

const errorHandler = (error: string): void => {
  throw new Error(error);
};

// single case = [boolean, fn]

// type tuple = [boolean, function]

// condition = boolean
// onErrorCallback = function

// //.add ( [true/false, errorFn] )

type caseTuple = [boolean, () => void];

class Switch implements ISwitch {
  cases: caseTuple[];
  constructor() {
    this.cases = [];
  }

  public add(condition: boolean, onErrorCallback: () => void): void {
    const caseTuple: caseTuple = [condition, onErrorCallback];
    this.cases.push(caseTuple);
  }

  public isValid(): boolean | undefined {
    if (this.cases.length === 0) {
      errorHandler(`Array of cases is empty`);
    } else {
      for (let i: number = 0; i < this.cases.length; i++) {
        const caseCondition: boolean = this.cases[i][0];
        const caseCallback: () => void = this.cases[i][1];
        if (caseCondition == true) {
          caseCallback();
          this.cases.splice(i);
          return false;
        }
        return true;
      }
    }
  }
}

export default Switch;
