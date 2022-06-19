const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);

const register = (async (req, res) => {
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
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    let user = await pool.query(
      "INSERT INTO users ( mail, password) VALUES ($1,$2) RETURNING *",
      [email, password]
    );
    let userRole = await pool.query(
      "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
      [user.rows[0].user_id, family_id, role]
    );
    user = user.rows[0];
    userRole = userRole.rows[0];
    data = { user, userRole };
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
    res.status(201).json(200);
  } catch (err) {
    res.send(err);
  }
});

const authorization = (async (req, res, next) => {
  const token = req.headers.authorization
  try {
    if (token !== undefined) {
      const decodedToken = jwt.decode(token, {
        complete: true
      });
      if (decodedToken !== null) {
        let foundUser = await pool.query(
          "SELECT * FROM users WHERE users.mail=$1",
          [decodedToken.payload.email]
        );
        return next()
      } else {
        res.sendStatus(403)
      }
    }else {
      res.sendStatus(403)
    }
  } catch (err) {
    return next(err)
  }

})

const login = (async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await pool.query(
      "SELECT * FROM users WHERE mail=$1",
      [email]
    );
    if (user.rows[0] && (password === user.rows[0].password)) {
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
        
      // user
      res.status(200)?.json(token);
    } else {
      res.status(400)?.send("Invalid Credentials");
    }
  } catch (err) {
    res.send(err);
  }
});

const getUserData = (async (req, res) => {
  try{
  const token = req.headers.authorization

  const decodedToken = jwt.decode(token, {
    complete: true
  });
  let foundUser = await pool.query(
    "SELECT * FROM users INNER JOIN roles ON users.mail=$1 AND roles.user_id = users.user_id",
    [decodedToken.payload.email]
  );
  foundUser = foundUser.rows[0]
  const data = {
    user_id: foundUser.user_id,
    role: foundUser.role
  };
  res.json(data)
  } catch(err){
    res.send(err)
  }
});

module.exports = {
  login,
  register,
  getUserData,
  authorization
};