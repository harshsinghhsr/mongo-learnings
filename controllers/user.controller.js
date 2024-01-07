const model = require('../models/user.model');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

async function createUser(body) {

    try {

        const { username, email, password } = body;

        const newUser = new model({ username, email, password });

        const savedUser = await newUser.save();

        return savedUser;


    } catch (error) {

        console.log(error)
        return error;

    }

}

async function seed() {

    try {


        const batchSize = 1000;
        const batches = 1000;

        for (let i = 0; i < batches; i++) {
            let usersBatch = [];

            for (let j = 0; j < batchSize; j++) {
                const uniqueSuffix = `${i}-${j}`;
                const user = {
                    username: faker.internet.userName(),
                    email: `${faker.internet.email().split('@')[0]}${uniqueSuffix}@${faker.internet.email().split('@')[1]}`,
                    password: faker.internet.password(),
                };

                usersBatch.push(user);

            }

            await model.insertMany(usersBatch).catch(err => {
                console.error('Error inserting batch:', err);
                return;
            });

            console.log(`Batch ${i + 1} of ${batches} inserted.`);
        }

        return { success: true, message: `Seeded users successfully` };

    } catch (error) {

        console.log(error)

        return { success: false, message: `Error seeding users: ${error.message}` };

    }

}

async function fetchUsers(data) {

    try {
        const { email } = data;

        // const users = await model.findOne({email : email } );

        const emailRegex = new RegExp(email, 'i');

        // Find users with email matching the regex, limit to 10 results
        const users = await model.find({ email: { $regex: emailRegex } }).limit(10).explain();


        return { success: true, message: `Seeded users successfully`, response: users };

    } catch (err) {

        console.error('Error fetching users:', err);

        return { success: false, message: `Error seeding users: ${err.message}` };
    }
}






module.exports = { createUser, seed, fetchUsers }