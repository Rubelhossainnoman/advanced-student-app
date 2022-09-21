/**
 * Get Axios....
 */
const env = require('dotenv').config();
const axios = require('axios');
const api = process.env.BULK_API;
const num = process.env.BULK_NUM;

/**
 * Config axios
 */
const sendMessageUseBD = async (to, sms) =>{
    // Use  asios....
    await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=${api}&type=text&number=${to}&senderid=${num}&message=${sms}`).then(res =>{
        console.log(`SMS sent successfull`);
    }).catch (error =>{
        console.log('SMS send faild');
    });
}


/**
 * Export axios...
 */
module.exports = sendMessageUseBD;