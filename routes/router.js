const {Router} = require('express')
const router = Router()
const xlx = require('../src/xlstojson');
const multer  = require('multer');
const cmail = require('../src/CreateMail')
const maillist = require("../src/MailListConfigFile")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
 const upload = multer({ storage: storage });


//index.html

router.get('/', async (req,res)=>{
    const xj = async () => {    
        try{
        return res.render('xls',
                {
                tip: await xlx.tipToCombo(),
                jbody:  await xlx.startPage()
                })
            }
        catch(err) {throw(err)}
    }
    xj().then(r=>{return r})   
})    
      



router.get('/xls', async (req,res)=>{
    const xj = async () => await xlx.xlx();
    xj().then(data=>{    
        return res.render('xls',
                {
                jbody: data
                })
        })
})    

router.get('/openfile', (req,res)=>{        
        return res.render('openfile')                
})    

router.post('/upload', upload.single('file'), (res,req,next)=>{
    return res.Status(200);
});   


router.get('/clearOrder', function (res, req) {
        xlx.clearOrder();
        res.render('/');
    });   

router.get('/order', async (req,res)=>{                 
    const xj = async () => {        
        const mlist = maillist.getMailList();        
        return res.render('order',{
            jbody: await xlx.prepareOrder(),
            maillist: mlist
        }) 
    }
    xj().then(r=>{return r})
})


//============================= XHR ============================================

router.get('/myGooogle', async (req,res)=>{            
    const g = async() => await xlx.iGooogle(req.query.sLine)         
    g().then(data=>{     
        var obj = {};
        obj.Result =  data.data;
        return res.status(200).json(obj || {"Result": "<h1>No data found...</h1>"})
    }).catch(err=>{
        return res.status(400).send(err)
    });        
    })


    router.get('/tip',(req,res)=>{             
        const xj = async () => await xlx.getDatabyTip(req.query.tip);        
        xj().then(data=>{            
                var obj = {};
                obj.Result =  data.data;
                return res.status(200).json(obj || {"Result": "<h1>No data found...</h1>"})
            }).catch(err=>{
                return res.status(400).send(err)
            });         
    })

    router.get('/putToBasket',(req,res)=>{                     
        const xj = async () => await xlx.putToBasket(req.query.kod,req.query.kol,req.query.count);        
        xj().then(data=>{                        
                var obj = {};
                obj.Result =  data.data;
                return res.status(200).json(obj || {"Result": "<h1>No data found...</h1>"})
            }).catch(err=>{
                return res.status(400).send(err)
            });        
    })

    router.post('/sendMail', async (req,res)=>{                  
        try {
            console.log(req.body)
            const msg = await xlx.composeMsg(req.body)  
            await cmail.sendMailTo(req.body.group,msg)            
            res.render('mailsended')
            } catch (err) {throw err}
               
        })
    
    
//========================================================================================

 


module.exports = router