const pool = require("../db");
//create a new task
const createTask = (async (req, res) => {
    try {
        const {
            family_id, task_name, helper_id, date, comments
        } = req.body;

        const newTask = await pool.query(
            "INSERT INTO tasks (family_id, task_name, helper_id, date, comments) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [family_id, task_name, helper_id, date, comments]
        );
        res.json(newTask.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const getTasksForFamily = (async (req, res) => {
    try {
        const { family_id } = req.params;
        const familyTasks = await pool.query("SELECT * FROM tasks WHERE family_id=$1",
            [family_id]);
        (familyTasks.rows[0] !== undefined ? res.json(familyTasks.rows) : res.send("no tasks for this family"));
    } catch (err) {
        console.error(err);
    }
});

const getSingleTask = (async (req, res) => {
    try {
        const { task_id } = req.params;
        const foundTask = await pool.query(
            "SELECT * FROM tasks WHERE task_id=$1",
            [task_id]
        );
        res.json(foundTask.rows);
    } catch (err) {
        console.error(err);
    }
});

const updateTask = (async (req, res) => {
    try {
        const { task_id } = req.params;
        const {
            family_id,
            task_name,
            helper_id,
            date,
            comments
        } = req.body;
        await pool.query(
            "UPDATE tasks SET family_id = $1, task_name=$2, helper_id=$3, date=$4, comments=$5 WHERE task_id = $6",
            [
                family_id,
                task_name,
                helper_id,
                date,
                comments,
                task_id
            ]
        );
        res.send("the task was Updated");
    } catch (err) {
        console.error(err);
    }
});

const deleteTask = (async (req, res) => {
    try {
        const { task_id } = req.params;
        await pool.query("DELETE FROM tasks WHERE task_id=$1",
            [task_id]);
        res.send("the task was deleted succsessfuly");
    } catch (err) {
        console.error(err);
    }
});

module.exports = {
    createTask,
    getTasksForFamily,
    getSingleTask,
    updateTask,
    deleteTask
};