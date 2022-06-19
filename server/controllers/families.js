const pool = require("./../db");
const { body, validationResult } = require('express-validator');

const createFamily = (async (req, res, next) => {
  try {
    const {
      last_name,
      cell_phone
    } = req.body;
    body(last_name, "the first name is not valid")
    body(cell_phone, "the cell phone number is not valid")

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const newuser = await pool.query(
        "INSERT INTO users (last_name, cell_phone) VALUES ($1,$2) RETURNING *",
        [
          last_name,
          cell_phone,
        ]
      );
      const newFamily = await pool.query(
        "INSERT INTO families (last_name) VALUES ($1) RETURNING *",
        [last_name]
      );
      //find the main person of the family
      const mainRole = await pool.query(
        "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
        [newuser.rows[0].user_id, newFamily.rows[0].family_id, "main"]
      );

      res.sendStatus(200);
    }
  } catch (err) {
    next(err.message);
  }
});

const getAllFamilies = (async (req, res, next) => {
  try {
    const families = await pool.query(
      "SELECT family_id FROM families");
    //for each family get a details
    const familiesDetails = families.rows;
    const idOfFamilies = familiesDetails.map(x => {
      let familyID = x; return (familyID.family_id)
    })
    if (idOfFamilies) {
      const foundFamily = await pool.query(
        "SELECT * FROM families INNER JOIN roles ON families.family_id = roles.family_id INNER JOIN users ON users.user_id = roles.user_id ORDER BY families.family_id"
      );
      let data = [];
      const familiesDtls = foundFamily.rows;
      if (familiesDtls[0]) {
        familiesDtls?.forEach(i => {
          let volunteersCount = 0;
          if (i.role === 'main') {
            familiesDtls.forEach(v => {
              if (i.family_id === v.family_id && v.role === 'helper') {
                ("volunteer of ", i.last_name, " family is: ", v.first_name)
                volunteersCount++;
              }
            })
            let details = {
              volunteersCount,
              name_of_family: i.last_name,
              family_id: i.family_id
            }
            data.push(details)
          }
        })
        res.json(data)
      } else {
        res.send("one or more of the details are wrong!")
      }
    }
  } catch (err) {
    next(err);
  }
});

const getCoordinatorsFamilies = (async (req, res, next) => {
  try {
    let coordinatorFamilies = await pool.query(
      "SELECT family_id FROM roles WHERE user_id=$1 AND role='coordinator'",
      [205]
    );
     coordinatorFamilies = coordinatorFamilies.rows
     let arrFam = coordinatorFamilies.map(i => {return i.family_id })
    const foundFamily = await pool.query(
      "SELECT * FROM families INNER JOIN roles ON families.family_id = roles.family_id INNER JOIN users ON users.user_id = roles.user_id WHERE families.family_id = ANY($1::int[]) ORDER BY families.family_id",
      [arrFam]
    );
    let data = [];
    const familiesDtls = foundFamily.rows;
    if (familiesDtls[0]) {
      familiesDtls?.forEach(i => {
        let volunteersCount = 0;
        if (i.role === 'main') {
          familiesDtls.forEach(v => {
            if (i.family_id === v.family_id && v.role === 'helper') {
              ("volunteer of ", i.last_name, " family is: ", v.first_name)
              volunteersCount++;
            }
          })
          let details = {
            volunteersCount,
            name_of_family: i.last_name,
            family_id: i.family_id
          }
          data.push(details)
        }
      })
      res.json(data)
      //} else {
      //res.send("one or more of the details are wrong!")
      //}
    }
  } catch (err) {
    next(err);
  }
});

const getSingleFamily = (async (req, res, next) => {
  try {
    const { family_id } = req.params;
    const foundFamily = await pool.query(
      "SELECT * FROM families INNER JOIN roles ON families.family_id = roles.family_id INNER JOIN users ON users.user_id = roles.user_id WHERE families.family_id = $1 ORDER BY families.family_id",
      [family_id]
    );
    let data;
    let volunteers = [];
    let mainPerson;
    const familiesDtls = foundFamily.rows;
    if (familiesDtls[0]) {
      familiesDtls.forEach(i => {
        if (i.role === 'main') {
          mainPerson = i
        } else if (i.role === 'helper') {
          volunteers.push(i);
        }
      });

      data = {
        name: mainPerson.last_name,
        phone: mainPerson.cell_phone,
        volunteers
      }
      res.json(data)
    } else {
      res.send("one or more of the details are wrong!")
    }
  } catch (err) {
    next(err);
  }
});

const updateFamily = (async (req, res, next) => {
  const { family_id } = req.params;
  try {
    const {
      last_name,
      cell_phone
    } = req.body;
    const updatedFamily = await pool.query(
      "UPDATE families SET last_name=$1 WHERE family_id=$2",
      [last_name, family_id]
    );
    if (updatedFamily.rows[0] !== undefined) {
      const foundUserId = await pool.query(
        "SELECT * FROM roles WHERE family_id=$1 AND role = 'main'",
        [family_id]
      );
      if (foundUserId.rows[0] !== undefined) {
        const user_id = foundUserId.rows[0].user_id;
        const updatedUser = await pool.query(
          "UPDATE users SET last_name=$1, cell_phone=$2, WHERE user_id=$3 RETURNING *",
          [
            last_name,
            cell_phone,
            user_id
          ]
        );
        res.sendStatus(200);
      }
    }
  } catch (err) {
    next(err);
  }
})

const deleteFamily = (async (req, res, next) => {
  try {
    const { family_id } = req.params;
    await pool.query("DELETE FROM families WHERE family_id=$1",
      [family_id]);
    res.send("deleted succsessfuly");
  } catch (err) {
    next(err);
  }
});

module.exports = {
  createFamily,
  getSingleFamily,
  getAllFamilies,
  getCoordinatorsFamilies,
  updateFamily,
  deleteFamily
}
