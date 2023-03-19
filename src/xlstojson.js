xlsxj = require("xlsx-to-json");
const fs = require('fs');

const xls = {
    input: "uploads/ostatki.xlsx",
    output: "public/json/output.json"
} 

const bill ={
    input: "uploads/bill.json"
}

const loadSavedJsn = (fname)=>{
    var arr = fs.readFileSync(fname,{encoding: 'utf-8'})
    var obj = JSON.parse(arr)
    var jsn = [] = renameHeadersInJsonFile(obj);
  //  global.savedJSN = jsn
    return jsn;
}

 

function renameHeadersInJsonFile(jArr){
    var i=0;
    var arr = [];
    ren= false
    
try{
    jArr.forEach(element => {        

        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {                                                                                        

                if (key.length == 0 && element[key].length >0){                    
                    ren = true;
                    var price = element[key];                    
                }        
            } }

            if (ren){
                obj = {"kod":element["Штрихкод"],"tip":element["Категорія"],"nazvanie":element["Товар"],"ost":element["Залишки"],"price":price};                
                arr.push(obj)
                ren = false;
            }           
        } )   
    } finally {
        return arr
    }
    }


const saveJsonFromXls = (obj) =>{
    xlsxj(obj,  (err, result) => 
  {
         if (err) {
             console.error("XLS Error: "+err);
         } else {
             return result;
         }
     })
}    

function xlx (){   
    saveJsonFromXls(xls);
     var jsn = loadSavedJsn(xls.output);
     return JSONtoHTML(jsn)

}


const JSONtoHTML = (jsn) =>{
try {    
    str = makeHTMLTable(jsn)
    return str;
} 
 catch (err){throw(err)}
}

const startPage =()=>{    
    return JSONtoHTML(loadSavedJsn(xls.output))
}


function makeHTMLTable(obj){
    var tab = "";
    obj.forEach((data,inx) => {
        tr = `<tr id="tr${data.kod}" style="margin:auto; width:auto; background:${inx % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">`
        var basket = `</td><td><input class="inpCol" type="number" id='i${data.kod}' size='4'></td><td><img class="basket" src="public/img/plus2.ico" size=2 onclick="basketClick(${data.kod})"></td>`
        //var inbasket = `<td><img class="inBasket" id="inBasket"></td>`
        var inbasket="";
        tab = tab + tr+`<td>${inx+1}</td><td id="kod">${data.kod}</td><td id="tip">${data.tip}</td><td id="name">${data.nazvanie}</td><td id="price">${data.price}</td><td id="ost"><b>${data.ost}</b></td>${inbasket}${basket}</tr>\n`
    });
    return tab;
    
}

const getxlsMail = ({ env }) => ({
        // ...
        email: {
            provider: 'nodemailer',
            providerOptions: {
              host: env('SMTP_HOST', 'smtp.gmail.com'),
              port: env('SMTP_PORT', 587),
              auth: {
                user: env('SMTP_USERNAME'),
                pass: env('SMTP_PASSWORD'),
              },
              // ... any custom nodemailer options
            },
            settings: {
              defaultFrom: 'hello@example.com',
              defaultReplyTo: 'hello@example.com',
            },
        },
    });



    const iGooogle = async (sLike) =>{
        var seekWordsA = [] = sLike.split(" ");    
        var seekWords = [];        
        seekWordsA.forEach(el => {if (!(el=="" || el ==" ")){ seekWords.push(el)}});        
        
        var arr = loadSavedJsn(xls.output)        
        var result = [];
        let inx=1;
        var cnt = 0;
        result.push('<table><tbody>');
        try {                       
            arr.forEach(full_name=>{
                var partial_names  = full_name.nazvanie.toLowerCase();                    
                        for (var i = 0; i < seekWords.length; i++) {
                            if (partial_names.includes(seekWords[i].toLowerCase()) && seekWords[i].length>0 ){                                
                                cnt++
                            }
                        }
                        if (cnt == seekWords.length) {
                                var tr = `<tr id="tr${full_name.kod}" style="margin:auto; width:auto; background:${inx % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">`
                                var basket = `<td><input type="number" class="inpCol" id='i${full_name.kod}' size='4'></td><td><img src="public/img/plus2.ico" class="basket" onclick="basketClick(${full_name.kod})"></td>`
                                result.push(`${tr}<td>${full_name.kod}</td><td id="name">${full_name.nazvanie}</td><td id="price">${full_name.price}</td><td id="ost">${full_name.ost}</td>${basket}</td></tr>`)
                                inx++;
                        }                             
                    cnt = 0 ;
                })                    
                
        } catch (error) 
            {
                console.log(error)
            }  
            result.push('</tbody></table>')           
            //console.log(result) 
            return {data: result.join('\n')};  
    }




