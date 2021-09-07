const KEY_TASKS = "tasks";

/**
 * Save a task to device storage.
 *
 * @param {TaskItem} task The task to store.
 */
function saveTask(task) {
    const allTasks = JSON.parse(localStorage.getItem(KEY_TASKS) || "[]");
    allTasks.push(task);
    localStorage.setItem(KEY_TASKS, JSON.stringify(allTasks));
}

/**
 * Returns all the tasks for the app from device storage.
 */
function loadTasks() {
    return JSON.parse(localStorage.getItem(KEY_TASKS) || "[]");
}

/*
 *  Persist task status after toggle
 */
function updateTask(taskId, taskStatus) {
    let allTasks = JSON.parse(localStorage.getItem(KEY_TASKS) || "[]").map(
        (task) => {
            if (task.id === taskId) {
                console.log("found");
                return { ...task, done: taskStatus };
            }
            return task;
        }
    );
    localStorage.setItem(KEY_TASKS, JSON.stringify(allTasks));
}
