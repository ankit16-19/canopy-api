const mongoose = require("mongoose")

const lockSchema = new mongoose.Schema({
	global_lock: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		default: "scraper_lock"
	}
})

const Lock = mongoose.model("Lock", lockSchema, "global_locks")

module.exports = Lock