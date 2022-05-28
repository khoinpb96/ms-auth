function responseGenerator(code: number, message: string) {
  return { code, message };
}

class DefaultResponse {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

class AuthSuccessResponse extends DefaultResponse {
  token: string;

  constructor(code: number, message: string, token: string) {
    super(code, message);
    this.token = token;
  }
}

export { responseGenerator, DefaultResponse, AuthSuccessResponse };
