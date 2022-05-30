const pool = require("../db");
//create a new task
const createTask = (async (req, res, next) => {
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
        next(err.message);
    }
});

const getTasksForFamily = (async (req, res, next) => {
    try {
        const { family_id } = req.params;
        const dateNow = Date.now();
        const familyTasks = await pool.query("SELECT * FROM tasks WHERE family_id=$1 ORDER BY date",
            [family_id]);
            let tasks = familyTasks.rows
            let relevantTasks = tasks.filter(task => {
                return task.date > dateNow
                // if (task.date > dateNow){
                //     let newArr =+ task;
                //     relevantTasks.push(task);
                // }else{
                //     console.log("the task ",tasks.rows,"it past!")
                // }
            
            })
            
        (relevantTasks !== undefined ? res.json( relevantTasks) : res.send("no tasks for this family"));
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
    updateTask,
    deleteTask
};