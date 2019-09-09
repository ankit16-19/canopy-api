const amqp = require('amqplib/callback_api');
const CONN_URL = process.env.MQCONN;

let channel = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, rchannel) {
       if(err)
            throw new Error("error: ", err)
        channel = rchannel;
   });
});


exports.publishToQueue =  (queueName, data) => {
    console.log(data)
    return new Promise((resolve, reject)=> {

        try {
            channel.assertQueue(queueName, {
                durable: true
            });
        
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
            resolve();
        } catch (e){
            reject(e)
        }
    })
}



process.on('exit', (code) => {
    channel.close();
   console.log(`Closing rabbitmq channel`);
});