const router = require('express').Router();
const {
    createVoluteer,
    getFamilyVolunteers,
    getUsers,
    getUser,
    updateVoluteer,
    deleteVolunteer
} = require('../controllers/volunteers');

router.post("/Create_Volunteer", createVoluteer);
router.get("/volunteers_for_family/:family_id", getFamilyVolunteers);
router.get("/", getUsers);
router.get("/:user_id", getUser);
router.put("/:user_id", updateVoluteer);
router.delete("/:user_id", deleteVolunteer);

module.exports = router;