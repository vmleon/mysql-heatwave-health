require('dotenv').config();

module.exports = function (req, res, next) {
  const {TOKEN} = process.env;
  try {
    const authorization = req.headers.authorization;
    if (TOKEN !== authorization) {
      throw new Error('Invalid token');
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid token!'),
    });
  }
};
