const dotenv = require("dotenv").config();
const axios = require('axios');

const getRandomUser = async(req, res)=>{
    const apiUrl = `https://randomuser.me/api/?results=13`;
    try {
        const { data } = await axios.get(apiUrl);
        res.status(200).send(data);
    } catch (error) {
        res.status(401);
        console.log(error);
    }
}

module.exports = {getRandomUser}