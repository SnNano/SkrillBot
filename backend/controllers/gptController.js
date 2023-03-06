const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const postPrompt = async (req, res) => {
    const { prompt, creativity } = req.body;
    let completion;
    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: creativity,
            stream: True,
            user: req.user._id
        });
    } catch (error) {
        res.status(401);
        console.log(error);
        throw new Error("You should type a prompt");
    }
    let output = `${completion.data.choices[0].text}`

    // remove the first character from output
    output = output.substring(1, output.length)

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
        output = output.substring(0, output.length - 1)
    }

    // remove a single new line at the end of output if there is one
    if (output.endsWith('\n')) {
        output = output.substring(0, output.length - 1)
    }

    outputLength = output.length
    await updateUserCharacter(req, res, outputLength)
    res.status(200).json({ result: output })
}


const codePrompt = async (req, res) => {
    const { prompt } = req.body;
    let completion;
    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 0,
        });
    } catch (error) {
        res.status(401);
        console.log(error);
        throw new Error("You should type a prompt");
    }
    let output = `${completion.data.choices[0].text}`

    // remove the first character from output
    output = output.substring(1, output.length)

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
        output = output.substring(0, output.length - 1)
    }

    // remove a single new line at the end of output if there is one
    if (output.endsWith('\n')) {
        output = output.substring(0, output.length - 1)
    }

    outputLength = output.length
    await updateUserCharacter(req, res, outputLength)
    res.status(200).json({ result: output })
}

const postChatgpt = async (req, res) => {
    const { prompt, creativity } = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prompt,
        temperature: creativity
    });

    res.json({ result: completion.data.choices[0].message });
}

const updateUserCharacter = async (req, res, outputLength) => {
    let user = await User.findOne({ _id: req.user._id })
    // check if user has free plan
    if (user.plan === "free") {
        user.characters = user.characters - outputLength
        user.charactersUsed = user.charactersUsed + user.characters
        await user.save()
    }
}

module.exports = { postPrompt, codePrompt, postChatgpt }