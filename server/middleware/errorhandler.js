

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Something went wrong on the server";

  
  if (err.name === "ZodError" && Array.isArray(err.issues)) {
    status = 400;
    message = err.issues.map(issue => issue.message);
  }

  console.log( message[0]);

  return res.status(status).json(message[0]);
};

module.exports = errorHandler;
