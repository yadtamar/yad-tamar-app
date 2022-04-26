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
      hmo,
      hospital,
      medical_insurance,
      medical_history,
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
      [sickness, hospital, medical_history, hmo]
    );
    console.log(newFamily.rows[0].family_id, newuser.rows[0].user_id)

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
      "SELECT name FROM hospitals WHERE hospitals.hospital_id = $1 OR hospitals.hospital_id = $2",
      [newFamily.rows[0].hospital, newFamily.rows[0].hmo]
    );
    const data = {
      family: newFamily.rows,
      user: newuser.rows,
      role: mainRole.rows,
      hospital: hospi.rows,
      insurance: insurances.rows
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

const getAllFamilies = (async (req, res) => {
    try {
        //console.log("the families!!");
        const data = []
        const families = await pool.query(
          "SELECT * FROM families");
        //for each family get a details
        for (var i = 0; i < families.rows.length; i++) {
          const family_id = families.rows[i].family_id;
          console.log(families.rows[i].family_id);
          if(family_id){
            const foundFamily = await pool.query(
              "SELECT * FROM families WHERE family_id=$1",
              [family_id]
            );
            //console.log(foundFamily.rows);
            const volunteers = await pool.query(
              "SELECT * FROM roles WHERE family_id=$1 AND role ='helper'",
              [family_id]
            );
            //console.log(volunteers.rows);
            const mainId = await pool.query(
              "SELECT user_id FROM roles WHERE family_id=$1 AND role ='main'",
              [family_id]
            );
            if (volunteers.rows) {
             // console.log(volunteers.rows , volunteers.rows.length )  
              var mainDetails = {};
              if(mainId.rows[0]){
                //console.log("main: ", mainId.rows[0].a);
                mainDetails = await pool.query(
                "SELECT * FROM users WHERE user_id=$1 ",
                [mainId.rows[0].user_id]
              );
            }else{
              mainDetails = [{rows:"we don't have any details..."}];
            }
              data.push({
                volunteers_count:volunteers.rows.length,
                volunteers: volunteers.rows, 
                main_user: mainDetails?.rows, 
                family: foundFamily.rows
              })
          }
        
        } else {
          console.log("its failed!!")
        }
      }
        res.json(data);
      } catch (err) {
        console.error(err);
      }
});

const getSingleFamily = (async (req, res) => {
    try {
        const {family_id}= req.params;
        const foundFamily = await pool.query(
          "SELECT * FROM families WHERE family_id=$1",
          [family_id]
        );
        var volunteers = await pool.query(
          "SELECT * FROM roles WHERE family_id=$1 AND role ='helper'",
          [family_id]
        );
        var main = await pool.query(
          "SELECT * FROM roles WHERE family_id=$1 AND role ='main'",
          [family_id]
        );
        if (main.rows[0] ) {
          console.log(volunteers.rows + volunteers.rows.length )
          
          const mainId = main.rows[0].user_id;
          console.log("main :", mainId);
          const mainDetails = await pool.query(
            "SELECT * FROM users WHERE user_id=$1 ",
            [mainId]
          );
          var data = [];
          var maino;
          var familyVolunteers;
          var familydetails;
          var volunteers_num;
          volunteers.rows[0] !== undefined ? familyVolunteers = volunteers.rows:"";
          volunteers.rows[0] !== undefined ? volunteers_num = volunteers.rows.length:"";
          mainDetails.rows[0] !== undefined ? maino = mainDetails.rows:"";
          foundFamily.rows[0] !== undefined ? familydetails = foundFamily.rows:"";
          res.json({
            volunteers_count:volunteers_num,
            volunteers: familyVolunteers, 
            user: maino, 
            family: familydetails
          });
          
        }
      } catch (err) {
        console.error(err);
      }
});

const updateFamily = (async (req, res) => {
    const { family_id } = req.params;
    console.log(family_id)
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
          console.log(foundUserId.rows);
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
  
          console.log(updatedUser.rows[0])
  
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
            [updatedFamily.rows[0].hospital , updatedFamily.rows[0].hmo]
          );
          res.send("Updated");
        }
      } else { console.log("oiiivey!!!!") }
  
  
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