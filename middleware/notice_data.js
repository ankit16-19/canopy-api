// async function db_creator(n_id) {
//     const now = new Date()
//     await ND.create({id:n_id,last_updated:now})

// }
const axios = require("axios")
const mq = require('../services/MQService');
const NoticeData = require("../models/notice_data")

queueNoticeData = async (uid, pwd, id) => {
	return mq.publishToQueue(process.env.NOTICE_DATA, {
		uid: uid,
		pwd: pwd,
		id: id
	})
}

const notice_data_middleware = async (req, res, next) => {
	try{
		let nd = await NoticeData.findOne({ id: req.body.id })
		if (!nd) {
			nd = await new NoticeData({ id: req.body.id })
			await nd.save()

		}

		if(!nd.lock){
			await queueNoticeData(req.body.uid, req.body.pwd, req.body.id)
			await NoticeData.updateOne({_id: nd._id}, {lock:true});
		}
		

		next()
	}catch (err){
		console.log(err)
	}
}

module.exports = notice_data_middleware
