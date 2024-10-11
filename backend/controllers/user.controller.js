export const test = (req, res) => {
  res.json({
    message: "Api working",
  });
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("Pengguna telah keluar sesi");
  } catch (error) {
    next(error);
  }
};
