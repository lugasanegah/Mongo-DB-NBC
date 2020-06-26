const mongoose = require("./appModel.js");


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value) { // untuk mengecek jika user memasukkan angka ke dalam nama, maka kita akan mengirimkan  pesan error
            value = parseInt(value)
            if (!isNaN(value)) {
                throw new Error("nama tidak boleh berupa nomor")
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    }
})


const Tasks = mongoose.model ('Tasks', taskSchema ) 

module.exports = Tasks

