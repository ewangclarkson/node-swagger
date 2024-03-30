const mongoose = require('mongoose');

main()
    .then(() => console.log("You have successfully connected to mongoDB"))
    .catch(() => new Error("Failed to connect to mongoDB"));

async function main() {
    return mongoose.connect('mongodb://localhost:27017/playground');

}