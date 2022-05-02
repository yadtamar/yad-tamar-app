const router = require('express').Router();
const {
    createTask,
    getTasksForFamily,
    getSingleTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');;

router.post("/Create_Task", createTask);
router.get("/tasks_for_family/:family_id", getTasksForFamily);
router.get("/:task_id", getSingleTask);
router.put("/:task_id",  updateTask);
router.delete("/:task_id", deleteTask);

module.exports = router;