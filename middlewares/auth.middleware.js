const UserRepo = require("../repos/UserRepo.js");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.js");

const authorize = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      const customQuery = { id: decoded.id };

      const user = await UserRepo.findByIdWithInclude(customQuery);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // console.log("user", JSON.stringify(user));

      if (user.role.roleName === "admin") {
        return next();
      }

      if (user.role.roleName !== requiredRole) {
        const permissions = await UserRepo.getRolePermissions(user?.roleId);

        console.log(permissions);

        const hasPermission = permissions.some(
          (permission) => permission.route === req.originalUrl
        );

        if (!hasPermission) {
          return res.status(403).json({ message: "Forbidden" });
        }
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

module.exports = authorize;
