const router = require('express').Router();
const auth = require('../controllers/auth')

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

router.post("/", auth.authorization, createTask);
router.get("/tasks-for-family/:family_id", auth.authorization, getTasksForFamily);
router.get("/voluteer-tasks/:family_id/:volunteer_id", auth.authorization, getVolunteerAndFamilyEmptyTasks);
router.get("/voluteer-tasks/:volunteer_id", auth.authorization, getVolunteerTasks);
router.get("/:task_id", auth.authorization, getSingleTask);
router.put("/:task_id", auth.authorization, updateTask);
router.get("/task-percent/:family_id", auth.authorization, taskPercent);
router.delete("/:task_id", auth.authorization, deleteTask);

module.exports = router;