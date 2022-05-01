const router = require('express').Router();
const {
    createTask,
    getTasksForFamily,
    getSingleTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');;

router.post("/Create_Task", 
    (req, res) => createTask(req, res)
);
router.get("/tasks_for_family/:family_id",
    (req, res) => getTasksForFamily(req, res)
);
router.get("/:task_id",
    (req, res) => getSingleTask(req, res)
);
router.put("/:task_id", 
    (req, res) => updateTask(req, res)
);
router.delete("/:task_id", 
    (req, res) => deleteTask(req, res));

module.exports = router;