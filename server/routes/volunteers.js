const router = require('express').Router();
const {
    createVoluteer,
    getFamilyVolunteers,
    getUsers,
    getUser,
    updateVoluteer,
    deleteVolunteer
} = require('../controllers/volunteers');

router.post("/Create_Volunteer", 
    (req, res) => createVoluteer(req, res)
);
router.get("/volunteers_for_family/:family_id",
    (req, res) => getFamilyVolunteers(req, res)
);
router.get("/", getUsers);
router.get("/:user_id",
    (req, res) => getUser(req, res)
);
router.put("/:user_id", 
    (req, res) =>updateVoluteer(req, res)
);
router.delete("/:user_id", 
    (req, res) => deleteVolunteer(req, res));

module.exports = router;