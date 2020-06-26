const User = require("../../../models/user");

module.exports = {
    index
};

async function index(req,res) {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.send (e)
    }
}

