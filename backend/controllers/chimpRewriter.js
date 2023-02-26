const dotenv = require("dotenv").config();
const axios = require('axios');

const rewriteChimp = async(req, res)=>{
    const {prompt}= req.body;
    let apiKey = process.env.CHIMP_API_KEY;
    let email = process.env.CHIMP_EMAIL;
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('apikey', apiKey);
    params.append('aid', "Avishdesh");
    params.append('text', prompt);
    params.append('rewrite', 1);
    params.append('quality', 5);
    params.append('phrasequality', 5);
    // params.append('sentencerewrite', 1);
    params.append('grammarcheck', 1);

    const apiUrl = 'https://api.chimprewriter.com/ChimpRewrite';
    
    try {
        const { data } = await axios.post(apiUrl, params);
        res.status(200).send(data);
    } catch (error) {
        res.status(401);
        console.log(error);
    }
}

module.exports = {rewriteChimp}