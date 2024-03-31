const mongoose = require('mongoose');
const config = require('config');

main()
    .then(() => console.log("You have successfully connected to mongoDB"))
    .catch(() => new Error("Failed to connect to mongoDB"));

async function main() {
    const link = config.get('db.host') + ':' + config.get('db.port') + '/' + config.get('db.name');
    return mongoose.connect(link);
}
