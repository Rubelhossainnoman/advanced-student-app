const env = require('dotenv').config();
const twilio = require('twilio')(process.env.SID , process.env.TWILIO_TOKEN);

const sendSms = async (phone,sms) =>{
    
    await twilio.messages.create({
        from : process.env.TWILIO_CELL,
        to : phone,
        body : sms
    }).then (res =>{
        console.log('SMS send successfull');
    }).catch(error =>{
        console.log(error.message);
    })


}
module.exports = sendSms;