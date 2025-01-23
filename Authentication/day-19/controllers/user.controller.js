import { loginUser, registerUser } from "../services/user.service.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await registerUser(username, password);
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error signing up",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    // save user_id in session
    req.session.userId = user._id;
    res.status(200).json({
      success: true,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error loging up",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  // try {
  //     if (req.session) {
  //         req.session.destroy((err) => {
  //             if (err) {
  //                 return res.status(500).json({
  //                     success: false,
  //                     message: "Error logging out",
  //                     error: err.message,
  //                 });
  //             }
  //             res.clearCookie("connect.sid");
  //             return res.status(200).json({
  //                 success: true,
  //                 message: "Logout successful",
  //             });
  //         });
  //     } else {
  //         return res.status(400).json({
  //             success: false,
  //             message: "No active session to log out",
  //         });
  //     }
  // } catch (error) {
  //     res.status(500).json({
  //         success: false,
  //         message: "Unexpected error during logout",
  //         error: error.message,
  //     });
  // }
};
