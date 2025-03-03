class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;
  
    constructor(statusCode: number, message: string, isOperational = true, stack?: string) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      // Automatically capture the stack trace unless provided
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default ApiError;
  