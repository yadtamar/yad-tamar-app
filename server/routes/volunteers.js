const router = require('express').Router();
const {
    createVoluteer,
    getFamilyVolunteers,
    getUsers,
    getUser,
    updateVoluteer,
    deleteVolunteer
} = require('../controllers/volunteers');

router.post("/create-volunteer", createVoluteer);
router.get("/volunteers-for-family/:family_id", getFamilyVolunteers);
router.get("/all-users", getUsers);
router.get("/:user_id", getUser);
router.put("/:user_id", updateVoluteer);
router.delete("/:user_id", deleteVolunteer);

module.exports = router;