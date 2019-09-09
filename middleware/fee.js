const Fee = require("../models/fee")
const mq = require('../services/MQService');
const axios = require("axios")

queueFee = async (uid, pwd) => {
	return mq.publishToQueue(process.env.FEE, {
		uid: uid,
		pwd: pwd
	})
}

const fee_scrape = async (req, res, next) => {

	try {
		let fee = await Fee.findOne({ studentID: req.body.uid })

		if (!fee) {
			// Create
			fee = new Fee({ studentID: req.body.uid })
			await fee.save()
		}

		if (!fee.lock) {
			await queueFee(req.body.uid, req.body.pwd)
			// Activate lock
			await Fee.updateOne({_id: fee.id}, {lock:true});
		}


		next()
	}catch (err) {
		console.log(err)
	}

}

module.exports = fee_scrape
