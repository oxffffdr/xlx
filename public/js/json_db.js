import data, { forEach } from ".db/db.json";

var POS_X = 0;
    var POS_Y = 0;

    const getTips = (jsonData) =>{
      var tipArr =[];            
      var res =[];  

      jsonData.forEach(element => {
          tipArr.push(element.tip.toLowerCase());
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

    function loadMainMenu(){
      var s='<div class="mainMenu"><ul class="list">';        
      var tipArr = getTips(data);
        inx=0;
        tipArr.forEach(elm => {
          s=s+`<li id="tip${inx}" onclick="tipClick(${inx})">${elm}</li>`;
          inx++;
      });
      var res = document.getElementById("mainMenu");      
      res.innerHTML = s + '</ul></div>';

    //  document.body.addEventListener('click',(e)=>{
    //    POS_X = e.clientX;
    //    POS_Y = e.clientY;
    //    console.log(POS_X,POS_Y);
    //    })
    }

    function tipClick(tip){
      var res = document.getElementById("resTable");
      res.setAttribute("style","visibility:visible") ;     
      res.innerHTML = getTovByTip(tip);
      MenuHide();
    }
    
    function getTovByTip(tip){                
        var res =[];      
        var tp = document.getElementById("tip"+tip).innerText;

        forEach(el => {
            if (el.tip.toLowerCase() == tp){
                res.push(el);
            }
        });

        return MakeReport(res);
    }
    
    function MakeReport(res){
        var sdata = [];
        var scol = [];
        var tr ='';

    //Colums names section                 
       const cols = ['kod', 'nazvanie', 'vhcena', 'cena', 'roznica', 'ostatok', 'tip', 'procent'];
       const rusCols = ['Код','Название','ВхЦена','Цена','Розн','Ост','Тип','%'];

       const setColNames = (col)=>{
            var ar=[];
              rusCols.forEach(names=> ar.push(`<td class="tdStyle">${names}</td>`));
              const v = '<tr class="trHeaderStyle">\n<td class="tdStyle">No</td>\n';
              return v+ar.join('\n')+'</tr>\n';
          }
          //End of colums names section  

        const header = '<table class="ReportTable"><tbody>\n';

            res.forEach((el,index) => {                                          
               tr = `<tr style="background:${index % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">\n` +
                    `<td>${index+1}</td>\n`;
                
                cols.forEach(names=>{
                  var addstyle = '';
                  var addLink = el[names];
                  
                  if (names == 'kod'){
                      addLink = `<p onclick="ShowTipbyCode('${el[names]}')">${el[names]}</p>`;
                      addstyle = 'style="font-weight:bold"';
                  }                                     

                  if (names=='ostatok') {
                    if (el[names]<1) {
                     addstyle = 'style="font-weight:bold;color:red"';
                    } else {addstyle = 'style="font-weight:bold"';}
                  }

                  if(names=='vhcena'){
                    addstyle = 'style="font-weight:bold;color:blue"';
                  }
                  
                  scol.push(`<td ${addstyle}>${addLink}</td>\n`);
                })  //end col.map

                sdata.push(tr+scol.join('')+'</tr>\n');
                scol.length = 0;
            
            }) //enf of map.data                     

        return header+setColNames(cols)+sdata.join('')+'</tbody></table>\n';
    }

  function jsonToArr(jsn){
    var cols = [];             
         for (const key in jsn) {
           if (Object.hasOwnProperty.call(jsn, key)) {          
             cols.push(key);
           };
         };            
         return cols;
  } 

  function getInfByCode(kod){
    var res = []; 
    res.push('<table class="RaportTable">');
    forEach(elm => {
      if (elm.kod == kod) {
          var zavN = jsonToArr(elm.zav);                  
            res.push('<tr>');
            res.push(`<td>Дата</td> <td>КодЗав</td><td>Постав</td><td> Кол-во</td><td>ВхЦена</td>`);                        
            res.push('</tr>');

          for (let i = 0; i < zavN.length; i++) {                              
            var v = elm.zav[zavN[i]];
            res.push(`<tr style="background:${i % 2 === 0 ? "#b3e8b3": "#a1b9ff"}">`);
            res.push(`<td> ${v.dateZav}</td> <td>${v.kodZav}</td><td> ${v.postav}</td><td> ${v.kol}</td><td> ${v.inPrice}</td>`);                        
            res.push('</tr>');
        }                      
      };
    });    
    res.push('</table>');
    return res;
  }

  function ShowTipbyCode(kod){
    var dv = document.getElementById("ZavozWnd");     
    //var rs = document.getElementById("resTable");     
    //console.log(rs.left,rs.top);
    //dv.setAttribute('style',`visibility:visible; top:${Number(POS_X-rs.left)}px; left:${Number(POS_Y-rs.top)}px`);        
    dv.setAttribute('style','visibility:visible;');        
    dv.innerHTML = getInfByCode(kod).join(' ');    
  }

function Search(){
  var res = document.getElementById("sLine").value;   
   var sl = res.split(' ');   
  var  ar = [];
  var  ok = k = 1;
   forEach(el => {

    if (el.kod.toLowerCase() == res) {
      ar.push(el);
    }

     sl.forEach(wrd =>{
        if (el.nazvanie.toLowerCase().match(wrd)) {ok=1;} else {ok=0;}
        k=k*ok;
    })        

    if (k==1) {ar.push(el);}
    k=1;
  });     
  var res = document.getElementById("resTable");      
      res.innerHTML = MakeReport(ar);
}

function HideZavWnd(){
  var dv = document.getElementById("ZavozWnd");     
    dv.setAttribute('style','visibility:hidden;');   
}

function MenuClick(){
  var dv = document.getElementById("mainMenu");     
    dv.setAttribute('style','visibility:visible; height:auto;'); 
  var dz = document.getElementById("resTable");     
    dz.setAttribute('style','visibility:hidden;');        
}

function MenuHide(){
  var dv = document.getElementById("mainMenu");     
    dv.setAttribute('style','visibility:hidden; height:0;');      
}

function CleraArea(){
  document.getElementById("resTable").innerHTML ='';
}
