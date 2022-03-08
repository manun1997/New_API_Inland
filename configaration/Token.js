const jwt = require("jsonwebtoken");
const _conf = require("../configaration/sessions");

module.exports.generateToken = (data, callback) => {
  data = data == undefined ? "" : data;

  jwt.sign(
    {
      exp: Math.floor(Date.now() / 100) + 60 * _conf.token_expiresIn.expiresIn,
      data: data,
    },
    _conf.secretKey,

    function (err, token) {
      if (err) return callback(err, token);
      else return callback(err, token);
    }
  );
};
