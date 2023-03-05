const dotenv = require("dotenv").config();
const axios = require("axios");
const FormData = require('form-data');


const rewriteText = async (req, res) => {

    const { prompt } = req.body;
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
}


module.exports = { rewriteText }