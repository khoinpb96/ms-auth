function responseGenerator(code: number, message: string, data?: any) {
  return { code, message, data };
}

// const loginSuccessRespone = (token: string) => {
//   return { code: 200, message: "Login successfully", token };
// };

export { responseGenerator };
