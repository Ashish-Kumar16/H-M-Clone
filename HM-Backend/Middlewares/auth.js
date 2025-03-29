const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    // Check Authorization header first
    let accessToken = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!accessToken) {
      // Fallback to cookies
      accessToken = req.cookies.ACCESS_TOKEN;
    }

    const refreshToken = req.cookies.REFRESH_TOKEN;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "No access token provided. Please login.",
      });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "No refresh token provided. Please login again.",
        });
      }

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET_KEY,
        );
        const newAccessToken = jwt.sign(
          { userID: decodedRefresh.userID, user: decodedRefresh.user },
          process.env.ACCESS_SECRET_KEY,
          { expiresIn: "24h" },
        );
        const newRefreshToken = jwt.sign(
          { userID: decodedRefresh.userID, user: decodedRefresh.user },
          process.env.REFRESH_SECRET_KEY,
          { expiresIn: "7d" },
        );

        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
          maxAge: 3600 * 1000, // 1 hour
        };
        const refreshCookieOptions = {
          ...cookieOptions,
          maxAge: 7 * 24 * 3600 * 1000, // 7 days
        };

        res.cookie("ACCESS_TOKEN", newAccessToken, cookieOptions);
        res.cookie("REFRESH_TOKEN", newRefreshToken, refreshCookieOptions);
        req.user = decodedRefresh;
        next();
      } catch (refreshErr) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token. Please login again.",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
