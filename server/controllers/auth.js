const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
const register = (async (req, res, next) => {
    try {
        const { email, password, role, family_id } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await pool.query(
            "SELECT * FROM users WHERE mail=$1",
            [email]
        );
          if (oldUser.rows[0] !== undefined) {
            console.log(oldUser.rows)
            return res.status(409).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          let user = await pool.query(
            "INSERT INTO users ( mail, password) VALUES ($1,$2) RETURNING *",
            [email, password]
          );
          const userRole = await pool.query(
            "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
            [user.rows[0].user_id, family_id, role]
          );
          data= {user , userRole};
          console.log(user)
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
          res.status(201).json(data);
        } catch (err) {
          console.log(err);
        }
      });
      

      
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