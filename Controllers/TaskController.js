const data = require('../task.json');
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../task.json');
const taskArray = data.tasks;

function GetAllTasks(req, res) {
    const { completed, createdAt } = req.query;
    let filteredTasks = [...taskArray];
    if (createdAt === 'asc' || createdAt === 'desc') {
        filteredTasks.sort((a,b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if(createdAt == 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });   
    }
    if (completed === 'true' || completed === 'false') {
        const status = (completed === 'true');
        filteredTasks = filteredTasks.filter(t => t.completed === status);
        return res.status(200).json(filteredTasks);
    }

    res.status(200).json(filteredTasks);
}

function GetTaskById(req, res) {
    const id = +req.params.id;
    const data = taskArray.find(t => t.id == id);
    if(!data) 
        return res.status(404).send(`Task ${id} does not exist`);
    res.status(200).send(data);
}

function CreateNewTask(req, res) {
    let filteredTasks = [...taskArray];
    const id = filteredTasks.length > 0 ? +(filteredTasks[filteredTasks.length - 1].id + 1) : 1;
    const {title, description, completed, priority} = req.body;
    if(!description || !title) 
        return res.status(400).send('Title or description cannot be empty')
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: "completed must be a boolean" });
    }
    const createdAt = new Date();
    const newTask = {"id" : id, "title" : title, "description" : description, 
        "completed" : completed === 'true', "createdAt" : createdAt,
        "priority" : (priority ? priority : "low")};
    taskArray.push(newTask);
    saveToFile(res, 201, newTask);
}

function saveToFile(res, successStatus, newTask) {
    const updateData = JSON.stringify({ tasks: taskArray }, null, 2);
    fs.writeFile(filePath, updateData, (err) => {
        if (err) {
            console.log('Error in saving new task');
            return res.status(500).send('Error saving task');
        }
        res.status(successStatus).send(newTask);
    });
}

function UpdateTask(req, res) {
    const id = +req.params.id;
    const index = taskArray.findIndex(t => t.id == id);

    if(index == -1) 
        return res.status(404).send(`Task ${id} does not exist`);

    const {title, description, completed, priority} = req.body;

    if(!description || !title) 
        return res.status(400).send('Title or description cannot be empty')
    if (typeof completed !== 'boolean') {
        return res.status(400).send({ message: "completed must be a boolean" });
    }

    const updatedTask = {id, title, description, completed, priority : (priority ? priority : taskArray[index].priority)};
    taskArray[index] = updatedTask;
    saveToFile(res, 200, updatedTask);
}

function DeleteTask(req, res) {
    const id = +req.params.id;
    console.log({taskArray})
    console.log(id)
    const index = taskArray.findIndex(t => t.id == id)
    if(index == -1) 
        return res.status(404).send(`Task ${id} does not exist`);

    if(taskArray.length >= id) taskArray.splice(index, 1)
    saveToFile(res, 200, 'Task deleted successfully')
}

function GetTasksByPriority(req, res) {
    const level = req.params.level;
    let filteredTasks = [...taskArray];
    filteredTasks = filteredTasks.filter(t => t.priority == level);
    res.status(200).send(filteredTasks);
}

module.exports = {GetAllTasks, GetTaskById, CreateNewTask, UpdateTask, DeleteTask, GetTasksByPriority}