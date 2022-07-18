const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
var favicon = require('serve-favicon');
var debug = require('debug')('my express app');
const app = require('./app');

//const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const db = "mongodb://127.0.0.1:27017/e-blooddonor";

mongoose.connect(db).then(con => {
    debug(`Db connection successful!`);
    console.log('Db connection successful!');
})

const port =  process.env.PORT || 1337;

app.listen(port, function () {
    debug(`Server listening on port ${port} - http://localhost:${port}`);
    console.log(`Server listening on port ${port} - http://localhost:${port}`);
});
