const pool = require("./../db");

const createFamily = (async (req, res) => {
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
      HMO,
      hospital,
      medical_insurance,
      medical_history
    } = req.body;
    const newuser = await pool.query(
      "INSERT INTO users (first_name, last_name, phone, cell_phone, mail, address, city, age, gender, family_status, kids_num, language) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
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
      "INSERT INTO families (sickness, hospital, medical_history, hmo ) VALUES ($1,$2,$3,$4) RETURNING *",
      [sickness, hospital, medical_history, HMO]
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
    //insert names of hospitals (and hmos)
    const hospi = await pool.query(
      "SELECT hospital_name FROM hospitals WHERE hospitals.hospital_id = $1",
      [newFamily.rows[0].hospital]
    );
    const myHmo = await pool.query(
      "SELECT hmo_name FROM hmo WHERE hmo.id = $1",
      [newFamily.rows[0].hmo]
    );
    const data = {
      family: newFamily.rows,
      user: newuser.rows,
      role: mainRole.rows,
      hospital: hospi.rows,
      insurance: insurances.rows,
      hmo: myHmo.rows
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

const getAllFamilies = (async (req, res) => {
  try {
    const data = []
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
        for (let i = 0; i < familiesDtls.length; i++) {
          let volunteersCount = 0;
          if (familiesDtls[i].role === 'main') {
            for (let v = 0; v < familiesDtls.length; v++) {
              if (familiesDtls[i].family_id === familiesDtls[v].family_id && familiesDtls[v].role === 'helper') {
                ("volunteer of ", familiesDtls[i].last_name, " family is: ", familiesDtls[v].first_name)
                volunteersCount++;
              }
            }
            let details = {
              volunteersCount,
              name_of_family: familiesDtls[i].last_name,
              family_id: familiesDtls[i].family_id
            }
            data.push(details)
          }
        }
      }
      res.json(data)
    } else {
      console.log("its failed!!")
    }
  } catch (err) {
    console.error(err);
  }
});

const getSingleFamily = (async (req, res) => {
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
      for (let i = 0; i < familiesDtls.length; i++) {
        if (familiesDtls[i].role === 'main') {
          mainPerson = familiesDtls[i]
        } else if (familiesDtls[i].role === 'helper') {
          volunteers.push(familiesDtls[i]);
        }
      }
      data = {
        mainPerson,
        volunteers
      }
      res.json(data)
    } else {
      console.log("its failed!!")
    }
  } catch (err) {
    console.error(err);
  }
});

const updateFamily = (async (req, res) => {
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
      hmo,
      hospital,
      medical_insurance,
      medical_history,
    } = req.body;
    const updatedFamily = await pool.query(
      "UPDATE families SET sickness=$1, hospital=$2,medical_history=$3, hmo=$4 WHERE family_id=$5 RETURNING *",
      [sickness, hospital, medical_history, hmo, family_id]
    );
    if (updatedFamily.rows[0] !== undefined) {
      const foundUserId = await pool.query(
        "SELECT * FROM roles WHERE family_id=$1 AND role = 'main'",
        [family_id]
      );
      if (foundUserId.rows[0] !== undefined) {
        const user_id = foundUserId.rows[0].user_id;
        const updatedUser = await pool.query(
          "UPDATE users SET first_name=$1, last_name=$2 ,phone=$3,cell_phone=$4,mail=$5,address=$6,city=$7, age=$8, gender=$9, family_status=$10,  kids_num=$11,language=$12 WHERE user_id=$13 RETURNING *",
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
        //update names of hospitals (and hmos)
        const hospi = await pool.query(
          "SELECT name FROM hospitals WHERE hospital_id = $1 OR hospital_id = $2",
          [updatedFamily.rows[0].hospital, updatedFamily.rows[0].hmo]
        );
        res.send("Updated");
      }
    } else { console.log("can not update!") }


  } catch (err) {
    console.error(err);
  }
})

const deleteFamily = (async (req, res) => {
  try {
    const { family_id } = req.params;
    await pool.query("DELETE FROM families WHERE family_id=$1",
      [family_id]);
    res.send("deleted succsessfuly");
  } catch (err) {
    console.error(err);
  }
});

module.exports = {
  createFamily,
  getSingleFamily,
  getAllFamilies,
  updateFamily,
  deleteFamily
}
