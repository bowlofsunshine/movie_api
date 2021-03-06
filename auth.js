// This has to be the same key used in the JWTStrategy
var jwtSecret = "your_jwt_secret";
var jwt = require("jsonwebtoken");
const passport = require("passport");
// Your local passport file
require("./passport");

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    // This is the username you’re encoding in the JWT
    subject: user.Username,
    // This specifies that the token will expire in 7 days
    expiresIn: "7d",
    // This is the algorithm used to “sign” or encode the values of the JWT
    algorithm: "HS256"
  });
}

//POST Login

module.exports = router => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
