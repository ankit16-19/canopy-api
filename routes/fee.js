const express = require("express")
const router = new express.Router()
const Fee = require("../models/fee")
const fee_middleware = require("../middleware/fee")

// const response = ''

router.post("/fee", fee_middleware, async (req, res) => {
	try {
		const fee = await Fee.findOne({studentID: req.body.uid})	
		res.send(fee)
	} catch (error) {
		console.log(error);	
	}
})

module.exports = router
