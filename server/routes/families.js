const router = require('express').Router();
const auth = require('../controllers/auth');
expressValidator = require("express-validator");
expressSession = require("express-session");
const {
    createFamily,
    getSingleFamily,
    getAllFamilies,
    updateFamily,
    deleteFamily,
    getCoordinatorsFamilies
} = require('../controllers/families');;

router.post("/", auth.authorization, createFamily);
router.get("/", auth.authorization, getAllFamilies);
router.get("/coordinator", auth.authorization, getCoordinatorsFamilies);
router.get("/:family_id", auth.authorization, getSingleFamily);
router.put("/:family_id", auth.authorization, updateFamily);
router.delete("/:family_id", auth.authorization, deleteFamily);

module.exports = router;