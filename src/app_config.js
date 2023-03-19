const config =  {           
    MailFrom : 'oxffffgt@gmail.com',
    MailCfg: {
        host: 'imap.gmail.com',
        port: 933,
        secure: true, // true for 465, false for othergit ports 587
        auth: {
        	  user: 'oxffffgt@gmail.com',
	          pass: "--------"
              }
            },
	mongoUri: "mongodb+srv://admin:1a2b3c@cluster0.uud24.mongodb.net/NasaServer",
    jwtSecret: "kdjscjis-ke@lp[f" 

}

module.exports.config = config 
 
