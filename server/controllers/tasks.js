const pool = require("../db");
//create a new task
const createTask = (async (req, res, next) => {
    try {
        const {
            family_id, task_name, helper_id, date, comments, was_completed
        } = req.body;

        const newTask = await pool.query(
            "INSERT INTO tasks (family_id, task_name, helper_id, date, comments, was_completed) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [family_id, task_name, helper_id, date, comments, was_completed]
        );
        res.json(newTask.rows);
    } catch (err) {
        next(err.message);
    }
});

const getTasksForFamily = (async (req, res, next) => {
    try {
        const { family_id } = req.params;
        let familyTasks = await pool.query("SELECT * FROM tasks WHERE family_id=$1 ORDER BY date",
            [family_id]);
        familyTasks.rows[0] !== undefined ? res.json(familyTasks.rows) : res.send("no tasks for this family");
    } catch (err) {
        next(err);
    }
});

const taskPercent = (async (req, res, next) => {
    try {
        const { family_id } = req.params;
        let familyTasks = await pool.query("SELECT 100.0 * SUM(CASE WHEN helper_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*) AS takenPercent FROM tasks WHERE family_id=$1",
            [family_id]);
        const takenProcent = Math.round(familyTasks.rows[0].takenpercent);
        familyTasks == undefined ? res.send("no tasks for this family") : res.json(takenProcent);
    } catch (err) {
        next(err);
    }
})

const getVolunteerAndFamilyEmptyTasks = (async (req, res, next) => {
    try {
        const { family_id } = req.params;
        const { volunteer_id } = req.params;
        let familyTasks = await pool.query(
            "SELECT * FROM tasks WHERE family_id=$1 AND (helper_id=$2 OR helper_id IS NULL) ORDER BY date",
            [family_id, volunteer_id]);
        familyTasks = familyTasks.rows;
        familyTasks !== undefined ? res.json(familyTasks) : res.send("no tasks to do for this family");
    } catch (err) {
        next(err);
    }
});

const getVolunteerTasks = (async (req, res, next) => {
    try {
        const { volunteer_id } = req.params;
        const foundTasks = await pool.query(
            "SELECT * FROM tasks WHERE helper_id=$1 ORDER BY date",
            [volunteer_id]
        );
        res.json(foundTasks.rows);
    } catch (err) {
        next(err);
    }
});

const getSingleTask = (async (req, res, next) => {
    try {
        const { task_id } = req.params;
        const foundTask = await pool.query(
            "SELECT * FROM tasks WHERE task_id=$1",
            [task_id]
        );
        res.json(foundTask.rows);
    } catch (err) {
        next(err);
    }
});

const updateTask = (async (req, res, next) => {
    try {
        const { task_id } = req.params;
        const {
            family_id,
            task_name,
            helper_id,
            date,
            comments,
            was_completed
        } = req.body;
        let updatedTask = await pool.query(
            "UPDATE tasks SET family_id = $1, task_name=$2, helper_id=$3, date=$4, comments=$5, was_completed=$6 WHERE task_id=$7 RETURNING *",
            [
                family_id,
                task_name,
                helper_id,
                date,
                comments,
                was_completed,
                task_id
            ]
        );
        updatedTask = updatedTask.rows[0]
        res.send( updatedTask);
    } catch (err) {
        next(err);
    }
});

const deleteTask = (async (req, res, next) => {
    try {
        const { task_id } = req.params;
        await pool.query("DELETE FROM tasks WHERE task_id=$1",
            [task_id]);
        res.send("the task was deleted succsessfuly");
    } catch (err) {
        next(err);
    }
});

module.exports = {
    createTask,
    getTasksForFamily,
    getSingleTask,
    getVolunteerTasks,
    getVolunteerAndFamilyEmptyTasks,
    updateTask,
    deleteTask,
    taskPercent
};