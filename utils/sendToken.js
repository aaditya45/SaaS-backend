const sendToken = (user, statusCode, res) => {
  const access_token = user.createJWT();
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
  };
  const { password, ...data } = user.toObject();
  res
    .status(statusCode)
    .cookie("access_token", access_token, options)
    .json({
      status: true,
      content: {
        data: data,
        meta: {
          access_token: access_token,
        },
      },
    });
};

module.exports = sendToken;
