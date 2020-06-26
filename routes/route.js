const User = require('../models/user');
const Task = require('../models/task');

module.exports = function (app) {
    app.get('/users', async (req, res) => {
        try {
            const users = await User.find({})
            res.send(users)
        } catch (e) {
            res.send (e)
        }
    } )

    app.get('/users/:id', async (req, res) => { // get one user by id
        const _id = req.params.id // destruct id

        try {
            const user = await User.findById(_id) // mongoose: Model.findById(id), result: found user

            if (!user) { // it will be empty if not found
                return res.send(404).send() // send error 404
            }

            res.status(200).send(user) // send the found user
        } catch (e) {
            res.status(500).send() //status: internal server error
        }

    })

    app.post('/users', async (req, res) => {
        console.log(req);
        const user = new User (req.body)

        try {
            const rez = await user.save()
            res.status(201).send(rez)
        } catch (e) {
            res.status(400).send(e)
        }
    })


    app.patch('/users/:id', async (req, res) => { // update user by id
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))
        //method every, wajib return boolean(true,false)
        //jika ada salah satu saja return false, maka every akan mereturn false
        // every will test every data in array, if all of it can give return of true, isValidOperations will be true
        // if there is atleast one false, isValidOperation will be false

        if(!isValidOperation) {
            return res.status(400).send({err: "Invalid request!"})
        }

        try {
            // findByIdAndUpdate passing mongoose save() function, we need refactor it
            const user = await User.findById(req.params.id)

            updates.forEach(update => user[update] = req.body[update]) // updating given field in req body
            await user.save()
            
            if(!user) { // user not found, cause const user is empty
                return res.status(404).send({err: "User not found"}) 
            }

            res.status(200).send(user) // send updated user
        } catch (e) {
            res.status(400).send({
                whatYouSend: req.body,
                err: e.message
            }) // bad request
            // if err with validations, it would send Error object from validation model's schema
        }

    })

    app.delete('/users/:id', async (req, res) => { // delete user by id
        try {
            const user = await User.findByIdAndDelete(req.params.id) // find user by id. then delete if exist

            if(!user){ //  check if the user found
                return res.status(404).send({err: "User not found"}) // user not found, will be null
            }

            res.status(200).send("Berhasil di hapus") // if exist, send deleted user
        } catch (e) {
            res.status(500).send(e) // internal bad happen
        }
    })

    // TASK

    app.get('/tasks', async (req, res) => { // Find all tasks

        try {
            const tasks = await Task.find({}) // find all tasks
            res.status(200).send(tasks) // tasks: array of tasks
        } catch (e) {
            res.status(500).send() // internal server error
        }

    })

    app.get('/tasks/:id', async (req, res) => { // get one task by id
        const _id = req.params.id // path  variable

        try {
            const task = await Task.findById(_id)  // find task by id

            if(!task){ // task not found
                return res.status(404).send({err: "Task not found"}) // send error 404
            }

            res.status(200).send(task) // send found task
        } catch (e) {
            res.status(500).send() // internal server error
        }

    })

    app.post("/tasks", async (req, res) => { // add one user
        const task = new Task(req.body); // get body from client

        try {
            const rez = await task.save(); // mongoose: save(), result: inserted task
            res.status(201).send(rez); // status: Created success
        } catch (e) {
            res.status(400).send(e); // status: Bad Request
        }

    });

    app.patch('/tasks/:id', async (req, res) => { // update task by id
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))
        // every will test every data in array, if all of it can give return of true, isValidOperations will be true
        // if there is atleast one false, isValidOperation will be false

        if(!isValidOperation) {
            return res.status(400).send({err: "Invalid request!"})
        }

        try {
            // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            // new : give updated task, runValidator: run validator based on models schema
            // if 'req.body' empty, task will be found task
            const task = await Task.findById(req.params.id)

            updates.forEach(update => task[update] = req.body[update])
            await task.save()

            if(!task){ // task not found, cause const task is empty
                return res.status(404).send({err: "Task not found!"})
            }

            res.status(200).send(task) // send updated task
        } catch (e) {
            res.status(400).send({
                whatYouSend: req.body,
                err: e.message
            }) // bad request
            // if err with validations, it would send Error object from validation model's schema
        }
    })

    app.delete('/tasks/:id', async (req, res) => { // delete one task
        try {
            const task = await Task.findByIdAndDelete(req.params.id) // find task by id

            if(!task){ // check if the task is found
                return res.status(404).send({err: "Task not found!"}) // user not found, null
            }

            res.status(200).send(task) // send the deleted task
        } catch (e) {
            res.status(500).send(e) // internal problem some what
        }
    })
}