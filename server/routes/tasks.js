const router = require('express').Router();
const {
    createTask,
    getTasksForFamily,
    getVolunteerAndFamilyEmptyTasks,
    getSingleTask,
    getVolunteerTasks,
    updateTask,
    deleteTask,
    taskPercent
} = require('../controllers/tasks');

router.post("/", createTask);
router.get("/tasks-for-family/:family_id", getTasksForFamily);
router.get("/voluteer-tasks/:family_id/:volunteer_id", getVolunteerAndFamilyEmptyTasks);
router.get("/voluteer-tasks/:volunteer_id", getVolunteerTasks);
router.get("/:task_id", getSingleTask);
router.put("/:task_id", updateTask);
router.get("/task-percent/:family_id", taskPercent);
router.delete("/:task_id", deleteTask);

module.exports = router;