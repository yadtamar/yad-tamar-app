const pool = require("./../db");
const { body, check, validationError, validationResult } = require('express-validator');

const createFamily = (async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      home_phone,
      cell_phone,
      mail,
      adress,
      city,
      age,
      gender,
      family_status,
      kids_num,
      language,
      sickness,
      health_maintenance_organization,
      hospital,
      medical_insurance,
      medical_history
    } = req.body;
    body(first_name, "the first name is not valid")
    body(last_name, "email is not valid")
    body(home_phone, "email is not valid")
    body(cell_phone, "email is not valid")
    body(adress, "email is not valid").isEmail();
    body(city, "email is not valid")
    body(age, "email is not valid")
    body(gender, "email is not valid")
    body(family_status, "email is not valid")
    body(kids_num, "email is not valid")
    body(sickness, "email is not valid")
    body(language, "email is not valid")
    body(health_maintenance_organization, "email is not valid")
    body(hospital, "email is not valid")
    body(medical_history, "email is not valid")
    body(medical_insurance, "email is not valid")
    //res.send(this.msg)
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const newuser = await pool.query(
        "INSERT INTO users (first_name, last_name, home_phone, cell_phone, mail, adress, city, age, gender, family_status, kids_num, language) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
        [
          first_name,
          last_name,
          home_phone,
          cell_phone,
          mail,
          adress,
          city,
          age,
          gender,
          family_status,
          kids_num,
          language
        ]
      );
      const newFamily = await pool.query(
        "INSERT INTO families (sickness, hospital, medical_history, health_maintenance_organization ) VALUES ($1,$2,$3,$4) RETURNING *",
        [sickness, hospital, medical_history, health_maintenance_organization]
      );
      //find the main person of the family
      const mainRole = await pool.query(
        "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
        [newuser.rows[0].user_id, newFamily.rows[0].family_id, "main"]
      );
      //insert medical insurances
      const insurances = await pool.query(
        "INSERT INTO insurance (user_id, insurance_name) VALUES ($1,$2) RETURNING *",
        [newuser.rows[0].user_id, medical_insurance]
      );
      //insert names of hospitals (and health_maintenance_organizations)
      const hospi = await pool.query(
        "SELECT hospital_name FROM hospitals WHERE hospitals.hospital_id = $1",
        [newFamily.rows[0].hospital]
      );
      const myhealth_maintenance_organization = await pool.query(
        "SELECT health_maintenance_organization_name FROM health_maintenance_organization WHERE health_maintenance_organization.id = $1",
        [newFamily.rows[0].health_maintenance_organization]
      );
      const data = {
        family: newFamily.rows,
        user: newuser.rows,
        role: mainRole.rows,
        hospital: hospi.rows,
        insurance: insurances.rows,
        health_maintenance_organization: myhealth_maintenance_organization.rows
      }
      res.json(data);
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
        mainPerson,
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
      first_name,
      last_name,
      home_phone,
      cell_phone,
      mail,
      adress,
      city,
      age,
      gender,
      family_status,
      kids_num,
      language,
      sickness,
      health_maintenance_organization,
      hospital,
      medical_insurance,
      medical_history,
    } = req.body;
    const updatedFamily = await pool.query(
      "UPDATE families SET sickness=$1, hospital=$2,medical_history=$3, health_maintenance_organization=$4 WHERE family_id=$5 RETURNING *",
      [sickness, hospital, medical_history, health_maintenance_organization, family_id]
    ); 
    if (updatedFamily.rows[0] !== undefined) {
      const foundUserId = await pool.query(
        "SELECT * FROM roles WHERE family_id=$1 AND role = 'main'",
        [family_id]
      );
      if (foundUserId.rows[0] !== undefined) {
        const user_id = foundUserId.rows[0].user_id;
        const updatedUser = await pool.query(
          "UPDATE users SET first_name=$1, last_name=$2 ,home_phone=$3,cell_phone=$4,mail=$5,adress=$6,city=$7, age=$8, gender=$9, family_status=$10,  kids_num=$11,language=$12 WHERE user_id=$13 RETURNING *",
          [
            first_name,
            last_name,
            home_phone,
            cell_phone,
            mail,
            adress,
            city,
            age,
            gender,
            family_status,
            kids_num,
            language,
            user_id
          ]
        );
        const Role = await pool.query(
          "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
          [updatedUser.rows[0].user_id, updatedFamily.rows[0].fumily_id, "main"]
        );

        //update medical insurances
        const insurances = await pool.query(
          "UPDATE insurance SET user_id=$1, insurance_name=$2 RETURNING *",
          [updatedFamily.rows[0].user_id, medical_insurance]
        );

        res.send("Updated");
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
  updateFamily,
  deleteFamily
}
