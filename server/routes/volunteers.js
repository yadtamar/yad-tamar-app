const router = require('express').Router();
const auth = require('../controllers/auth');

const {
    createVoluteer,
    getFamilyVolunteers,
    getUsers,
    getUser,
    updateVoluteer,
    deleteVolunteer,
    sendSms
} = require('../controllers/volunteers');

router.post("/", auth.authorization, createVoluteer);
router.post("/send-sms", auth.authorization, sendSms);
router.get("/volunteers-for-family/:family_id", auth.authorization, getFamilyVolunteers);
router.get("/all-users", auth.authorization, getUsers);
router.get("/:user_id", auth.authorization, getUser);
router.put("/:user_id", auth.authorization, updateVoluteer);
router.delete("/:user_id", auth.authorization, deleteVolunteer);

module.exports = router;