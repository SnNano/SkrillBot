const express = require('express');
const stripe = require('../middleware/stripe');
const checkout = require('./checkout');
const subscription = require('./subscription');
const invoice = require('./invoice');
const User = require("../models/userModel");



const webhookPost = async (req, res) => {
	let data;
	let eventType;
	// console.log(`webhook"]`,process.env.STRIPE_WEBHOOK_SECRET)
	// Check if webhook signing is configured.
	if (process.env.STRIPE_WEBHOOK_SECRET) {
		// Retrieve the event by verifying the signature using the raw body and secret.
		let event;
		// console.log(`req.headers["stripe-signature"]`,req.headers["stripe-signature"])
		let signature = req.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`);
			return res.sendStatus(400);
		}
		// Extract the object from the event.
		data = event.data;
		eventType = event.type;
	} else {
		// Webhook signing is recommended, but if the secret is not configured in `config.js`,
		// retrieve the event data directly from the request body.
		data = req.body.data;
		eventType = req.body.type;

	}

	checkout(eventType, data)
	subscription(eventType, data)
	// invoice(eventType, data)

	if (eventType === "checkout.session.completed") {
		console.log(`🔔  Payment received!`);
		const session = data.object;
		const user = await User.findOne({ customerId: session.customer });
		if (user) {
			// Retrieve the Checkout Session with line items
			const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
				expand: ['line_items'],
			});
			// Access the priceId from the retrieved session
			const priceId = fullSession.line_items.data[0].price.id;

			await updateUser(user, priceId);
			console.log("User updated");
		} else {
			console.log("User not found");
		}
	}

	res.sendStatus(200);
}

// Webhook handler for asynchronous events.
const updateUser = async (user, priceId) => {
	if (priceId === process.env.STRIPE_PRODUCT_MONTHLY) {
		user.characters = -1;
		user.plan = "monthly";
	} else if (priceId === process.env.STRIPE_PRODUCT_YEARLY) {
		user.characters = -1;
		user.plan = "yearly";
	}
	await user.save();
}
module.exports = {
	webhookPost
}