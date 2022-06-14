const router = require('express').Router();

const {
   register,
   login,
   getUserData
} = require('../controllers/auth');;

router.post("/register", register);
router.post("/login", login);
router.get("/get-user-data", getUserData);
module.exports = router;