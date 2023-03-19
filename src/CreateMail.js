const cfg = require('../src/app_config');
const maillist = require("../src/MailListConfigFile")
const nodemailer = require('nodemailer')

const CrateMailMsg = (maillist,body) =>{

return  { 
    from: cfg.config.MailFrom,
      to: maillist,
 subject: body.subject,
    html: body.text

}}

const sendMailTo = async (group,body) =>{  
  var list = maillist.getRecipByGroupName(group);  
  try {    
    var trans = nodemailer.createTransport(
      { 
        service: 'gmail',
        auth: {
          user: 'oxffffdr@gmail.com',
          pass: '--'
        }
      });          
    var msg = CrateMailMsg(list,body)
   
    await trans.sendMail(msg);  
  
} catch (err) {throw err}
}

module.exports.CrateMailMsg = CrateMailMsg
module.exports.sendMailTo = sendMailTo
