const dotenv = require("dotenv").config();
const axios = require("axios");
const FormData = require('form-data');
const asyncHandler = require("express-async-handler");


const rewriteText = asyncHandler(async (req, res) => {

    const { prompt } = req.body;
    const user = User.findOne({ _id: req.user._id });
    if (!user) {
        res.status(401)
        throw new Error("User doesn't exist")
    }
    if (user.characters < -1 || user.characters === 0) {
        res.status(401)
        throw new Error("You reached the characters limit Please Upgrade your plan");
    }
    let apiKey = process.env.SPIN_API_KEY;
    let email = process.env.SPIN_EMAIL;
    let api_url = "http://www.spinrewriter.com/action/api";
    let action = "unique_variation";
    let data = {
        action,
        email_address: email,
        api_key: apiKey,
        text: prompt
    };
    data['confidence_level'] = "medium";
    data['protected_terms'] = "web\nSubject\nDear";
    // prepare a form to make a POST request
    const form = new FormData();

    // built the form entry
    for (let item in data) {
        if (data.hasOwnProperty(item)) {
            form.append(item, data[item]);
        }
    }
    await axios.post(api_url, form, {
        headers: form.getHeaders()
    }).then(response => {
        res.json({ result: response.data.response })
    })
        .catch(error => {
            console.error(error);
        });
})


module.exports = { rewriteText }