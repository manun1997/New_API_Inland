const jwt = require("jsonwebtoken");
const _conf = require("../configaration/sessions");

//Token Generation
module.exports.generateToken = (data, callback) => {
  data = data == undefined ? "" : data;

  jwt.sign(
    {
      exp: Math.floor(Date.now() / 100) + 60 * _conf.token_expiresIn.expiresIn,
      // exp: Math.floor(Date.now() / 1000) + 60 * 5,     // api exp in 5 mints
      data: data,
    },
    _conf.secretKey,
    function (err, token) {
      console.log(token);
      if (err) return callback(err, token);
      else return callback(err, token);
    }
  );
};

// Token authentication checking postman
module.exports.checkToken = (req, res, next) => {
  var token = req.headers["x-access-token"] || req.headers["authorization"];
  console.log(token);
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, _conf.secretKey, (err, decoded) => {
      if (err) {
        return res.json({
          statuscode: "203",
          status: "false",
          msg: "Token is not Valid",
          error: err,
        });
      } else {
        jwt.sign(
          {
            exp:
              Math.floor(Date.now() / 1000) +
              60 * _conf.token_expiresIn.expiresIn,
            data: decoded.data,
          },
          _conf.secretKey,
          function (err, token) {
            req.decoded = decoded;
            next(decoded.data, token);
          }
        );
      }
    });
  } else {
    return res.json({
      statuscode: "203",
      status: false,
      msg: "Auth token is not supplied",
    });
  }
};
