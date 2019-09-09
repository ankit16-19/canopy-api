const express = require("express");
require('dotenv').config()
require("./db/mongoose");
const feeRouter = require("./routes/fee");
const noticeRouter = require('./routes/notice')
const notice_dataRouter = require('./routes/notice_data')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(feeRouter);
app.use(noticeRouter)
app.use(notice_dataRouter)


app.listen(port, () => {
  console.log("listening on 3000");
});
