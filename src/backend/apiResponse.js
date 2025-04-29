export function success(data = {}, status = 200) {
    return {
      status,
      success: true,
      data,
      error: null,
    };
  }
  
  export function failure(error = 'Internal error', status = 500) {
    return {
      status,
      success: false,
      data: null,
      error,
    };
  }
  