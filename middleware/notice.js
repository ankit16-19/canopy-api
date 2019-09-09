const Notice = require('../models/notice')
const Lock = require('../models/global_lock')
const mq = require('../services/MQService');
const axios = require('axios')

queueNotice = async (uid,pwd) => {
    return mq.publishToQueue(process.env.NOTICE, {
		uid: uid,
		pwd: pwd
	})
}

const notice_middleware = async (req,res,next)=>{
	
	try {
		let lock = await Lock.findOne({})

		if(!lock){
			lock = await Lock.create({})
		}
		
		// let notice = await Notice.findOne({})
		// if (!notice) {
		// 	ndnotice = await new Notice({})
		// 	await nd.save()
		// }

		if(!lock.global_lock){
			await queueNotice(req.body.uid,req.body.pwd)
			await Lock.updateOne({_id: lock._id}, {global_lock:true});
		}
			
		next()

	}catch (err){
		console.log(err)
	}
}

module.exports = notice_middleware