

const getTips =  (jsonData,name) =>{
    
    var tipArr =[];            
    var res =[];      
    jsonData.forEach(element => {
        tipArr.push(element[name].toLowerCase());
      });

    tipArr.sort();
    
    res.push(tipArr[0]);
    for (let i = 0; i < tipArr.length-1; i++) {
        if (tipArr[i] != tipArr[i+1]) {
          res.push(tipArr[i+1]);          
        }
    }
    return res;
  }


  const selectInit =   (jsonData,name) =>{    
        try {           
          const data =  getTips(jsonData,name);          
          var arr = []
          data.forEach(v=>{
                arr.push(`<option>${v}</option>`)
          })//data                      
           return arr.join('\n') 
     } //try
        catch(err){throw err}
}//void

const MakeTips =  (arr) =>{        
        try {                       
            return selectInit(arr);
        }
          catch(err) {}
}
        
module.exports.MakeTips = MakeTips            
module.exports.selectInit = selectInit