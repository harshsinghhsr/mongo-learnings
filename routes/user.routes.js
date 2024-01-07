const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const controller = require('../controllers/user.controller');
const response = require('../services/responseHandler');


router.post('/create', async (req, res) => {
    try {

        let data = await controller.createUser(req.body);

        return response.sendResponse(res, 200, data);

    } catch (error) {

        console.error('Error creating user', error);

        return response.sendError(res, 500, error);


    }
});


router.post('/createFakeData', async (req, res) => {
    try {

        let data = await controller.seed();

        if (data.success) {
            return response.sendResponse(res, 200, data.message);
        } else {
            return response.sendError(res, 500, data.message);
        }

    } catch (error) {

        console.error('Error creating user', error);

        return response.sendError(res, 500, error);


    }
});

router.get('/fetch', async (req, res) => {
    try {

        let obj = req.query || {}

        let data = await controller.fetchUsers(obj);

        if (data.success) {
            return response.sendResponse(res, 200, data.response);
        } else {
            return response.sendError(res, 500, data.message);
        }

    } catch (error) {

        console.error('Error fetching user', error);

        return response.sendError(res, 500, error);


    }
});

module.exports = router;
