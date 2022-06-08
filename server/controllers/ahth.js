const pool = require("../db");
//create a new task
const register = (async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await pool.query(
            "SELECT * FROM users WHERE mail=$1",
            [email]
        );
          if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
      
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
      
          // return new user
          res.status(201).json(user);
        } catch (err) {
          console.log(err);
        }
        // Our register logic ends here
      });
      
      // ...
      
const login = (async (req, res, next) => {
    try {
        const {
            email, password
        } = req.body;

    } catch (err) {

    }
})

module.exports = {
    login,
    register
};