const BaseController = require("./BaseController.js");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepo = require("../repos/UserRepo.js");
const { validateLoginUser } = require("../validators/AuthValidator.js");
const { jwtSecret } = require("../config/config.js");
const crypto = require("crypto");
const transporter = require("../utils/email.js");
const { constants } = require("../utils/constant.js");

//ibad: do not create custom response in controller, delete password from response

class AuthController extends BaseController {
  // constructor() {
  //   super();
  // }

  signToken = (userResponse) => {
    return jwt.sign({ data: userResponse }, jwtSecret, {
      expiresIn: constants.expiresIn,
    });
  };

  loginUser = async (req, res) => {
    const validationResult = validateLoginUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { email, password } = req.body;

    const customQuery = {
      where: { email },
      // attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["name"],
        },
        {
          model: db.Designation,
          as: "designation",
          attributes: ["name"],
        },
        // {
        //   model: db.User,
        //   as: "PrimaryReportees",
        //   attributes: ["firstName"], //, "lastName", "email"],
        // },
        // {
        //   model: db.User,
        //   as: "SecondaryReportees",
        //   attributes: ["firstName", "lastName", "email"],
        // },
      ],
    };

    const user = await UserRepo?.findByEmailWithInclude(customQuery);

    console.log("user", user);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid password", 404);
    }

    let token = this.signToken(JSON.stringify(user));

    const options = {
      maxAge: constants.maxAge,
      httpOnly: true,
    };

    res.cookie("jwt", token, options);

    return this.successResponse(res, { user, token }, "login Successful");
  };

  changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !newPassword || !oldPassword) {
      return this.validationErrorResponse(
        res,
        "Email, old password, and new password are required"
      );
    }

    if (oldPassword === newPassword) {
      return this.errorResponse(
        res,
        "New Password should not equal to old Password",
        404
      );
    }

    const customQuery = {
      where: { email },
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["name"],
        },
        {
          model: db.Designation,
          as: "designation",
          attributes: ["name"],
        },
        // {
        //   model: db.User,
        //   as: "PrimaryReportees",
        //   attributes: ["firstName", "lastName", "email"],
        // },
        // {
        //   model: db.User,
        //   as: "SecondaryReportees",
        //   attributes: ["firstName", "lastName", "email"],
        // },
      ],
    };

    const user = await UserRepo?.findByEmailWithInclude(customQuery);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user?.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid old password", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, constants.saltRounds);

    const updatedUser = await UserRepo?.updateUser(
      { password: hashedPassword },
      user?.id
    ); //ibad: use updateUser function

    user.isNewUser = false;

    const userObject = updatedUser.toJSON();

    delete userObject.password;
    delete userObject.resetPasswordToken;
    delete userObject.resetPasswordExpires;

    return this.successResponse(
      res,
      userObject,
      "Password changed successfully"
    );
  };

  forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return this.validationErrorResponse(res, "Email is required");
    }

    const user = await UserRepo?.findUserByEmail(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const resetToken = crypto.randomBytes(constants.hexCode).toString("hex");

    const encryptedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = encryptedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    const resetLink = `${constants.frontEndUrl}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password reset link",
      html: `
        <body
          style="
            padding: 0;
            margin: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          "
        >
          <div>
            <div
              style="
                display: flex;
                justify-content: center;
                background-color: rgb(241, 241, 241);
                padding-bottom: 1rem;
                padding-top: 1rem;
              "
            >
              <img src="../images/Solcoders-Logo.png" style="width: 10rem" />
            </div>
            <div style="padding-left: 2rem; padding-right: 2rem; padding-top: 1rem">
              <h1 style="font-size: 40px">Reset Passsword</h1>
              <p style="font-size: 18px">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, odio.
              </p>
              <p style="font-size: 18px">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In quisquam
                corporis accusantium provident, natus nesciunt? Nisi dicta, sit
                sapiente et cum harum commodi distinctio, voluptas earum consectetur
                dolorum voluptate voluptatem saepe dignissimos aliquam sint nobis
                iste, nam fuga obcaecati fugit.
              </p>
              <a href=${resetLink} style="font-size: 18px">${resetLink}</a>
              <p style="font-size: 18px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
                doloribus.
              </p>
            </div>
          </div>
        </body>
        `,
    };

    await transporter.sendMail(mailOptions);

    return this.successResponse(res, {}, "Resent link sent successful");
  };

  resetPasswordWithToken = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return this.validationErrorResponse(
        res,
        "Token and new password are required"
      );
    }

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await UserRepo?.findUserByResetToken(encryptedToken);

    if (!user || user?.resetPasswordExpires < Date.now()) {
      return this.errorResponse(res, "Token is invalid or has expired", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, constants.saltRounds);
    user.password = hashedPassword;

    const userObject = user.toJSON();

    delete userObject.resetPasswordToken;
    delete userObject.resetPasswordExpires;

    await user?.save();

    return this.successResponse(res, {}, "Password reset successfull");
  };

  logoutUser = async (req, res) => {
    res.clearCookie("jwt");
    return this.successResponse(res, {}, "Logout successful");
  };
}

module.exports = new AuthController();
