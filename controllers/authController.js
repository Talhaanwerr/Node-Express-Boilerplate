const BaseController = require("./BaseController.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepo = require("../repos/UserRepo.js");
const { validateLoginUser } = require("../validators/AuthValidator.js");
const { jwtSecret } = require("../config/config.js");
const nodemailer = require("nodemailer");

class AuthController extends BaseController {
  constructor() {
    super();
  }

  loginUser = async (req, res) => {
    const validationResult = validateLoginUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { email, password } = req?.body;

    const user = await UserRepo.findUserByEmail(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid password", 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "4h",
    });
    user.password = undefined;

    const userResponse = {
      id: user.id,
      email: user.email,
      isNewUser: user.isNewUser,
    };

    return this.successResponse(
      res,
      { userResponse, token },
      "Login successful"
    );
  };

  resetPassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req?.body;

    if (!email || !newPassword || !oldPassword) {
      return this.validationErrorResponse(
        res,
        "Email, old password, and new password are required"
      );
    }

    const user = await UserRepo.findUserByEmail(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid old password", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserRepo.updateUserPassword(user?.id, hashedPassword);
    user.isNewUser = false;
    user.password = undefined;

    const resetPasswordResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isNewUser: user.isNewUser,
    };

    return this.successResponse(
      res,
      resetPasswordResponse,
      "Password reset successful"
    );
  };

  forgetPassword = async (req, res) => {
    const { email } = req?.body;

    if (!email) {
      return this.validationErrorResponse(res, "Email is required");
    }

    const user = await UserRepo.findUserByEmail(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const resetToken = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    const resetLink = `${req?.protocol}://${req?.get(
      "host"
    )}/reset-password?token=${resetToken}`;

    const sendPasswordResetEmail = async (email, resetLink) => {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "ibad1657@gmail.com",
          pass: "Ibad@123",
        },
      });

      let mailOptions = {
        from: "ibad1657@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `You requested for a password reset. Click the link to reset your password: ${resetLink}`,
      };

      const transporterEmail = await transporter.sendMail(mailOptions);
      if (!transporterEmail) {
        throw new Error("Error sending password reset email");
      }
    };

    await sendPasswordResetEmail(user.email, resetLink);

    return this.successResponse(res, user, "Password reset successful");
  };

  verifyToken = async (req, res) => {
    const { token } = req?.query;

    if (!token) {
      return this.validationErrorResponse(res, "Token is required");
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return this.errorResponse(res, "Invalid token", 401);
      }

      return this.successResponse(res, decoded, "Token verified");
    });
  };
}

module.exports = new AuthController();
