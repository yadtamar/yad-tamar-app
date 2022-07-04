const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);

const register = (async (req, res) => {
  try {
    const { cell_phone, last_name, user_name } = req.body;
    if (!(cell_phone && last_name && user_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await pool.query(
      "SELECT * FROM users WHERE user_name=$1",
      [user_name]
    );
    if (oldUser.rows[0] !== undefined) {
      if (oldUser.rows[0].cell_phone == cell_phone){
        return res.status(409).send("User Already Exist. Please Login by your uniq message");
      } else {
        return res.status(409).send("this username is already in use. please try another one")
      }
    }

    //Encrypt user password
    
      let password = "";
      let possible = "0123456789";
    
      for (var i = 0; i < 6; i++)
        password += possible.charAt(Math.floor(Math.random() * possible.length));
     console.log(password)
    
    //console.log(password, "code : ")//, makeCode)
     encryptedPassword = await bcrypt.hash(last_name, 5);
    // console.log(encryptedPassword)
    // Create user in our database
    let user = await pool.query(
      "INSERT INTO users ( last_name, cell_phone, user_name, password) VALUES ($1,$2,$3,$4) RETURNING *",
      [last_name, cell_phone, user_name, password]
    );

    user = user.rows[0];
    data = { user };
    // Create token
    const token = jwt.sign(
      { user_id: user.user_id, cell_phone },
      process.env.TOKEN_KEY,
      {
        expiresIn: "3650d",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.json(data);
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
          "SELECT * FROM users WHERE cell_phone=$1",
          [decodedToken.payload.cell_phone]
        );
        console.log()
        res.locals.user = foundUser;
        res.locals.authenticated = !foundUser.anonymous;
        return next()
      } else {
        res.sendStatus(403)
      }
    } else {
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
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.decode(token, {
      complete: true
    });
    console.log(decodedToken.payload.user_id)
    let foundUser = await pool.query(
      "SELECT * FROM users WHERE users.user_id=$1",
      [decodedToken.payload.user_id]
    );
    let userRole;
    let role;
    if (userRole = await pool.query(
      "SELECT * FROM roles WHERE roles.user_id=$1",
      [decodedToken.payload.user_id]
    )) {
      if (userRole.rows[0] === undefined) {
        role = "coordunator";
        //console.log(userRole)
      } else {
        role = userRole.rows[0].role;
      }
    }
    foundUser = foundUser.rows[0];
    console.log(role)
    if (foundUser === undefined) {
      res.send("the user don't exist")
    } else {
      const data = {
        user_id: foundUser.user_id,
        name: foundUser.first_name || foundUser.last_name,
        role,
        phone: foundUser.cell_phone
      };
      console.log(data)
      res.json(data)
    }
  } catch (err) {
    res.send(err)
  }
});

module.exports = {
  login,
  register,
  getUserData,
  authorization
};