const tipToCombo = async () => {    
    var arr = loadSavedJsn(xls.output)        
        var result = [];
        prev = arr[0].tip
        result.push(`<option value='${prev}'>${prev}</option>`);
        arr.forEach(el => {
            if (!el.tip=='' && el.tip != prev){                
                result.push(`<option value='${el.tip}'>${el.tip}</option>`)
                prev = el.tip;
            }
        });
        
        return result.join('\n')
}

//======================================= XHR ===================================================

const getDatabyTip = async (tip) =>{    
    var arr = [] = loadSavedJsn(xls.output)        
    var result = [];      
    result.push('<table><tbody>')           
        arr.forEach((data,inx) => {            
            if (data.tip == tip) {                
              var  tr = `<tr id="tr${data.kod}" style="margin:auto; width:auto; background:${inx % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">`
              var basket = `</td><td><input class="inpCol"  type="number" id='i${data.kod}' size='4'></td><td><img src="public/img/plus2.ico" class="basket" onclick="basketClick(${data.kod})"></td>`
               result.push(`${tr}<td>${inx+1}</td><td id="kod">${data.kod}</td><td id="name">${data.nazvanie}</td><td id="price">${data.price}</td><td id="ost"><b>${data.ost}</b>${basket}</tr>`)   
            }
    });  
    result.push('</tbody></table>')           
    return {data : result.join('\n')}
}


const putToBasket = async (kod,kol,count) =>{    
    var obj ={}    
    try {
        var fd = fs.openSync(bill.input,'a')    
        obj.kod = kod;
        obj.kol = kol;    
        fs.appendFileSync(fd,JSON.stringify(obj)+'@')        
        fs.closeSync(fd)        
    } catch (error) {
        console.log(error)
    }    
    var a = Number(count)+1;
    console.log(a)
    return {data : a}
}

//=================================================================================================

const prepareOrder = async () =>{     
    try {
        var result = [];         
        var buf =  fs.readFileSync(bill.input,{encoding:'utf-8'});      
        var z = buf.slice(0,buf.length-1)        
        var arr = z.split('@')     
        var inx = 1;
        for (const strObj of arr) {        
            var data = JSON.parse(strObj);            
            var  tr = `<tr id="tr${data.kod}" style="margin:auto; width:auto; background:${inx % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">`                                                  
            var del  = `<td><img src="public/img/no.ico" class="imgDel" onclick="delItem('tr${data.kod}')"></td>`
            const  tov = await getInfoByKod(data.kod);                                                             
            result.push(`${tr}<td id="no${inx}">${inx}</td><td id="kod">${tov.kod}</td><td id="name">${tov.nazvanie}</td><td id="price">${tov.price}</td><td id="ost"><b>${data.kol}</b><td id="suma${inx}">${Number(tov.price)*Number(data.kol)}</td>${del}</tr>`)                                    
            inx++;
         }

            
    } catch (error) {        
    }   
    return result.join('\n')          
  }



const getInfoByKod = async (kod)=>{
    var arr = [] = loadSavedJsn(xls.output)            
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].kod == kod) {                                        
                return arr[i]
            }
    }   
}


const clearOrder = () =>{
    var fd = fs.openSync(bill.input,'w')
    fs.closeSync(fd)    
}

const composeMsg = async (params) =>{  
    try {    
    var result = [];
    result.push('<html><body><table>')
    var buf =  fs.readFileSync(bill.input,{encoding:'utf-8'});      
        var z = buf.slice(0,buf.length-1)        
        var arr = z.split('@')     
        var inx = 1;
        for (const strObj of arr) {        
            var data = JSON.parse(strObj);            
            var  tr = `<tr id="tr${data.kod}" style="margin:auto; width:auto; background:${inx % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">`                                                              
            const  tov = await getInfoByKod(data.kod);                                                             
            result.push(`${tr}<td id="no${inx}">${inx}</td><td id="kod">${tov.kod}</td><td id="name">${tov.nazvanie}</td><td id="price">${tov.price}</td><td id="ost"><b>${data.kol}</b><td id="suma${inx}">${Number(tov.price)*Number(data.kol)}`)                                    
            inx++;
         }
         result.push('</table></body></html>')
    var msg = {
        text: result.join('\n'),
        subject: params.subject
        }
    return msg
   } catch (err) {throw err}
  }


const select_mailList = async (arr) =>{    
    try {
        var res = [] ;        
        for (let i = 0; i < arr.length-1; i++) {
            res.push(`<select>${arr[i].group}</select>`)                
        }            
        return res.join('\n')    
    } catch (error) {
        console.log(error)
    }    
}

 module.exports.xlx = xlx;
 module.exports.prepareOrder = prepareOrder;
 module.exports.getDatabyTip = getDatabyTip;
 module.exports.putToBasket = putToBasket;
 module.exports.iGooogle = iGooogle;
 module.exports.tipToCombo = tipToCombo; 
 module.exports.startPage = startPage;
 module.exports.clearOrder = clearOrder;
 module.exports.composeMsg = composeMsg;
 module.exports.select_mailList = select_mailList