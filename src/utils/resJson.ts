const resJson = {
  success: <T>(message: string, data: T[] | T) => {
    return {
      message,
      data,
    };
  },
  fail: (message: string, error?: Error) => {
    return {
      message,
      error: error && error.message,
    };
  },
};

export default resJson;
