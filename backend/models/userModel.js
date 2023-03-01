const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "please add a name"],
		minLength: 4,
		maxLength: 60
	},
	email: {
		type: String,
		required: [true, "please add your email"],
		minLength: 10,
		lowercase: true,
		trim: true,
		maxLength: 100
	},
	password: {
		type: String,
		required: [true, "please add your password"],
		minLength: 10,
		maxLength: 200
	},
	characters: {
		type: Number,
		default: 5000,
		integer: true,
		get: v => Math.round(v),
		set: v => Math.round(v),
	},
	charactersUsed: {
		type: Number,
		default: 0,
		integer: true,
		get: v => Math.round(v),
		set: v => Math.round(v),
	},
	customerId: { type: String, default: "" }, // stripe id
	plan: { type: String, default: "free" }, // monthly, annualy
	status: { type: String, default: "active" }, // trialing, active, inactive
	trial_end: {
		type: Date,
		default: ((Date.now() / 1000) + (30 * 24 * 60 * 60)),
		set: d => new Date(d * 1000)
	},
	current_period_end: {
		type: Date,
		default: ((Date.now() / 1000) + (30 * 24 * 60 * 60)),
		set: d => new Date(d * 1000)
	},
	cancel_at_period_end: { type: Boolean, default: false },
	referralId: {
		type: String,
		unique: true,
		maxLength: 100,
		default: uuidv4,
	},
	referrerPaid: { type: Boolean, default: false }, // has the referral been given credits yet?
	referrer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
