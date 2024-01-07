
const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

module.exports = { sendResponse, sendError };
