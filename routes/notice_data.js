const express = require("express")
const router = new express.Router()
const ND = require('../models/notice_data')
const notice_data_middleware  = require('../middleware/notice_data')

router.post('/notice_data',notice_data_middleware,async(req,res)=>{
    try {
        const nd  = await ND.findOne({id:req.body.id})
        res.send(nd)
    } catch (error) {
        console.log(error);
        
    }
})

module.exports = router
