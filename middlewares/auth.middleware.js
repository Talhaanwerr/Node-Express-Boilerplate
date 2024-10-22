const UserRepo = require("../repos/UserRepo.js");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.js");

const authorize = (requiredRole) => {
  return async (req, res, next) => {
    const token =
      req?.headers?.authorization?.split(" ")[1] || req?.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      const customQuery = { id: decoded?.id };
      console.log("decoded : ", decoded);

      const user = await UserRepo.findByIdWithInclude(customQuery);
      requiredRole = user?.role?.roleName;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (user?.role?.roleName === "admin") {
        return next();
      }

      if (user?.role?.roleName === requiredRole) {
        const permissions = await UserRepo.getRolePermissions(user?.roleId);

        const hasPermission = permissions.map((permission) => {
          return permission?.Permission?.name;
        });
        const originalUrl = req?.originalUrl?.split("/")[3];

        if (!hasPermission.includes(originalUrl)) {
          return res.status(403).json({ message: "Forbidden" });
        }

        return next();
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

const authMiddleware = (req, res, next) => {
  const token = req?.cookies?.jwt || req?.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { authorize, authMiddleware };