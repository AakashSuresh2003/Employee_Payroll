const checkAdminRole = (req, res, next) => {
  const user = req.user;

  if (user.role !== "admin") {
    return res
      .status(401)
      .json("Unauthorized User (Only Admin can access this route)");
  }

  next(); 
};

const checkAdminAndHrRole = (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin" && user.role !== "hr")
    return res
      .status(401)
      .json("Unauthorized User (Only Admin and HR can access this route)");
  next();
};

const checkAccountantRole = (req, res, next) => {
  const user = req.user;
  if (user.role !== "accountant")
    return res
      .status(401)
      .json("Unauthorized User (Only Accountant can access this route)");
  next();
}

module.exports = { checkAdminRole, checkAdminAndHrRole , checkAccountantRole};
