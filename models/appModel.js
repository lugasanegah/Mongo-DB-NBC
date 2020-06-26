const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_ADDRESS, { 
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

module.exports = mongoose;