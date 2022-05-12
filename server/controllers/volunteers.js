const pool = require("./../db");

const createVoluteer = (async (req, res, next) => {
    try {
        const {
            family_id, name, phone
        } = req.body;

        const newVolunteer = await pool.query(
            "INSERT INTO users ( first_name, cell_phone) VALUES ($1,$2) RETURNING *",
            [name, phone]
        );
        const uniqVolunteerCode = "http://localhost:3000/tasks/" + family_id + "/"+ newVolunteer.rows[0].user_id;

        const setUniqCode = await pool.query(
            "INSERT INTO users (uniq_code) VALUES ($1) RETURNING *",
            [uniqVolunteerCode]
        )
        const VolunteerRole = await pool.query(
            "INSERT INTO roles (user_id, family_id, role) VALUES ($1,$2,$3) RETURNING *",
            [newVolunteer.rows[0].user_id, family_id, "helper"]
        );
        res.json({ 
            user: newVolunteer.rows, 
            role: VolunteerRole.rows[0], 
            community: VolunteerRole.rows[0].family_id, 
            uniqode: setUniqCode.rows[0].uniq_code 
        });
    } catch (err) {
        next(err.message);
    }
});

const getUsers = (async (req, res, next) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
    } catch (err) {
        next(err);
    }
});

const getFamilyVolunteers = (async (req, res, next) => {
    try {
        const { family_id } = req.params;
        const foundVolunteers = await pool.query(
            "SELECT * FROM users INNER JOIN roles ON roles.family_id=$1 AND roles.role ='helper' AND roles.user_id = users.user_id",
            [family_id]
        );
        if (foundVolunteers.rows[0]) {
            res.json(foundVolunteers.rows);
        } else { res.send("sorry, but that family don't have any volunteers") }
    } catch (err) {
        next(err);
    }
});

const updateVoluteer = (async (req, res, next) => {
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
        next(err);
    }
});

const deleteVolunteer = (async (req, res, next) => {
    try {
        const { user_id } = req.params;
        await pool.query("DELETE FROM users WHERE user_id=$1", [user_id]);
        res.send("deleted succsessfuly");
      } catch (err) {
        next(err);
      }
});

const getUser = (async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const foundUser = await pool.query(
          "SELECT * FROM users WHERE user_id=$1",
          [user_id]
        );
        res.json(foundUser.rows);
      } catch (err) {
        next(err);
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