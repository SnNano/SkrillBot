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
	googleId: {
		type: String,
		required: false,
		default: ""
	},
	phone: {
		type: String,
		required: false,
		minlength: 10,
		maxlength: 15,
		index: {
			unique: true,
			partialFilterExpression: { email: { $type: 'string' } },
		},
		default: null
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
	status: { type: String, default: "active" }, // active, cancel, inactive
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
userSchema.index({ phone: 1 },
	{
		unique: true,
		partialFilterExpression: { phone: { $exists: true, $gt: '' } }
	}
);
module.exports = mongoose.model("User", userSchema);
