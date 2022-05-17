const router = require('express').Router();
expressValidator = require("express-validator");
expressSession = require("express-session");
const {
    createFamily,
    getSingleFamily,
    getAllFamilies,
    updateFamily,
    deleteFamily
} = require('../controllers/families');;

router.post("/", createFamily);
router.get("/", getAllFamilies);
router.get("/:family_id", getSingleFamily);
router.put("/:family_id", updateFamily);
router.delete("/:family_id", deleteFamily);

module.exports = router;