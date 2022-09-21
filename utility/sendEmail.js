/**
 * Create nodemailer...here...
 */
const nodmailer = require('nodemailer');
const env = require('dotenv').config();
const date = Date.now();

const sendEmail = async (name,email,sub,token) =>{

    const transport = nodmailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    });

    await transport.sendMail({
        from : `"Account Verify" <${process.env.EMAIL_USER}>`,
        to : email,
        subject : sub,
        html : `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Verification</title>
            <link rel="shortcut icon" href="https://cdn-fllhf.nitrocdn.com/dKBXQVomPuLAOGguiZGPMiSvKtcynqZX/assets/static/optimized/rev-9f4c5a9/php_assets/uploads/2021/07/IMG_20210514_093032-01-01-removebg-preview.png" type="image/x-icon">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
                *{
                    margin: 0;
                    padding: 0;
                    font-family: 'Poppins', sans-serif;
                }
                .main-wrapper {
                    background-color: #f2f2f2;
                    padding-top: 1px;
                    padding-bottom: 50px;
                }
                .card {
                    width: 685px;
                    margin: auto;
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .card_header img{
                    width: 120px;
                    object-fit: contain;
                    display: inline-block;
                    padding: 20px;
                    margin: 0;
                }
                .card_header{
                    border-bottom: 1px solid #ddd;
                }
                .card_body{
                    padding: 20px 60px;
                }
                .card_body p{
                    font-size: 14px;
                    font-weight: 400;
                }
                .card_body .mb{
                    margin-bottom: 25px;
                }
                .card_body h3{
                    margin-bottom: 25px;
                }
                .card_body h3 a{
                    color: #d82027;
                    text-decoration: none;
                    font-weight: 16px;
                    border-bottom: 1px solid;
                }
                .info p{
                    margin-bottom: 10px;
                }
                .info ul {
                    margin-left: 40px;
                }
                .info ul li {
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="main-wrapper" style="background-color:#f2f2f2;">
                <div class="wrapper" style="margin-top:100px;">
                    <div class="start_email_template">
                        <div class="template_content">
                            <div class="card">
                                <div class="card_header">
                                    <a href="https://developerrubel.com"><img src="https://ci3.googleusercontent.com/proxy/38rSLh8vi3V3b_6Fj0U20YET3Go4yRH34krH4MSit7LsTdrprPjRk0XdJKsZioXXfgih2W3M7zg7hReT-1GM0lV_gBR1f0nR1Mwig4Hm8aOUlczQ=s0-d-e1-ft#https://www.twilio.com/resources/images/email/twilio-logo-alt.jpg" alt=""></a>
                                </div>
                                <div class="card_body">
                                    <p class="mb">Hi ${name},</p>
                                    <p class="mb">Please enter the following verification code to access your student Account.</p>
                                    <h3><a href="https://bdstudentapp.herokuapp.com/student/verify/${token}" class="btn">Click here for verify</a></h3>
                                    <p class="mb">The request for this access originated from your device</p>
                                    <div class="info">
                                        <p>In case you were not trying to access your Twilio Account & are seeing this email, please follow the instructions below:</p>
                                        <ul>
                                            <li>Reset your account password.
                                            </li>
                                            <li>Check if any changes were made to your account & user settings. If yes, revert them immediately.</li>
                                            <li>If you are unable to access your Student Account then contact Our Support</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p style="text-align:center;font-size:13px; padding:20px;">Student App, 375 Beale St, Priganj-Thakurgaon, CA 94105 , ${date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `
    }).then (res =>{
        console.log(`SMS send successfull`);
    }).catch(error =>{
        console.log('SMS send faild');
    })

}


/**
 * Export nodemailer...
 */
module.exports = sendEmail;