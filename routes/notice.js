const express = require("express")
const router = new express.Router()
const Notice = require("../models/notice")
const notice_middleware = require("../middleware/notice")

router.post("/notice", notice_middleware, async (req, res) => {
	try {
		const notice = await Notice.find({})
		res.send(notice)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
