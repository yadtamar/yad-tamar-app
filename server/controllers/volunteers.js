const pool = require("./../db");

const createVoluteer = (async (req, res) => {
    try {
        const {
            family_id, name, phone
        } = req.body;

        const newVolunteer = await pool.query(
            "INSERT INTO users ( first_name, cell_phone) VALUES ($1,$2) RETURNING *",
            [name, phone]
        );

        const VolunteerRole = await pool.query(
            "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
            [newVolunteer.rows[0].user_id, family_id, "helper"]
        );
        res.json({ user: newVolunteer.rows, role: VolunteerRole.rows[0], community: VolunteerRole.rows[0].family_id });
    } catch (err) {
        console.error(err.message);
    }
});

const getUsers = (async (req, res) => {
    try {
        const families = await pool.query("SELECT * FROM users");
        res.json(families.rows);
    } catch (err) {
        console.error(err);
    }
});

const getFamilyVolunteers = (async (req, res) => {
    try {
        const { family_id } = req.params;
        const foundUserId = await pool.query(
            "SELECT * FROM roles WHERE family_id=$1 AND role ='helper'",
            [family_id]
        );
        if (foundUserId.rows[0]) {
            let familyVolus = [];
            for (let i = 0; i < foundUserId.rows.length; i++) {
                const userId = foundUserId.rows[i].user_id;
                if(userId){
                    let foundVolunteer = await pool.query(
                    "SELECT * FROM users WHERE user_id=$1 ",
                    [userId]
                    );
                    familyVolus.push(foundVolunteer.rows);
                    foundVolunteer =+ foundVolunteer;
                }
            }
            res.json(familyVolus);
        } else { res.send("sorry, but that family don't have volunteers") }
    } catch (err) {
        console.error(err);
    }
});

const updateVoluteer = (async (req, res) => {
    try {
        const { user_id } = req.params;
        const {
            first_name,
            cell_phone
        } = req.body;
        await pool.query(
            "UPDATE users SET first_name = $1, cell_phone=$2 WHERE user_id = $3",
            [
                first_name,
                cell_phone,
                user_id
            ]
        );
        res.send("Updated");
    } catch (err) {
        console.error(err);
    }
});

const deleteVolunteer = (async (req, res) => {
    try {
        const { user_id } = req.params;
        await pool.query("DELETE FROM users WHERE user_id=$1", [user_id]);
        res.send("deleted succsessfuly");
      } catch (err) {
        console.error(err);
      }
});

const getUser = (async (req, res) => {
    try {
        const { user_id } = req.params;
        const foundUser = await pool.query(
          "SELECT * FROM users WHERE user_id=$1",
          [user_id]
        );
        res.json(foundUser.rows);
      } catch (err) {
        console.error(err);
      }
});

module.exports = {
    createVoluteer,
    getFamilyVolunteers,
    getUsers,
    getUser,
    updateVoluteer,
    deleteVolunteer
}