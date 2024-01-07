const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI || '';


function connect() {

    return new Promise(async (resolve, reject) => {

        try {

            const connection = await mongoose.connect(url, {
                user: '',
                pass: '',
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            if (connection.connection.readyState === 1) {
                console.log('Connected to:', connection.connection.name);
                // console.log('Connection URL:', config.mongo.url);
                resolve(true);
            } else {
                console.log('Connection not established');
            }

            resolve(false);

        } catch (error) {

            console.log(error);
            resolve(false);


        }

    })

}


module.exports = connect;


