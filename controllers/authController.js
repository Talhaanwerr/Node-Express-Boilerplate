const BaseController = require("./BaseController.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepo = require("../repos/UserRepo.js");
const { validateLoginUser } = require("../validators/AuthValidator.js");
const { jwtSecret } = require("../config/config.js");
const crypto = require("crypto");
const transporter = require("../utils/email.js");

class AuthController extends BaseController {
  constructor() {
    super();
  }

  signToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, jwtSecret, {
      expiresIn: "4h",
    });
  };

  createSendResponse = (user, statusCode, res, msg) => {
    let token = this.signToken(user?.id, user?.email, user.role?.roleName);
    const options = {
      maxAge: 1000 * 60 * 60 * 4,
      httpOnly: true,
    };
    res.cookie("jwt", token, options);
    user.password = undefined;

    const userResponse = {
      id: user.id,
      email: user.email,
      isNewUser: user.isNewUser,
      roleName: user?.role?.roleName,
      designationName: user?.designation?.designation_name,
    };

    return this.successResponse(res, { userResponse, token }, msg);
  };

  loginUser = async (req, res) => {
    const validationResult = validateLoginUser(req?.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { email, password } = req?.body;

    const user = await UserRepo?.findByEmailWithInclude(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid password", 404);
    }

    this.createSendResponse(user, 200, res, "login Successful");
  };

  changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req?.body;

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

    const user = await UserRepo?.findByEmailWithInclude(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user?.password);

    if (!passwordMatch) {
      return this.errorResponse(res, "Invalid old password", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserRepo?.updateUserPassword(user?.id, hashedPassword);
    user.isNewUser = false;
    user.password = undefined;

    const resetPasswordResponse = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      isNewUser: user?.isNewUser,
      roleName: user?.role?.roleName,
      designationName: user?.designation?.designation_name,
    };

    return this.successResponse(
      res,
      resetPasswordResponse,
      "Password changed successfully"
    );
  };

  forgetPassword = async (req, res) => {
    const { email } = req?.body;

    if (!email) {
      return this.validationErrorResponse(res, "Email is required");
    }

    const user = await UserRepo?.findUserByEmail(email);

    if (!user) {
      return this.errorResponse(res, "User not found", 404);
    }

    const resetToken = crypto.randomBytes(32).toString("hex"); // encoded token

    const encryptedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex"); // encrypted token

    user.resetPasswordToken = encryptedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    const resetLink = `localhost:5173/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: "ibad1657@gmail.com",
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

    const userResponse = {
      id: user?.id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };

    return this.successResponse(
      res,
      userResponse,
      "Resent link sent successful"
    );
  };

  resetPasswordWithToken = async (req, res) => {
    const { token } = req?.query;
    const { newPassword } = req?.body;

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

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user?.save();
    this.createSendResponse(user, 200, res, "Password reset successful");
  };

  // verifyToken = async (req, res) => {
  //   const { token } = req?.query;

  //   if (!token) {
  //     return this.validationErrorResponse(res, "Token is required");
  //   }

  //   const encryptedToken = crypto
  //     .createHash("sha256")
  //     .update(token)
  //     .digest("hex");

  //   const user = await UserRepo.findUserByResetToken(encryptedToken);

  //   if (!user || user.resetPasswordExpires < Date.now()) {
  //     return this.errorResponse(res, "Token is invalid or has expired", 400);
  //   }

  //   return this.successResponse(res, {}, "Token is valid");
  // };

  logoutUser = async (req, res) => {

    res.clearCookie("jwt");
    return this.successResponse(res, {}, "Logout successful");
  };

  // googleAuthentication = async (req, res) => {
  //   const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  //   const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  //   const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

  //   router.get("/auth/google", (req, res) => {
  //     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  //     res.redirect(url);
  //   });

  //   router.get("/auth/google/callback", async (req, res) => {
  //     const { code } = req.query;

  //     try {
  //       const { data } = await axios.post(
  //         "https://oauth2.googleapis.com/token",
  //         {
  //           client_id: CLIENT_ID,
  //           client_secret: CLIENT_SECRET,
  //           code,
  //           redirect_uri: REDIRECT_URI,
  //           grant_type: "authorization_code",
  //         }
  //       );

  //       const { access_token, id_token } = data;

  //       const { data: profile } = await axios.get(
  //         "https://www.googleapis.com/oauth2/v1/userinfo",
  //         {
  //           headers: { Authorization: `Bearer ${access_token}` },
  //         }
  //       );

  //       res.redirect("/");
  //     } catch (error) {
  //       console.error("Error:", error.response.data.error);
  //       res.redirect("/login");
  //     }
  //   });

  //   // Logout route
  //   router.get("/logout", (req, res) => {
  //     // Code to handle user logout
  //     res.redirect("/login");
  //   });
  // };
}

module.exports = new AuthController();
