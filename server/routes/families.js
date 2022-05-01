const router = require('express').Router();
const {
    createFamily,
    getSingleFamily,
    getAllFamilies,
    updateFamily,
    deleteFamily
} = require('../controllers/families');;

router.post("/", 
    (req, res) => createFamily(req, res)
);
router.get("/",
    (req, res) => getAllFamilies(req, res)
);
router.get("/:family_id",
    (req, res) => getSingleFamily(req, res)
);
router.put("/:family_id", 
    (req, res) => updateFamily(req, res)
);
router.delete("/:family_id", 
    (req, res) => deleteFamily(req, res));

module.exports = router;