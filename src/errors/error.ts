class BaseError extends Error {
  public code: number;
  public data: any;
  constructor(message: string, code: number, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
  }
}

export { BaseError };
