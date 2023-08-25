export enum STATUSCODES {
  OK = 200,
  CREATE = 201,
  BAD = 404,
}

interface iErr {
  errorName: string;
  errorMessage: string;
  errorStatus: STATUSCODES;
  errorSuccess: boolean;
}

export class notifierError extends Error {
  public readonly errorName: string;
  public readonly errorMessage: string;
  public readonly errorStatus: STATUSCODES;
  public readonly errorSuccess: boolean = false;

  constructor(arggs: iErr) {
    super(arggs.errorMessage);

    Object.setPrototypeOf(this, new.target.prototype);
    this.errorName = arggs.errorName;
    this.errorMessage = arggs.errorMessage;
    this.errorStatus = arggs.errorStatus;

    if (this.errorSuccess !== undefined) {
      this.errorSuccess = arggs.errorSuccess;
    }

    Error.captureStackTrace(this);
  }
}
