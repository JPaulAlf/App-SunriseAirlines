//mongodb+srv://user:123456@cruddb.hfs55.mongodb.net/db_sunrise_airlines?retryWrites=true&w=majority
const mongoose = require('mongoose');

const conectarDB = async () => {

    try {
        
        await mongoose.connect('mongodb+srv://user:123456@sunriseairlines.jwyyj.mongodb.net/SunriseAirlines', {

            useNewUrlParser: true,
            useUnifiedTopology: true,


        });
        console.log('DB connected');


    } catch (error) {
        console.error(error);
        process.exit(1); //stop execution
    }

};

module.exports = conectarDB;