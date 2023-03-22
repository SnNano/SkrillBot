const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const postPrompt = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const { prompt, creativity } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
        res.status(401)
        throw new Error("User doesn't exist")
    }
    if (user.characters < -1 || user.characters === 0) {
        res.status(401)
        throw new Error("You reached the characters limit Please Upgrade your plan");
    }
    let completion;
    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 3000,
            temperature: creativity,
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

    outputLength = output.length;
    await updateUserCharacter(user, outputLength);
    res.status(200).json({ result: output, userCharacters: user.characters })
})

const getEssay = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const { prompt, creativity } = req.body;
    const user = await User.findOne({ _id: id });
    console.log(user)
    if (!user) {
        res.status(401)
        throw new Error("User doesn't exist")
    }
    if (user.characters < -1 || user.characters === 0) {
        res.status(401)
        throw new Error("You reached the characters limit Please Upgrade your plan");
    }
    let completion;
    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 3000,
            temperature: creativity,
            user: req.user._id,
            stream: true
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
    await updateUserCharacter(user, outputLength)
    res.status(200).json({ result: output, userCharacters: user.characters })
})


const codePrompt = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    const id = req.user._id.toString();
    const user = await User.findOne({ _id: id });
    if (!user) {
        res.status(401)
        throw new Error("User doesn't exist")
    }
    if (user.characters < -1 || user.characters === 0) {
        res.status(401)
        throw new Error("You reached the characters limit Please Upgrade your plan");
    }
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
    await updateUserCharacter(user, outputLength)
    res.status(200).json({ result: output, userCharacters: user.characters })
})

const postChatgpt = asyncHandler(async (req, res) => {
    const { prompt, creativity } = req.body;
    const id = req.user._id;
    const user = await User.findOne({ _id: id });
    if (!user) {
        res.status(401)
        throw new Error("User doesn't exist")
    }
    if (user.characters < -1 || user.characters === 0) {
        res.status(401)
        throw new Error("You reached the characters limit Please Upgrade your plan");
    }
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prompt,
        max_tokens: 3600,
        temperature: creativity
    });

    outputLength = completion.data.choices[0].message.content.length
    await updateUserCharacter(user, outputLength)
    res.json({ result: completion.data.choices[0].message, userCharacters: user.characters });
})

const updateUserCharacter = async (user, outputLength) => {
    // check if user has free plan
    if (user.plan === "free" || user.plan === "canceled") {
        user.characters = user.characters - outputLength
        user.charactersUsed = user.charactersUsed + outputLength
        await user.save()
    }
}

module.exports = { postPrompt, codePrompt, postChatgpt, getEssay }